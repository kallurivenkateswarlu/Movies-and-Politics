import { useMemo, useState, useEffect } from 'react';

const movies = [
  {
    title: 'Peddi',
    release: 'June 04, 2026',
    category: 'In theaters',
    genre: 'Mass action',
    status: 'Now playing',
    reportType: 'Box Office Report',
    platform: 'Theatre',
    cast: 'Ram Charan, Sreeleela',
    director: 'Buchi Babu',
    rating: '8.2/10',
    description: 'A new mass action film starring Ram Charan, directed by Buchi Babu, with music by A. R. Rahman.',
    title_te: 'Peddi',
    genre_te: 'మాస్ యాక్షన్',
    status_te: 'ప్రదర్శనలో',
    reportType_te: 'బాక్స్ ఆఫీస్ రిపోర్ట్',
    cast_te: 'రామ్ చరణ్, శ్రీలీల',
    director_te: 'బుచ్చి బాబు',
    description_te: 'రామ్ చరణ్ నటించిన కొత్త మాస్ యాక్షన్ సినిమా, బుచ్చి బాబు దర్శకత్వం, సంగీతం ఏ.ఆర్. రహ్మన్.',
    collections: '₹ 120 Cr worldwide',
    collections_te: '₹ 120 కోటి వరల్డ్‌వైడ్',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Silk & Smoke',
    release: 'June 21, 2026',
    category: 'Upcoming',
    genre: 'Mystery thriller',
    status: 'Pre-sale tickets open',
    reportType: 'Trailer update',
    platform: 'Theatre',
    cast: 'Aditi Rao Hydari, Vijay Deverakonda',
    director: 'Sujoy Ghosh',
    rating: 'N/A',
    description: 'A journalist uncovers a hidden conspiracy inside a luxury fashion empire.',
    title_te: 'సిల్క్ & స్మోక్',
    genre_te: 'రహస్య థ్రిల్లర్',
    status_te: 'ముందస్తు టికెట్లు లభ్యమవుతున్నాయి',
    reportType_te: 'ట్రైలర్ అప్‌డేట్',
    cast_te: 'ఆదిత్యా రాయ్ హైదరి, విజయ్ దేవరకొండ',
    director_te: 'సుజోయ్ ఘోష్',
    description_te: 'ఒక జర్నలిస్ట్ లగ్జరీ ఫ్యాషన్ సామ్రాజ్యంలోని దొంగతనాన్ని ఆవిష్కరిస్తుంది.',
    collections: '₹ 55 Cr opening weekend',
    collections_te: '₹ 55 కోటి ఓపెనింగ్ వీకెండ్',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Moonlit Sonata',
    release: 'July 2, 2026',
    category: 'Upcoming',
    genre: 'Romantic drama',
    status: 'Coming soon',
    reportType: 'Release announcement',
    platform: 'Theatre',
    cast: 'Aaradhya Bhaskar, Naveen Kumar',
    director: 'Priya Anand',
    rating: 'N/A',
    description: 'Two musicians reunite to finish a composition that changed their lives.',
    title_te: 'మూన్లిట్ సోనాటా',
    genre_te: 'రోమాంటిక్ డ్రామా',
    status_te: 'త్వరలో రాబోతుంది',
    reportType_te: 'విడుదల ప్రకటన',
    cast_te: 'ఆరాధ్య భాస్కర్, నవీన్ కుమార్',
    director_te: 'ప్రియా ఆనంద్',
    description_te: 'రెండు సంగీతకారులు వారి జీవితాన్ని మార్చిన రచనను పూర్తి చేయడానికి తిరిగి కలవడం.',
    collections: '₹ 18 Cr pre-sales',
    collections_te: '₹ 18 కోటి ప్రీ-సేల్స్',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'City Hustle',
    release: 'June 10, 2026',
    category: 'In theaters',
    genre: 'Drama',
    status: 'Now playing',
    reportType: 'Box Office Showdown',
    platform: 'Theatre',
    cast: 'Kajol, Saif Ali Khan',
    director: 'Shaad Ali',
    rating: '8.7/10',
    description: 'A commercial drama about the business behind India’s biggest movies.',
    title_te: 'సిటీ హస్తిల్',
    genre_te: 'డ్రామా',
    status_te: 'ప్రదర్శనలో',
    reportType_te: 'బాక్స్ ఆఫీస్ షో‌డౌన్',
    cast_te: 'కాజల్, సయీఫ్ అలీ ఖాన్',
    director_te: 'షాద్ అలీ',
    description_te: 'భారతదేశ వారైపు పెద్ద సినిమాల వెనుక వ్యాపారాన్ని గురించి ఒక వాణిజ్య డ్రామా.',
    collections: '₹ 95 Cr opening week',
    collections_te: '₹ 95 కోటి ఓపెనింగ్ వీక్',
    industry: 'Box Office India',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  }
];

const politicalNews = [
  {
    headline: 'Election campaigns shift to youth engagement',
    headline_te: 'ఎన్నికల ప్రచారాలు యువతను లక్ష్యం చేస్తున్నాయి',
    time: '1 hour ago',
    category: 'National',
    summary: 'Parties are launching new programs and social media campaigns targeting first-time voters.',
    summary_te: 'పార్టీలు మొదటిసారీ మతాధికారులైన యువ ఓటర్లను లక్ష్యంగా పెట్టుకుని కొత్త కార్యక్రమాలు, సోషల్ మీడియా ప్రచారాలు ప్రారంభిస్తున్నాయి.'
  },
  {
    headline: 'Legislature approves new infrastructure package',
    headline_te: 'విధానసభ కొత్త మౌలిక సదుపాయాల ప్యాకేజీ ఆమోదించింది',
    time: 'Yesterday',
    category: 'Policy',
    summary: 'Funding will support roads, transit, and clean energy projects across the region.',
    summary_te: 'ప్రాంతంలోని రోడ్లు, రవాణా మరియు స్వచ్ఛమైన శక్తి ప్రాజెక్టుల కోసం ఆర్థిక సహాయం అందిస్తుంది.'
  },
  {
    headline: 'Diplomatic talks resume after international summit',
    headline_te: 'అంతర్జాతీయ శిఖరసభ తర్వాత దౌత్య చర్చలు పునఃప్రారంభం',
    time: '3 days ago',
    category: 'Global',
    summary: 'Officials from neighboring countries agreed to reopen trade and travel discussions.',
    summary_te: 'పక్కటి దేశాల అధికారులు వ్యాపారం మరియు ప్రయాణ చర్చలను తిరిగి ప్రారంభించడానికి ఒప్పుకున్నారు.'
  }
];

const localNews = [
  {
    headline: 'City park reopens after major renovation',
    headline_te: 'పట్టి పార్క్ పెద్ద రిమోడల్ తర్వాత పునరుద్ఘాటించింది',
    time: '2 hours ago',
    category: 'Community',
    summary: 'The refreshed park now includes a bike path, playground, and garden spaces for families.',
    summary_te: 'పునరుద్ధరించిన పార్కులో ఇప్పుడు బైక్ పાથ, ప్లేగ్రౌండ్ మరియు కుటుంబాల కోసం తోటా ప్రదేశాలు ఉన్నాయి.'
  },
  {
    headline: 'Local film festival announces weekend lineup',
    headline_te: 'స్థానిక సినిమా ఉత్సవం వీకెండ్ లైనప్ ప్రకటించింది',
    time: 'Yesterday',
    category: 'Events',
    summary: 'Independent filmmakers will screen new shorts, documentaries, and panel discussions downtown.',
    summary_te: 'స్వతంత్ర నిర్మాతలు కొత్త షార్ట్లు, డాక్యుమెంటరీలు మరియు ప్యానల్ చర్చలను టౌన్ డౌన్ లో ప్రదర్శిస్తారు.'
  },
  {
    headline: 'Market street prepares for summer street fair',
    headline_te: 'మార్కెట్ స్ట్రీట్ వేసవికాల స్ట్రీట్ ఫెయిర్ కు సిద్ధం అవుతుంది',
    time: '4 days ago',
    category: 'Culture',
    summary: 'Vendors and live performers are set to enliven the neighborhood over the holiday weekend.',
    summary_te: 'విక్రేతలు మరియు ప్రత్యక్ష కళాకారులు సెలవుల వీకెండ్ లో పొరుగువారిని ఉల్లాసంగా చేస్తారు.'
  }
];

const featuredStories = [
  {
    title: 'Summer box office preview',
    title_te: 'వేసవి బాక్స్ ఆఫీసు అవలోకనం',
    tag: 'Movie',
    summary: 'A quick guide to the top releases and breakout hits for the season.',
    summary_te: 'ఈ సీజన్లో టాప్ విడుదలలు మరియు హిట్ సినిమాల కోసం తక్షణ మార్గదర్శకం.'
  },
  {
    title: 'Politics on the move',
    title_te: 'చలిస్తున్న రాజకీయాలు',
    tag: 'Politics',
    summary: 'What today’s headlines mean for campaigns, policy, and local action.',
    summary_te: 'ఈ రోజు హెడ్‌లైన్లు ప్రచారాలు, విధానం మరియు స్థానిక చర్యలకు ఏమి అర్థం ఉంటాయి.'
  },
  {
    title: 'Community spotlight',
    title_te: 'కమ్యూనిటీ స్పాట్‌లైట్',
    tag: 'Local',
    summary: 'From festivals to city projects, the stories your neighborhood is talking about.',
    summary_te: 'ఉత్సవాల నుంచి నగర ప్రాజెక్టులు వరకు, మీ పొరుగున్న ప్రాంతంలో చర్చించే కథలు.'
  }
];

const categories = ['All', 'In theaters', 'Upcoming'];

// Ensure each content item has both language fields. If one language is missing,
// copy the available text into the missing field so the UI always has something to show.
function ensureBilingual(item = {}) {
  const make = (en, te) => {
    if (te && te.trim()) return { en, te };
    if (en && en.trim()) return { en, te: en };
    return { en: en || '', te: te || '' };
  };

  const out = { ...item };
  // Title / headline
  if ('title' in item || 'title_te' in item) {
    const { en, te } = make(item.title || '', item.title_te || '');
    out.title = en; out.title_te = te;
  }
  if ('headline' in item || 'headline_te' in item) {
    const { en, te } = make(item.headline || '', item.headline_te || '');
    out.headline = en; out.headline_te = te;
  }

  // Summary / description
  if ('summary' in item || 'summary_te' in item || 'description' in item || 'description_te' in item) {
    const primaryEn = item.summary || item.description || '';
    const primaryTe = item.summary_te || item.description_te || '';
    const { en, te } = make(primaryEn, primaryTe);
    out.summary = out.summary || en;
    out.summary_te = out.summary_te || te;
    out.description = out.description || en;
    out.description_te = out.description_te || te;
  }

  // Genre / status fields
  if ('genre' in item || 'genre_te' in item) {
    const { en, te } = make(item.genre || '', item.genre_te || '');
    out.genre = en; out.genre_te = te;
  }
  if ('status' in item || 'status_te' in item) {
    const { en, te } = make(item.status || '', item.status_te || '');
    out.status = en; out.status_te = te;
  }
  if ('reportType' in item || 'reportType_te' in item) {
    const { en, te } = make(item.reportType || '', item.reportType_te || '');
    out.reportType = en; out.reportType_te = te;
  }
  if ('cast' in item || 'cast_te' in item) {
    const { en, te } = make(item.cast || '', item.cast_te || '');
    out.cast = en; out.cast_te = te;
  }
  if ('director' in item || 'director_te' in item) {
    const { en, te } = make(item.director || '', item.director_te || '');
    out.director = en; out.director_te = te;
  }
  if ('collections' in item || 'collections_te' in item) {
    const { en, te } = make(item.collections || '', item.collections_te || '');
    out.collections = en; out.collections_te = te;
  }

  // Preserve image fields (if present)
  if ('image' in item || 'urlToImage' in item) {
    out.image = item.image || item.urlToImage || '';
    out.urlToImage = item.urlToImage || '';
  }

  return out;
}

const moviesNormalized = movies.map(ensureBilingual);
const politicalNewsNormalized = politicalNews.map(ensureBilingual);
const localNewsNormalized = localNews.map(ensureBilingual);

const teluguFilmHistory = [
  {
    title: 'Sri Venkateswara Mahatyam',
    title_te: 'శ్రీ వెంకటేశ్వర మహత్యం',
    release: '1960',
    year: 1960,
    category: 'Telugu history',
    genre: 'Devotional drama',
    status: 'Classic',
    reportType: 'Golden age',
    platform: 'Cinema',
    cast: 'N. T. Rama Rao, Savitri, S. V. Ranga Rao',
    director: 'P. Pullaiah',
    rating: '9.1/10',
    description: 'A devotional drama that celebrates the life and miracles of Lord Venkateswara.',
    description_te: 'లార్డ్ వెంకటేశ్వరుడి జీవితాన్ని మరియు అతని అద్భుతాలను జ్ఞాపకం చేసే ఆధ్యాత్మిక డ్రామా.',
    collections: 'Historic blockbuster',
    collections_te: 'చారిత్రాత్మక బ్లాక్‌బస్టర్',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Gundamma Katha',
    title_te: 'గుండమ్మ కథ',
    release: '1962',
    year: 1962,
    category: 'Telugu history',
    genre: 'Family comedy',
    status: 'Classic',
    reportType: 'Iconic comedy',
    platform: 'Cinema',
    cast: 'N. T. Rama Rao, Akkineni Nageswara Rao, S. Varalakshmi',
    director: 'K. V. Reddy',
    rating: '9.3/10',
    description: 'A timeless family comedy about a strong-willed matriarch and the lives she shapes.',
    description_te: 'మजबూతును కలిగిన తల్లి పాత్ర మరియు ఆమెకి చుట్టూ తిరిగే కుటుంబ జీవితం గురించి ఒక చిరస్థాయిగా నవల.',
    collections: 'All-time favorite',
    collections_te: 'అన్నికలలో అప్రతిహత ప్రేక్షకుల ప్రియమైన చిత్రం',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Mutyala Muggu',
    title_te: 'ముత్యాల మగ్గు',
    release: '1975',
    year: 1975,
    category: 'Telugu history',
    genre: 'Family drama',
    status: 'Classic',
    reportType: 'Cultural drama',
    platform: 'Cinema',
    cast: 'Nandamuri Taraka Rama Rao, Jayasudha',
    director: 'Bapu',
    rating: '9.0/10',
    description: 'A graceful family drama that blends tradition, romance, and social values.',
    description_te: 'పరంపర, రొమాన్స్ మరియు సామాజిక విలువల సమ్మేళనం గా ఉన్న స్నేహపూర్వక కుటుంబ డ్రామా.',
    collections: 'Critically acclaimed',
    collections_te: 'విమర్శకుల ప్రశంసలు పొందిన చిత్రం',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=60'
  },
  {
    title: 'Sankarabharanam',
    title_te: 'శంకరాభరణం',
    release: '1980',
    year: 1980,
    category: 'Telugu history',
    genre: 'Musical drama',
    status: 'Classic',
    reportType: 'Cultural landmark',
    platform: 'Cinema',
    cast: 'Chandra Mohan, J. V. Somayajulu, S. P. Sailaja',
    director: 'K. Viswanath',
    rating: '9.5/10',
    description: 'A celebrated story about the bond between a classical singer and his student, revered for its music and social sensibility.',
    description_te: 'పారంపర్య గాయకుడు మరియు వారి శిష్యురాలి మధ్య బంధాన్ని తెలిపే కథ, సంగీతం మరియు సామాజిక భావజాలంతో.',
    collections: 'Critical and commercial triumph',
    collections_te: 'నిరీక్షణ మరియు వాణిజ్య విజయం',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Swathi Muthyam',
    title_te: 'స్వాతి ముత్యం',
    release: '1986',
    year: 1986,
    category: 'Telugu history',
    genre: 'Drama',
    status: 'Classic',
    reportType: 'Art house',
    platform: 'Cinema',
    cast: 'Kamal Haasan, Radhika',
    director: 'K. Viswanath',
    rating: '9.4/10',
    description: 'A tender drama about an innocent man who changes the lives of people around him.',
    description_te: 'అమాయకంగా జీవించే ఒక మనిషి అతని చుట్టూ ఉన్న జీవితాలను మార్చే గురించి ఒక హృదయపూర్వక డ్రామా.',
    collections: 'Festival favorite',
    collections_te: 'అన్నివారం ప్రియమైన చిత్రం',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Shiva',
    title_te: 'శివ',
    release: '1989',
    year: 1989,
    category: 'Telugu history',
    genre: 'Action drama',
    status: 'Cult favorite',
    reportType: 'Youth landmark',
    platform: 'Cinema',
    cast: 'Chiranjeevi, Vijayashanti',
    director: 'Ram Gopal Varma',
    rating: '9.1/10',
    description: 'A gritty action drama that became a defining youth film of its decade.',
    description_te: 'ఆ యుగానికి ఓ ప్రత్యేక యూత్ చిత్రం గా నిలిచిపోయిన ఒక ఘనమైన యాక్షన్ డ్రామా.',
    collections: 'Box office smash',
    collections_te: 'బాక్స్ ఆఫీస్ విజయం',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Kshana Kshanam',
    title_te: 'క్షణ క్షణం',
    release: '1991',
    year: 1991,
    category: 'Telugu history',
    genre: 'Thriller drama',
    status: 'Cult favorite',
    reportType: 'Road film',
    platform: 'Cinema',
    cast: 'Venkatesh, Sridevi',
    director: 'Ram Gopal Varma',
    rating: '9.0/10',
    description: 'A stylish thriller about a bank robbery that turns into a cross-country adventure.',
    description_te: 'బ్యాంకు దొంగతనాన్ని దేశ వ్యాప్త ప్రయాణంగా మార్చే ఒక శైలి కలిగిన సస్పెన్స్ డ్రామా.',
    collections: 'Thriller hit',
    collections_te: 'సస్పెన్స్ హిట్',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=60'
  },
  {
    title: 'Nuvve Kavali',
    title_te: 'నువ్వే కావాలి',
    release: '2000',
    year: 2000,
    category: 'Telugu history',
    genre: 'Romantic drama',
    status: 'Millennium hit',
    reportType: 'Youth romance',
    platform: 'Cinema',
    cast: 'Tarun, Richa Pallod',
    director: 'K. Vijaya Bhaskar',
    rating: '8.8/10',
    description: 'A modern romance that captured the spirit of a new generation of Telugu audiences.',
    description_te: 'తెలుగు ప్రేక్షకుల కొత్త తరం భావనను పగిలించిన ఆధునిక ప్రేమ కథ.',
    collections: 'New era success',
    collections_te: 'కొత్త యుగ విజయం',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Sye',
    title_te: 'సై',
    release: '2004',
    year: 2004,
    category: 'Telugu history',
    genre: 'Sports action',
    status: 'Cult favorite',
    reportType: 'College drama',
    platform: 'Cinema',
    cast: 'Nithiin, Genelia D\'Souza, Prakash Raj',
    director: 'S. S. Rajamouli',
    rating: '8.9/10',
    description: 'A college-based sports-action story where two student teams battle for pride and unity.',
    description_te: 'ఒక కాలేజ్ ఆధారిత క్రీడా-యాక్షన్ కథ, ఇద్దరు టీములు గౌరవం మరియు ఐక్యత కోసం పోటీపడతాయి.',
    collections: 'Fan-favorite Telugu drama',
    collections_te: 'ప్రేక్షకులకు ఇష్టమైన తెలుగు డ్రామా',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=60'
  },
  {
    title: 'Magadheera',
    title_te: 'మగధీర',
    release: '2009',
    year: 2009,
    category: 'Telugu history',
    genre: 'Action romance',
    status: 'Modern classic',
    reportType: 'Reincarnation epic',
    platform: 'Cinema',
    cast: 'Ram Charan, Kajal Aggarwal',
    director: 'S. S. Rajamouli',
    rating: '9.2/10',
    description: 'A high-energy fantasy action drama that connects a royal past life with present-day love and revenge.',
    description_te: 'రాయల్ గతజీవితం మరియు ప్రస్తుతం ప్రేమ-బుద్ధి మధ్యను కలుపుకునే ఫ్యాంటసీ యాక్షన్ డ్రామా.',
    collections: 'Record Telugu blockbuster',
    collections_te: 'రికార్డు తెలుగు బ్లాక్‌బస్టర్',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Baahubali: The Beginning',
    title_te: 'బాహుబలి: ది బిగనింగ్',
    release: '2015',
    year: 2015,
    category: 'Telugu history',
    genre: 'Epic fantasy',
    status: 'Modern classic',
    reportType: 'Epic saga',
    platform: 'Cinema',
    cast: 'Prabhas, Rana Daggubati, Anushka Shetty',
    director: 'S. S. Rajamouli',
    rating: '9.4/10',
    description: 'A sweeping epic about two brothers, destiny, and the fight for a legendary kingdom.',
    description_te: 'రెండు సోదరులు, విధి మరియు లెజెండరీ రాజ్యానికి పోరాటం గురించి విస్తరించిన మహాకావ్యం.',
    collections: 'Huge global success',
    collections_te: 'భారీ గ్లోబల్ విజయము',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Arjun Reddy',
    title_te: 'అర్జున్ రెడ్డి',
    release: '2017',
    year: 2017,
    category: 'Telugu history',
    genre: 'Romantic drama',
    status: 'Modern landmark',
    reportType: 'Controversial hit',
    platform: 'Cinema',
    cast: 'Vijay Deverakonda, Shalini Pandey',
    director: 'Sandeep Reddy Vanga',
    rating: '8.7/10',
    description: 'A raw and emotional romance that became a new voice for Telugu youth cinema.',
    description_te: 'తెలుగు యూత్ సినిమా కోసం కొత్త స్వరం అయ్యే ఒక తను-ఎమోషనల్ ప్రేమ కథ.',
    collections: 'Breakout success',
    collections_te: 'బ్రేక్ అవుట్ విజయం',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Pushpa: The Rise',
    title_te: 'పుష్ప: ది రైజ్',
    release: '2021',
    year: 2021,
    category: 'Telugu history',
    genre: 'Action thriller',
    status: 'Recent hit',
    reportType: 'Mass action',
    platform: 'Cinema',
    cast: 'Allu Arjun, Rashmika Mandanna',
    director: 'Sukumar',
    rating: '8.8/10',
    description: 'A raw action drama that became a national sensation and redefined Telugu mass cinema.',
    description_te: 'తెలుగు మాస్ సినిమా పారంపర్యాన్ని తిరిగి నిర్వచించిన ఒక పచ్చదనం యాక్షన్ డ్రామా.',
    collections: 'Pan-Indian blockbuster',
    collections_te: 'పంచ్-భారత బ్లాక్‌బస్టర్',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'RRR',
    title_te: 'ఆర్ ఆర్ ఆర్',
    release: '2022',
    year: 2022,
    category: 'Telugu history',
    genre: 'Epic action',
    status: 'Recent classic',
    reportType: 'Historical fantasy',
    platform: 'Cinema',
    cast: 'N. T. Rama Rao Jr., Ram Charan, Alia Bhatt',
    director: 'S. S. Rajamouli',
    rating: '9.3/10',
    description: 'An epic action drama that imagines a friendship between two Indian revolutionaries.',
    description_te: 'రెండు భారత విప్లవకారుల మధ్య స్నేహాన్ని ఊహించే ఒక మహా యాక్షన్ డ్రామా.',
    collections: 'Global blockbuster',
    collections_te: 'ప్రపంచ వ్యాప్తంగా బ్లాక్‌బస్టర్',
    industry: 'Tollywood',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80'
  }
];

const historyFilmsNormalized = teluguFilmHistory.map((film) => ensureBilingual({
  ...film,
  year: parseInt(film.release, 10) || undefined,
  category: 'Telugu films'
}));
const featuredStoriesNormalized = featuredStories.map(ensureBilingual);

const HISTORY_DECADES = [
  { key: '1960-1970', title: '1960 - 1970', start: 1960, end: 1970 },
  { key: '1971-1980', title: '1971 - 1980', start: 1971, end: 1980 },
  { key: '1981-1990', title: '1981 - 1990', start: 1981, end: 1990 },
  { key: '1991-2000', title: '1991 - 2000', start: 1991, end: 2000 },
  { key: '2001-2010', title: '2001 - 2010', start: 2001, end: 2010 },
  { key: '2011-2020', title: '2011 - 2020', start: 2011, end: 2020 },
  { key: '2021-present', title: '2021 - present', start: 2021, end: 9999 }
];

const UI_STRINGS = {
  en: {
    navUpdates: 'Movie updates',
    navPolitics: 'Political news',
    navLocal: 'Local news',
    eyebrow: 'News Modules',
    heroHeading: 'Everything happening around you, all in one place.',
    heroCopy: 'Navigate directly to the content your audience wants: movie updates, political headlines, or local stories.',
    movieUpdates: 'Movie updates',
    politicalNews: 'Political news',
    localNews: 'Local news',
    movieTabs: {
      all: 'All',
      box: 'Box Office India',
      tollywood: 'Tollywood',
      latest: 'Latest updates'
    },
    movieAbout: 'Film about',
    collections: 'Collections',
    reportType: 'Type',
    castLabel: 'Cast',
    directorLabel: 'Director',
    platformLabel: 'Platform',
    ratingLabel: 'Rating',
    featuredStories: 'Featured stories',
    highlights: 'Highlights from every module',
    browseAll: 'Browse all updates',
    searchPlaceholder: 'Search by title, genre, or description',
    historyTitle: 'Telugu films',
    historyCopy: 'Search classic Telugu films by name and explore story details, cast, and legacy.',
    historySearchPlaceholder: 'Search Telugu film by name',
    historyNoResults: 'No Telugu film matches your search.',
    historySectionLabel: 'Decade archive',
    navHistory: 'Telugu films',
    readMore: 'Read more',
    noResults: 'No updates match your search or category.',
    close: 'Close',
    copyright: '© 2026 Movies & Politics. All rights reserved.'
  },
  te: {
    navUpdates: 'సినిమా నవీకరణలు',
    navPolitics: 'రాజకీయ వార్తలు',
    navLocal: 'స్థానిక వార్తలు',
    eyebrow: 'న్యూస్ మాడ్యూల్స్',
    heroHeading: 'వినోదం- సినిమాలు, రాజకీయం - నీ చుట్టు ప్రపంచం',
    heroCopy: 'మీ ప్రేక్షకులు కోరుకునే కంటెంట్‌కు నేరుగా నావిగేట్ చేయండి: సినిమా నవיקותణలు, రాజకీయ శీర్షికలు లేదా స్థానిక కథలు.',
    movieUpdates: 'సినిమా నవీకరణలు',
    politicalNews: 'రాజకీయ వార్తలు',
    localNews: 'స్థానిక వార్తలు',
    movieTabs: {
      all: 'అన్నీ',
      box: 'బాక్స్ ఆఫీస్ ఇండియా',
      tollywood: 'టాలీవుడ్',
      latest: 'తాజా నవీకరణలు'
    },
    movieAbout: 'సినిమా గురించి',
    collections: 'సేకరణలు',
    reportType: 'రకం',
    castLabel: 'కాస్ట్',
    directorLabel: 'దర్శకుడు',
    platformLabel: 'ప్లాట్‌ఫాం',
    ratingLabel: 'రేటింగ్',
    featuredStories: 'ప్రత్యేక కథనాలు',
    highlights: 'ప్రతి మాడ్యూల్ నుండి ముఖ్యాంశాలు',
    browseAll: 'అన్ని నవీకరణలను చూడండి',
    searchPlaceholder: 'శీర్షిక, అంశం లేదా వివరణ ద్వారా శోధించండి',
    historyTitle: 'తెలుగు సినిమాలు',
    historyCopy: 'ఫిల్మ్ పేరుని మాత్రమే శోధించి పాత తెలుగు సినిమాల సమాచారాన్ని పొందండి.',
    historySearchPlaceholder: 'సినిమా పేరుపై శోధించండి',
    historyNoResults: 'మీ శోధనకు సరిపడే తెలుగు సినిమా లేదు.',
    historySectionLabel: 'దశాబ్ధ విభాగం',
    navHistory: 'తెలుగు సినిమాలు',
    readMore: 'ఇంకా చదవండి',
    noResults: 'మీ శోధన లేదా వర్గానికి సరిపడే నవీకరణలు కనబడవు.',
    close: 'మూసివేయి',
    copyright: '© 2026 Movies & Politics. హక్కులు రిజర్వ్డ్.'
  }
};

export default function App() {
  const [search, setSearch] = useState('');
  const [historySearch, setHistorySearch] = useState('');
  const [selectedHistoryDecade, setSelectedHistoryDecade] = useState(HISTORY_DECADES[0].key);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return window.localStorage.getItem('moviePulseLang') || 'en';
  });
  useEffect(() => {
    window.localStorage.setItem('moviePulseLang', lang);
  }, [lang]);
  const toggleLang = () => setLang((p) => (p === 'en' ? 'te' : 'en'));
  const [liveNews, setLiveNews] = useState({ politics: [], local: [] });
  const [newsState, setNewsState] = useState({ status: 'idle', message: '' });
  const MOVIE_TAB_KEYS = ['all', 'box', 'tollywood', 'latest'];
  const [selectedMovieTab, setSelectedMovieTab] = useState('all');
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return window.localStorage.getItem('moviePulseTheme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('moviePulseTheme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5174/api';
  const [tmdbMovies, setTmdbMovies] = useState([]);
  const [movieFetchState, setMovieFetchState] = useState({ status: 'idle', message: '' });
  const [authToken, setAuthToken] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem('moviePulseAuthToken') || '';
  });
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const [pendingItems, setPendingItems] = useState([]);
  const [pendingEditDrafts, setPendingEditDrafts] = useState({});
  const [pendingState, setPendingState] = useState({ status: 'idle', message: '' });

  useEffect(() => {
    if (authToken && typeof window !== 'undefined') {
      window.localStorage.setItem('moviePulseAuthToken', authToken);
    } else if (typeof window !== 'undefined') {
      window.localStorage.removeItem('moviePulseAuthToken');
    }
  }, [authToken]);

  const authHeaders = () => (authToken ? { Authorization: `Bearer ${authToken}` } : {});

  const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=60';

  const [imagesMap, setImagesMap] = useState(() => {
    if (typeof window === 'undefined') return {};
    try {
      return JSON.parse(window.localStorage.getItem('mp_images') || '{}');
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('mp_images', JSON.stringify(imagesMap));
    } catch (e) {
      // ignore
    }
  }, [imagesMap]);

  const keyForItem = (item) => (item.title || item.headline || item.summary || '').slice(0, 200);
  const getImageFor = (item) => {
    const key = keyForItem(item);
    return (imagesMap && imagesMap[key]) || item.image || item.urlToImage || PLACEHOLDER_IMAGE;
  };

  const [detailImageInput, setDetailImageInput] = useState('');
  useEffect(() => {
    if (!selectedDetail) return;
    const key = keyForItem(selectedDetail);
    setDetailImageInput((imagesMap && imagesMap[key]) || selectedDetail.image || selectedDetail.urlToImage || '');
  }, [selectedDetail, imagesMap]);

  function saveDetailImage() {
    if (!selectedDetail || !detailImageInput) return;
    const key = keyForItem(selectedDetail);
    setImagesMap((p) => ({ ...p, [key]: detailImageInput }));
    setSelectedDetail((p) => ({ ...p, image: detailImageInput }));
  }

  const handleImageFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setDetailImageInput(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const ensureTmdbMovie = (movie) => {
    const isTelugu = movie.original_language === 'te';
    const industry = isTelugu ? 'Tollywood' : 'Indian cinema';
    const reportType = isTelugu ? 'Telugu update' : 'Indian update';

    const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
    const isUpcoming = releaseDate ? releaseDate > new Date() : false;
    const category = isUpcoming ? 'Upcoming' : 'In theaters';
    const status = isUpcoming ? 'Coming soon' : 'Now playing';

    return ensureBilingual({
      title: movie.title,
      release: releaseDate ? releaseDate.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) : 'TBA',
      category,
      genre: movie.genre_ids && movie.genre_ids.length > 0 ? 'Movie update' : 'Movie update',
      status,
      reportType,
      platform: 'Theatre',
      rating: movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : 'N/A',
      description: movie.overview || 'Latest movie update.',
      collections: movie.popularity ? `Popularity ${movie.popularity.toFixed(1)}` : '',
      industry,
      image: movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` :
        movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
      isTmdb: true
    });
  };

  const fetchTmdbMovies = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    if (!apiKey) {
      setMovieFetchState({ status: 'no-key', message: 'No TMDb key found. Showing static movie updates.' });
      return;
    }

    const base = 'https://api.themoviedb.org/3';
    const endpoints = [
      `${base}/discover/movie?api_key=${apiKey}&region=IN&language=en-US&sort_by=primary_release_date.desc&with_release_type=2%7C3&vote_count.gte=5&page=1`,
      `${base}/discover/movie?api_key=${apiKey}&region=IN&language=en-US&with_original_language=te&sort_by=primary_release_date.desc&include_adult=false&vote_count.gte=5&page=1`
    ];

    try {
      setMovieFetchState({ status: 'loading', message: 'Loading TMDb Telugu and Indian movie updates…' });
      const results = await Promise.all(endpoints.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) throw new Error(data.status_message || 'TMDb fetch failed');
        if (!Array.isArray(data.results)) throw new Error('Unexpected TMDb response');
        return data.results;
      }));

      const combined = [...results[0], ...results[1]];
      const uniqueMovies = Array.from(new Map(combined.map((movie) => [movie.id, movie])).values());

      if (uniqueMovies.length === 0) {
        throw new Error('TMDb returned no Indian or Telugu movies.');
      }

      setTmdbMovies(uniqueMovies.map(ensureTmdbMovie));
      setMovieFetchState({ status: 'ready', message: '' });
    } catch (error) {
      setMovieFetchState({ status: 'error', message: error.message || 'Unable to load TMDb movies.' });
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
    } catch (error) {
      return 'Recent';
    }
  };

  const getNewsQuery = async (query) => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const url = new URL('https://newsapi.org/v2/everything');
    url.searchParams.set('q', query);
    url.searchParams.set('pageSize', '4');
    url.searchParams.set('language', 'en');
    url.searchParams.set('sortBy', 'publishedAt');

    const response = await fetch(url.toString(), {
      headers: {
        'X-Api-Key': apiKey
      }
    });

    const data = await response.json();
    if (!response.ok || data.status !== 'ok') {
      throw new Error(data.message || 'Live API error');
    }

    return data.articles;
  };

  const fetchApprovedMovies = async () => {
    setMovieFetchState({ status: 'loading', message: 'Loading approved movie updates…' });
    try {
      const response = await fetch(`${API_BASE}/movies`);
      if (!response.ok) throw new Error('Unable to load approved movie updates.');
      const data = await response.json();
      setTmdbMovies(Array.isArray(data) ? data.map((movie) => ensureBilingual({
        ...movie,
        title_te: movie.title_te || movie.title,
        description_te: movie.description_te || movie.description,
        collections_te: movie.collections_te || movie.collections
      })) : []);
      setMovieFetchState({ status: 'ready', message: '' });
    } catch (error) {
      setMovieFetchState({ status: 'error', message: error.message || 'Unable to load approved movies.' });
    }
  };

  const fetchApprovedNews = async () => {
    setNewsState({ status: 'loading', message: 'Loading approved news…' });
    try {
      const response = await fetch(`${API_BASE}/news`);
      if (!response.ok) throw new Error('Unable to load approved news.');
      const data = await response.json();
      setLiveNews({
        politics: Array.isArray(data.politics) ? data.politics.map((article) => ensureBilingual({
          headline: article.headline,
          headline_te: article.headline_te || article.headline,
          summary: article.summary,
          summary_te: article.summary_te || article.summary,
          time: article.time,
          category: article.category,
          url: article.url,
          image: article.image
        })) : [],
        local: Array.isArray(data.local) ? data.local.map((article) => ensureBilingual({
          headline: article.headline,
          headline_te: article.headline_te || article.headline,
          summary: article.summary,
          summary_te: article.summary_te || article.summary,
          time: article.time,
          category: article.category,
          url: article.url,
          image: article.image
        })) : []
      });
      setNewsState({ status: 'ready', message: '' });
    } catch (error) {
      setNewsState({ status: 'error', message: error.message || 'Unable to load approved news.' });
    }
  };

  useEffect(() => {
    fetchApprovedMovies();
    fetchApprovedNews();
  }, []);

  // fetchNews is declared here so it can be called from the Dashboard refresh button
  async function fetchNews() {
    setNewsState({ status: 'loading', message: 'Fetching live headlines…' });
    try {
      const [politicsArticles, localArticles] = await Promise.all([
        getNewsQuery('politics'),
        getNewsQuery('local community OR neighborhood')
      ]);

      setLiveNews({
        politics: politicsArticles.map((article) => ensureBilingual({
          headline: article.title,
          summary: article.description || article.content || 'Read the full story on the source site.',
          time: formatPublishedAt(article.publishedAt),
          category: article.source.name || 'Politics',
          url: article.url,
          image: article.urlToImage
        })),
        local: localArticles.map((article) => ensureBilingual({
          headline: article.title,
          summary: article.description || article.content || 'Read the full story on the source site.',
          time: formatPublishedAt(article.publishedAt),
          category: article.source.name || 'Local',
          url: article.url,
          image: article.urlToImage
        }))
      });

      setNewsState({ status: 'ready', message: '' });
    } catch (error) {
      setNewsState({ status: 'error', message: error.message || 'Unable to fetch live news.' });
    }
  }

  const loginAdmin = async (event) => {
    event.preventDefault();
    setAdminMessage('Signing in…');
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUsername, password: adminPassword })
      });
      if (!response.ok) throw new Error('Invalid admin credentials');
      const data = await response.json();
      setAuthToken(data.token);
      setAdminPassword('');
      setAdminMessage('Signed in successfully.');
      await refreshPendingUpdates();
    } catch (error) {
      setAdminMessage(error.message || 'Login failed');
    }
  };

  const logoutAdmin = () => {
    setAuthToken('');
    setAdminMessage('Signed out.');
    setPendingItems([]);
    setPendingEditDrafts({});
  };

  const loadPendingItems = async () => {
    setPendingState({ status: 'loading', message: 'Loading pending updates…' });
    try {
      const response = await fetch(`${API_BASE}/pending`, { headers: authHeaders() });
      if (!response.ok) throw new Error('Unable to load pending updates');
      const data = await response.json();
      setPendingItems(Array.isArray(data) ? data : []);
      setPendingState({ status: 'ready', message: '' });
    } catch (error) {
      setPendingState({ status: 'error', message: error.message || 'Unable to load pending updates.' });
    }
  };

  const refreshPendingUpdates = async () => {
    setPendingState({ status: 'loading', message: 'Fetching pending updates from APIs…' });
    try {
      const response = await fetch(`${API_BASE}/pending/fetch`, {
        method: 'POST',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Unable to fetch new pending updates');
      }
      const data = await response.json();
      setPendingState({ status: 'ready', message: `Added ${data.added} new pending updates.` });
      await loadPendingItems();
    } catch (error) {
      setPendingState({ status: 'error', message: error.message || 'Unable to refresh pending updates.' });
    }
  };

  const updatePendingDraft = (id, field, value) => {
    setPendingEditDrafts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const savePendingDraft = async (id) => {
    const edits = pendingEditDrafts[id];
    if (!edits) return;
    try {
      const response = await fetch(`${API_BASE}/pending/${id}`, {
        method: 'PUT',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ edits })
      });
      if (!response.ok) throw new Error('Unable to save changes');
      const updated = await response.json();
      setPendingItems((prev) => prev.map((item) => (item.id === id ? updated.pending : item)));
      setAdminMessage('Pending update saved.');
    } catch (error) {
      setAdminMessage(error.message || 'Unable to save pending update.');
    }
  };

  const approvePending = async (id) => {
    const edits = pendingEditDrafts[id] || {};
    try {
      const response = await fetch(`${API_BASE}/pending/${id}/approve`, {
        method: 'POST',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ edits })
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Unable to approve update');
      }
      setPendingItems((prev) => prev.filter((item) => item.id !== id));
      setPendingEditDrafts((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setAdminMessage('Update approved successfully.');
      fetchApprovedMovies();
      fetchApprovedNews();
    } catch (error) {
      setAdminMessage(error.message || 'Unable to approve update.');
    }
  };

  const rejectPending = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/pending/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (!response.ok) throw new Error('Unable to reject update');
      setPendingItems((prev) => prev.filter((item) => item.id !== id));
      setAdminMessage('Update rejected.');
    } catch (error) {
      setAdminMessage(error.message || 'Unable to reject update.');
    }
  };

  useEffect(() => {
    if (authToken) {
      loadPendingItems();
    }
  }, [authToken]);

  const displayedMovies = tmdbMovies.length > 0 ? tmdbMovies : moviesNormalized;

  const filteredMovies = useMemo(
    () => displayedMovies.filter((movie) => {
      const matchesCategory = selectedCategory === 'All' || movie.category === selectedCategory;
      const query = search.toLowerCase();
      const matchesSearch =
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query);
      // tab filtering
      let matchesTab = true;
      switch (selectedMovieTab) {
        case 'box':
          matchesTab = movie.industry === 'Box Office India';
          break;
        case 'tollywood':
          matchesTab = movie.industry === 'Tollywood';
          break;
        case 'latest':
          matchesTab = movie.category === 'Upcoming' || movie.status.toLowerCase().includes('coming');
          break;
        default:
          matchesTab = true;
      }

      return matchesCategory && matchesSearch && matchesTab;
    }),
    [search, selectedCategory, selectedMovieTab]
  );

  const filteredHistoryFilms = useMemo(
    () => historyFilmsNormalized.filter((film) => {
      const query = historySearch.toLowerCase().trim();
      return (
        !query ||
        film.title.toLowerCase().includes(query) ||
        film.title_te.toLowerCase().includes(query)
      );
    }),
    [historySearch]
  );

  const historySections = useMemo(
    () => HISTORY_DECADES.map((section) => ({
      ...section,
      films: filteredHistoryFilms.filter((film) => film.year >= section.start && film.year <= section.end)
    })),
    [filteredHistoryFilms]
  );

  const selectedHistorySection = useMemo(
    () => historySections.find((section) => section.key === selectedHistoryDecade) || historySections[0],
    [historySections, selectedHistoryDecade]
  );

  const displayedPoliticalNews = newsState.status === 'ready' && liveNews.politics.length > 0
    ? liveNews.politics
    : politicalNewsNormalized;

  const displayedLocalNews = newsState.status === 'ready' && liveNews.local.length > 0
    ? liveNews.local
    : localNewsNormalized;

  const openDetail = (item, section) => setSelectedDetail({ ...item, section });
  const closeDetail = () => setSelectedDetail(null);

  return (
    <div className="page-shell">
      <nav className="topbar">
        <div className="logo">Movies & Politics</div>
        <div className="nav-links">
          <a href="#updates">{UI_STRINGS[lang].navUpdates}</a>
          <a href="#history">{UI_STRINGS[lang].navHistory}</a>
          <a href="#politics">{UI_STRINGS[lang].navPolitics}</a>
          <a href="#local">{UI_STRINGS[lang].navLocal}</a>
        </div>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button className="theme-toggle" onClick={toggleLang}>{lang === 'en' ? 'తెలుగు' : 'EN'}</button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <span className="eyebrow">{UI_STRINGS[lang].eyebrow}</span>
          <h1>{UI_STRINGS[lang].heroHeading}</h1>
          <p>{UI_STRINGS[lang].heroCopy}</p>
          <div className="hero-actions">
            <button onClick={() => window.location.hash = '#updates'}>{UI_STRINGS[lang].movieUpdates}</button>
            <button className="ghost outline-button" onClick={() => window.location.hash = '#politics'}>{UI_STRINGS[lang].politicalNews}</button>
          </div>
        </div>

        <div className="hero-image-panel" id="featured">
          <img
            src="https://source.unsplash.com/1200x800/?movie,politics,stars"
            alt="Movie stars and political leaders"
          />
          <div className="hero-image-caption">
            <span>Featured coverage</span>
            <h2>Three clean modules for the stories that matter.</h2>
            <p>Each section now has its own dedicated landing area with a stronger visual identity.</p>
          </div>
        </div>
      </header>
      

      <section className="featured-section">
        <div className="section-header featured-header">
          <div>
            <span className="eyebrow">{UI_STRINGS[lang].featuredStories}</span>
            <h2>{UI_STRINGS[lang].highlights}</h2>
            <p>{UI_STRINGS[lang].heroCopy}</p>
          </div>
          <button className="outline-button" onClick={() => window.location.hash = '#updates'}>{UI_STRINGS[lang].browseAll}</button>
        </div>

        <div className="featured-grid">
          {featuredStoriesNormalized.map((story) => (
            <article key={story.title} className="featured-card" onClick={() => openDetail({ ...story, description: story.summary }, story.tag)}>
              <img src={getImageFor(story)} alt={lang === 'te' ? (story.title_te || story.title) : story.title} className="card-image" />
              <div className="featured-label">{story.tag}</div>
              <h3>{lang === 'te' ? (story.title_te || story.title) : story.title}</h3>
              <p>{lang === 'te' ? (story.summary_te || story.summary) : story.summary}</p>
            </article>
          ))}
        </div>
      </section>

      {selectedDetail && (
        <section className="detail-panel">
          <div className="detail-header">
            <div>
                      <span className="detail-section">{selectedDetail.section}</span>
              <h2>{lang === 'te' ? (selectedDetail.headline_te || selectedDetail.title_te || selectedDetail.headline || selectedDetail.title) : (selectedDetail.headline || selectedDetail.title)}</h2>
            </div>
            <button className="close-button" onClick={closeDetail}>{UI_STRINGS[lang].close}</button>
          </div>
          <div className="detail-meta">
            {selectedDetail.genre && <span>{lang === 'te' ? (selectedDetail.genre_te || selectedDetail.genre) : selectedDetail.genre}</span>}
            {selectedDetail.release && <span>{selectedDetail.release}</span>}
            {selectedDetail.status && <span>{lang === 'te' ? (selectedDetail.status_te || selectedDetail.status) : selectedDetail.status}</span>}
            {selectedDetail.reportType && <span>{lang === 'te' ? (selectedDetail.reportType_te || selectedDetail.reportType) : selectedDetail.reportType}</span>}
            {selectedDetail.platform && <span>{UI_STRINGS[lang].platformLabel}: {selectedDetail.platform}</span>}
            {selectedDetail.rating && <span>{UI_STRINGS[lang].ratingLabel}: {selectedDetail.rating}</span>}
            {selectedDetail.category && <span>{selectedDetail.category}</span>}
            {selectedDetail.time && <span>{selectedDetail.time}</span>}
          </div>

          {selectedDetail.collections && (
            <div className="detail-collections">
              <strong>{UI_STRINGS[lang].collections}:</strong> {lang === 'te' ? (selectedDetail.collections_te || selectedDetail.collections) : selectedDetail.collections}
            </div>
          )}
          {selectedDetail.cast && (
            <div className="detail-extra"><strong>{UI_STRINGS[lang].castLabel}:</strong> {lang === 'te' ? (selectedDetail.cast_te || selectedDetail.cast) : selectedDetail.cast}</div>
          )}
          {selectedDetail.director && (
            <div className="detail-extra"><strong>{UI_STRINGS[lang].directorLabel}:</strong> {lang === 'te' ? (selectedDetail.director_te || selectedDetail.director) : selectedDetail.director}</div>
          )}

          <img src={getImageFor(selectedDetail)} alt={lang === 'te' ? (selectedDetail.headline_te || selectedDetail.title_te || selectedDetail.headline || selectedDetail.title) : (selectedDetail.headline || selectedDetail.title)} className="detail-image" />

          <p className="film-about-label">{UI_STRINGS[lang].movieAbout}</p>
          <p>{lang === 'te' ? (selectedDetail.summary_te || selectedDetail.description_te || selectedDetail.summary || selectedDetail.description) : (selectedDetail.summary || selectedDetail.description)}</p>

          <div className="image-edit-row">
            <input
              placeholder="Paste image URL to attach"
              value={detailImageInput}
              onChange={(e) => setDetailImageInput(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              className="image-upload-input"
            />
            <button className="card-button" type="button" onClick={saveDetailImage}>Save image</button>
          </div>
        </section>
      )}

      <section className="module-preview">
        <article className="module-card module-movies">
          <span>{UI_STRINGS[lang].movieUpdates}</span>
          <h3>Releases, trailers, and reviews</h3>
          <p>Keep readers current with the latest cinema news and premiere rundowns.</p>
        </article>
        <article className="module-card module-politics">
          <span>{UI_STRINGS[lang].politicalNews}</span>
          <h3>Policy, elections, and opinion</h3>
          <p>Show the biggest political stories and trending civic developments.</p>
        </article>
        <article className="module-card module-local">
          <span>{UI_STRINGS[lang].localNews}</span>
          <h3>Community updates</h3>
          <p>Highlight nearby events, neighborhood announcements, and local interest stories.</p>
        </article>
        <article className="module-card module-history">
          <span>{UI_STRINGS[lang].historyTitle}</span>
          <h3>Telugu film archive</h3>
          <p>Search film names to find historical Telugu cinema profiles, cast details, and legacy notes.</p>
        </article>
      </section>

      <section className="section-wrap" id="updates">
        <div className="section-header">
          <div>
            <h2>{UI_STRINGS[lang].movieUpdates}</h2>
            <p>Filter titles, browse by category, and find the stories trending now.</p>
            {movieFetchState.message && (
              <p className={`status-note ${movieFetchState.status}`}>{movieFetchState.message}</p>
            )}
          </div>
          <button
            type="button"
            className="outline-button"
            onClick={fetchApprovedMovies}
          >
            Refresh updates
          </button>
          <div>
            <div className="category-chips movie-tabs" style={{marginBottom: '0.75rem'}}>
              {MOVIE_TAB_KEYS.map((k) => (
                <button
                  key={k}
                  className={k === selectedMovieTab ? 'chip active' : 'chip'}
                  onClick={() => setSelectedMovieTab(k)}
                >
                  {UI_STRINGS[lang].movieTabs[k]}
                </button>
              ))}
            </div>
          </div>
          <div className="search-row">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={UI_STRINGS[lang].searchPlaceholder}
              className="search-input"
            />
            <div className="category-chips">
              {categories.map((category) => (
                <button
                  key={category}
                  className={category === selectedCategory ? 'chip active' : 'chip'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {lang === 'te' ? (category === 'All' ? 'అన్నీ' : category === 'In theaters' ? 'ప్రదర్శనలో' : 'త్వరలో') : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="movie-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <article
                  key={movie.title}
                  className="movie-card"
                  onClick={() => openDetail(movie, 'Movie update')}
                >
                  <img src={getImageFor(movie)} alt={lang === 'te' ? (movie.title_te || movie.title) : movie.title} className="card-image" />
                  <div className="movie-card-top">
                    <span className="movie-tag">{movie.category}</span>
                    {movie.isTmdb && (
                      <span className="movie-status">Latest</span>
                    )}
                    {movie.reportType && (
                      <span className="movie-status">{lang === 'te' ? (movie.reportType_te || movie.reportType) : movie.reportType}</span>
                    )}
                  </div>
                  <h3>{lang === 'te' ? (movie.title_te || movie.title) : movie.title}</h3>
                  <p className="meta">{lang === 'te' ? (movie.genre_te || movie.genre) : movie.genre} • {movie.release}</p>
                  <p className="meta">{UI_STRINGS[lang].platformLabel}: {movie.platform} {movie.rating ? `• ${UI_STRINGS[lang].ratingLabel}: ${movie.rating}` : ''}</p>
                  {movie.collections && (
                    <p className="meta collections-meta">{UI_STRINGS[lang].collections}: {lang === 'te' ? (movie.collections_te || movie.collections) : movie.collections}</p>
                  )}
                  <p>{lang === 'te' ? (movie.description_te || movie.description) : movie.description}</p>
                  <button
                    type="button"
                    className="card-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openDetail(movie, 'Movie update');
                    }}
                  >
                    {UI_STRINGS[lang].readMore}
                  </button>
                </article>
            ))
          ) : (
            <p className="empty-state">{UI_STRINGS[lang].noResults}</p>
          )}
        </div>
      </section>

      <section className="section-wrap admin-panel" id="admin">
        <div className="section-header">
          <div>
            <h2>Admin review</h2>
            <p>Approve or edit updates before they appear on the public feed.</p>
            {(pendingState.message || adminMessage) && (
              <p className={`status-note ${pendingState.status === 'error' ? 'error' : ''}`}>
                {pendingState.message || adminMessage}
              </p>
            )}
          </div>
        </div>
        {!authToken ? (
          <form className="admin-login-form" onSubmit={loginAdmin}>
            <input
              value={adminUsername}
              onChange={(event) => setAdminUsername(event.target.value)}
              placeholder="Admin username"
              className="search-input"
            />
            <input
              type="password"
              value={adminPassword}
              onChange={(event) => setAdminPassword(event.target.value)}
              placeholder="Admin password"
              className="search-input"
            />
            <button type="submit" className="outline-button">Sign in</button>
          </form>
        ) : (
          <div className="admin-actions">
            <button type="button" className="outline-button" onClick={loadPendingItems}>Load pending updates</button>
            <button type="button" className="outline-button" onClick={refreshPendingUpdates}>Fetch new pending updates</button>
            <button type="button" className="outline-button" onClick={logoutAdmin}>Sign out</button>
          </div>
        )}
        {authToken && pendingItems.length === 0 && (
          <p className="empty-state">No pending updates found. Load pending items or fetch new updates from the API.</p>
        )}
        {authToken && pendingItems.length > 0 && (
          <div className="pending-list">
            {pendingItems.map((item) => {
              const draft = pendingEditDrafts[item.id] || {};
              const titleField = item.type === 'movie' ? 'title' : 'headline';
              const summaryField = item.type === 'movie' ? 'description' : 'summary';
              return (
                <article key={item.id} className="news-card admin-pending-card">
                  <h3>{item.type === 'movie' ? 'Movie update' : 'News update'} · {item.subtype || item.category}</h3>
                  <label>
                    {item.type === 'movie' ? 'Title' : 'Headline'}
                    <input
                      value={draft[titleField] ?? item[titleField] ?? ''}
                      onChange={(event) => updatePendingDraft(item.id, titleField, event.target.value)}
                      className="search-input"
                    />
                  </label>
                  <label>
                    Summary
                    <textarea
                      value={draft[summaryField] ?? item[summaryField] ?? ''}
                      onChange={(event) => updatePendingDraft(item.id, summaryField, event.target.value)}
                      rows={3}
                    />
                  </label>
                  <div className="news-meta" style={{ gap: '0.75rem' }}>
                    {item.type === 'movie' && <span>{item.category}</span>}
                    <span>{item.time || item.release || ''}</span>
                  </div>
                  <div className="admin-actions">
                    <button type="button" className="card-button" onClick={() => savePendingDraft(item.id)}>Save edit</button>
                    <button type="button" className="card-button" onClick={() => approvePending(item.id)}>Approve</button>
                    <button type="button" className="card-button" onClick={() => rejectPending(item.id)}>Reject</button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="section-wrap" id="history">
        <div className="section-header">
          <div>
            <h2>{UI_STRINGS[lang].historyTitle}</h2>
            <p>{UI_STRINGS[lang].historyCopy}</p>
          </div>
        </div>
        <div className="search-row">
          <input
            value={historySearch}
            onChange={(event) => setHistorySearch(event.target.value)}
            placeholder={UI_STRINGS[lang].historySearchPlaceholder}
            className="search-input"
          />
        </div>
        <div className="category-chips history-tabs">
          {HISTORY_DECADES.map((section) => (
            <button
              key={section.key}
              className={section.key === selectedHistoryDecade ? 'chip active' : 'chip'}
              onClick={() => setSelectedHistoryDecade(section.key)}
            >
              {section.title}
            </button>
          ))}
        </div>
        {selectedHistorySection && selectedHistorySection.films.length > 0 ? (
          <div className="history-decade-section">
            <div className="section-header decade-header">
              <div>
                <h3>{selectedHistorySection.title}</h3>
                <p>{UI_STRINGS[lang].historySectionLabel}</p>
              </div>
            </div>
            <div className="movie-grid">
              {selectedHistorySection.films.map((film) => (
                <article
                  key={`${selectedHistorySection.key}-${film.title}`}
                  className="movie-card"
                  onClick={() => openDetail(film, 'Telugu films')}
                >
                  <img src={getImageFor(film)} alt={lang === 'te' ? (film.title_te || film.title) : film.title} className="card-image" />
                  <div className="movie-card-top">
                    <span className="movie-tag">{film.category}</span>
                    {film.reportType && (
                      <span className="movie-status">{lang === 'te' ? (film.reportType_te || film.reportType) : film.reportType}</span>
                    )}
                  </div>
                  <h3>{lang === 'te' ? (film.title_te || film.title) : film.title}</h3>
                  <p className="meta">{lang === 'te' ? (film.genre_te || film.genre) : film.genre} • {film.release}</p>
                  <p className="meta">{UI_STRINGS[lang].directorLabel}: {lang === 'te' ? (film.director_te || film.director) : film.director}</p>
                  {film.collections && (
                    <p className="meta collections-meta">{UI_STRINGS[lang].collections}: {lang === 'te' ? (film.collections_te || film.collections) : film.collections}</p>
                  )}
                  <p>{lang === 'te' ? (film.description_te || film.description) : film.description}</p>
                  <button
                    type="button"
                    className="card-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openDetail(film, 'Telugu films');
                    }}
                  >
                    {UI_STRINGS[lang].readMore}
                  </button>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <p className="empty-state">{UI_STRINGS[lang].historyNoResults}</p>
        )}
      </section>

      <section className="section-wrap news-section" id="politics">
        <div className="section-header">
            <div>
            <h2>{UI_STRINGS[lang].politicalNews}</h2>
            <p>Stay informed with the latest national and global political updates.</p>
            {newsState.message && (
              <p className={`status-note ${newsState.status}`}>{newsState.message}</p>
            )}
          </div>
        </div>

        <div className="news-list">
          {displayedPoliticalNews.map((item) => (
            <article
              key={item.headline}
              className="news-card"
              onClick={() => openDetail(item, 'Political news')}
            >
              <img src={getImageFor(item)} alt={lang === 'te' ? (item.headline_te || item.headline) : item.headline} className="card-image" />
              <div className="news-meta">
                <span>{item.time}</span>
                <span>{item.category}</span>
              </div>
              <h3>{lang === 'te' ? (item.headline_te || item.headline) : item.headline}</h3>
              <p>{lang === 'te' ? (item.summary_te || item.summary) : item.summary}</p>
              <button
                type="button"
                className="card-button"
                onClick={(event) => {
                  event.stopPropagation();
                  openDetail(item, 'Political news');
                }}
              >
                {UI_STRINGS[lang].readMore}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap news-section" id="local">
        <div className="section-header">
          <div>
            <h2>{UI_STRINGS[lang].localNews}</h2>
            <p>Local updates from nearby communities and neighborhood events.</p>
          </div>
        </div>

        <div className="news-list">
          {displayedLocalNews.map((item) => (
            <article
              key={item.headline}
              className="news-card"
              onClick={() => openDetail(item, 'Local news')}
            >
              <img src={getImageFor(item)} alt={lang === 'te' ? (item.headline_te || item.headline) : item.headline} className="card-image" />
              <div className="news-meta">
                <span>{item.time}</span>
                <span>{item.category}</span>
              </div>
              <h3>{lang === 'te' ? (item.headline_te || item.headline) : item.headline}</h3>
              <p>{lang === 'te' ? (item.summary_te || item.summary) : item.summary}</p>
              <button
                type="button"
                className="card-button"
                onClick={(event) => {
                  event.stopPropagation();
                  openDetail(item, 'Local news');
                }}
              >
                {UI_STRINGS[lang].readMore}
              </button>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div>
          <p>Movies & Politics</p>
          <p>Curated updates and news for movie fans.</p>
        </div>
        <div>
          <p>{UI_STRINGS[lang].copyright}</p>
        </div>
      </footer>
    </div>
  );
}
