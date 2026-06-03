import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { URL } from 'url';

const ROOT = path.resolve('./');
const ENV_PATH = path.join(ROOT, '.env');
const DATA_FILE = path.join(ROOT, 'server-data.json');
const DEFAULT_PORT = 5174;

const loadDotEnv = async () => {
  try {
    const text = await fs.readFile(ENV_PATH, 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      const value = rest.join('=');
      if (key && !(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // ignore missing .env
  }
};

const parseJsonBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString('utf8').trim();
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};

let store = {
  approvedMovies: [],
  approvedNews: { politics: [], local: [] },
  pendingItems: []
};

const saveStore = async () => {
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
};

const loadStore = async () => {
  try {
    const contents = await fs.readFile(DATA_FILE, 'utf8');
    store = JSON.parse(contents);
  } catch {
    await saveStore();
  }
};

const formatPublishedAt = (publishedAt) => {
  try {
    return new Date(publishedAt).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  } catch {
    return 'Recent';
  }
};

const makeNewsId = (url) => `news:${Buffer.from(String(url)).toString('base64')}`;
const makeTmdbId = (tmdbId) => `tmdb:${tmdbId}`;
const normalizeId = (value) => String(value || '').trim();

const getHeaderToken = (req) => {
  const auth = req.headers['authorization'] || '';
  return String(auth).replace(/^Bearer\s+/i, '');
};

const isAuthorized = (req) => {
  const token = getHeaderToken(req);
  return token === process.env.ADMIN_TOKEN;
};

const sendJson = (res, data, status = 200) => {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5173',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
  });
  res.end(body);
};

const sendText = (res, text, status = 200) => {
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5173',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
  });
  res.end(text);
};

const addPendingItem = (item) => {
  const id = normalizeId(item.id);
  if (!id) return null;
  if (store.pendingItems.some((entry) => entry.id === id)) return null;

  if (item.type === 'movie') {
    if (store.approvedMovies.some((entry) => entry.id === id)) return null;
  } else if (item.type === 'news') {
    if (store.approvedNews.politics.some((entry) => entry.id === id) || store.approvedNews.local.some((entry) => entry.id === id)) return null;
  }

  store.pendingItems.push({ ...item, status: 'pending', createdAt: new Date().toISOString() });
  return item;
};

const buildMovieItem = (movie) => {
  const isTelugu = movie.original_language === 'te';
  const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
  const isUpcoming = releaseDate ? releaseDate > new Date() : false;
  const image = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '';

  return {
    id: makeTmdbId(movie.id),
    source: 'tmdb',
    sourceId: movie.id,
    type: 'movie',
    title: movie.title,
    title_te: movie.title,
    release: releaseDate ? releaseDate.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : 'TBA',
    category: isUpcoming ? 'Upcoming' : 'In theaters',
    genre: 'Movie update',
    status: isUpcoming ? 'Coming soon' : 'Now playing',
    reportType: isTelugu ? 'Telugu update' : 'Indian update',
    platform: 'Theatre',
    rating: movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : 'N/A',
    description: movie.overview || 'Latest movie update.',
    description_te: movie.overview || 'Latest movie update.',
    collections: movie.popularity ? `Popularity ${movie.popularity.toFixed(1)}` : '',
    collections_te: movie.popularity ? `Popularity ${movie.popularity.toFixed(1)}` : '',
    industry: isTelugu ? 'Tollywood' : 'Indian cinema',
    image,
    isTmdb: true,
    subtype: 'movie'
  };
};

const buildNewsItem = (article, subtype) => ({
  id: makeNewsId(article.url),
  source: 'newsapi',
  sourceId: article.url,
  type: 'news',
  subtype,
  headline: article.title,
  headline_te: article.title,
  summary: article.description || article.content || 'Read the full story on the source site.',
  summary_te: article.description || article.content || '',
  time: formatPublishedAt(article.publishedAt),
  category: article.source.name || subtype,
  url: article.url,
  image: article.urlToImage || '',
  status: 'pending'
});

const fetchTmdbPending = async () => {
  const TMDB_API_KEY = process.env.VITE_TMDB_API_KEY;
  if (!TMDB_API_KEY) throw new Error('TMDb API key is missing in server environment.');
  const base = 'https://api.themoviedb.org/3';
  const endpoints = [
    `${base}/discover/movie?api_key=${TMDB_API_KEY}&region=IN&language=en-US&sort_by=primary_release_date.desc&with_release_type=2%7C3&vote_count.gte=5&page=1`,
    `${base}/discover/movie?api_key=${TMDB_API_KEY}&region=IN&language=en-US&with_original_language=te&sort_by=primary_release_date.desc&include_adult=false&vote_count.gte=5&page=1`
  ];

  const results = await Promise.all(endpoints.map(async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(data.status_message || 'TMDb fetch failed');
    if (!Array.isArray(data.results)) throw new Error('Unexpected TMDb response');
    return data.results;
  }));

  const combined = [...results[0], ...results[1]];
  const uniqueMovies = Array.from(new Map(combined.map((movie) => [movie.id, movie])).values());
  let added = 0;
  uniqueMovies.forEach((movie) => {
    if (addPendingItem(buildMovieItem(movie))) added += 1;
  });
  await saveStore();
  return added;
};

const fetchNewsPending = async () => {
  const NEWS_API_KEY = process.env.VITE_NEWS_API_KEY;
  if (!NEWS_API_KEY) return 0;
  const queries = [
    { term: 'politics', subtype: 'politics' },
    { term: 'local community OR neighborhood', subtype: 'local' }
  ];

  let added = 0;
  await Promise.all(queries.map(async ({ term, subtype }) => {
    const url = new URL('https://newsapi.org/v2/everything');
    url.searchParams.set('q', term);
    url.searchParams.set('pageSize', '4');
    url.searchParams.set('language', 'en');
    url.searchParams.set('sortBy', 'publishedAt');
    const response = await fetch(url.toString(), {
      headers: { 'X-Api-Key': NEWS_API_KEY }
    });
    const data = await response.json();
    if (!response.ok || data.status !== 'ok') throw new Error(data.message || 'NewsAPI fetch failed');
    data.articles.forEach((article) => {
      if (addPendingItem(buildNewsItem(article, subtype))) added += 1;
    });
  }));
  await saveStore();
  return added;
};

const handleRoute = async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = requestUrl.pathname;
  const method = req.method;

  if (method === 'OPTIONS') {
    sendText(res, 'OK');
    return;
  }

  if (pathname === '/api/status' && method === 'GET') {
    sendJson(res, { ok: true, server: 'approval-backend' });
    return;
  }

  if (pathname === '/api/login' && method === 'POST') {
    const body = await parseJsonBody(req);
    if (!body || body.username !== process.env.ADMIN_USERNAME || body.password !== process.env.ADMIN_PASSWORD) {
      sendJson(res, { error: 'Invalid credentials' }, 401);
      return;
    }
    sendJson(res, { token: process.env.ADMIN_TOKEN || 'admin-token' });
    return;
  }

  if (pathname === '/api/movies' && method === 'GET') {
    sendJson(res, store.approvedMovies);
    return;
  }

  if (pathname === '/api/news' && method === 'GET') {
    sendJson(res, store.approvedNews);
    return;
  }

  if (pathname === '/api/pending' && method === 'GET') {
    if (!isAuthorized(req)) {
      sendJson(res, { error: 'Unauthorized' }, 401);
      return;
    }
    sendJson(res, store.pendingItems);
    return;
  }

  if (pathname === '/api/pending/fetch' && method === 'POST') {
    if (!isAuthorized(req)) {
      sendJson(res, { error: 'Unauthorized' }, 401);
      return;
    }
    try {
      const tmdbAdded = await fetchTmdbPending();
      const newsAdded = await fetchNewsPending();
      sendJson(res, { added: tmdbAdded + newsAdded, pending: store.pendingItems.length });
    } catch (error) {
      sendJson(res, { error: error.message || 'Unable to fetch pending updates' }, 500);
    }
    return;
  }

  const pendingApproveMatch = pathname.match(/^\/api\/pending\/([^/]+)\/approve$/);
  const pendingItemMatch = pathname.match(/^\/api\/pending\/([^/]+)$/);

  if (pendingApproveMatch && method === 'POST') {
    if (!isAuthorized(req)) {
      sendJson(res, { error: 'Unauthorized' }, 401);
      return;
    }
    const id = normalizeId(decodeURIComponent(pendingApproveMatch[1]));
    const index = store.pendingItems.findIndex((item) => item.id === id);
    if (index === -1) {
      sendJson(res, { error: 'Pending update not found' }, 404);
      return;
    }
    const pending = { ...store.pendingItems[index] };
    const body = await parseJsonBody(req);
    if (body && body.edits) Object.assign(pending, body.edits);
    store.pendingItems.splice(index, 1);
    if (pending.type === 'movie') {
      store.approvedMovies.unshift(pending);
    } else {
      const list = pending.subtype === 'local' ? store.approvedNews.local : store.approvedNews.politics;
      list.unshift(pending);
    }
    await saveStore();
    sendJson(res, { approved: pending });
    return;
  }

  if (pendingItemMatch && method === 'PUT') {
    if (!isAuthorized(req)) {
      sendJson(res, { error: 'Unauthorized' }, 401);
      return;
    }
    const id = normalizeId(decodeURIComponent(pendingItemMatch[1]));
    const pending = store.pendingItems.find((item) => item.id === id);
    if (!pending) {
      sendJson(res, { error: 'Pending update not found' }, 404);
      return;
    }
    const body = await parseJsonBody(req);
    if (body && body.edits) Object.assign(pending, body.edits);
    await saveStore();
    sendJson(res, { pending });
    return;
  }

  if (pendingItemMatch && method === 'DELETE') {
    if (!isAuthorized(req)) {
      sendJson(res, { error: 'Unauthorized' }, 401);
      return;
    }
    const id = normalizeId(decodeURIComponent(pendingItemMatch[1]));
    const index = store.pendingItems.findIndex((item) => item.id === id);
    if (index === -1) {
      sendJson(res, { error: 'Pending update not found' }, 404);
      return;
    }
    const removed = store.pendingItems.splice(index, 1)[0];
    await saveStore();
    sendJson(res, { rejected: removed });
    return;
  }

  if (pathname === '/api/submit' && method === 'POST') {
    const body = await parseJsonBody(req);
    if (!body) {
      sendJson(res, { error: 'Invalid request body' }, 400);
      return;
    }
    const item = {
      ...body,
      id: `${body.type || 'manual'}:${Date.now()}`,
      source: 'manual',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    addPendingItem(item);
    await saveStore();
    sendJson(res, { pending: item }, 201);
    return;
  }

  sendJson(res, { error: 'Not found' }, 404);
};

const start = async () => {
  await loadDotEnv();
  await loadStore();

  const port = Number(process.env.SERVER_PORT || DEFAULT_PORT);
  const server = http.createServer((req, res) => {
    handleRoute(req, res).catch((error) => {
      sendJson(res, { error: error.message || 'Server error' }, 500);
    });
  });

  server.listen(port, '127.0.0.1', () => {
    console.log(`Approval backend running on http://127.0.0.1:${port}`);
  });
};

start();
