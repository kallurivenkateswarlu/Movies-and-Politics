import fs from 'fs';
import path from 'path';

const guidePath = path.resolve('LAUNCH_GUIDE.md');
const pdfPath = path.resolve('LAUNCH_GUIDE.pdf');
const markdown = fs.readFileSync(guidePath, 'utf8');
const lines = markdown.split(/\r?\n/);

function escapePdf(text) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

const textLines = lines.map((line) => escapePdf(line));
const textStreamLines = [];
textStreamLines.push('BT');
textStreamLines.push('/F1 10 Tf');
textStreamLines.push('50 770 Td');
textLines.forEach((line, index) => {
  if (index > 0) {
    textStreamLines.push('T*');
  }
  textStreamLines.push(`(${line}) Tj`);
});
textStreamLines.push('ET');
const textStream = textStreamLines.join(' ');
const streamBytes = Buffer.from(textStream, 'utf8');

const objects = [];
objects.push({ id: 1, content: '<< /Type /Catalog /Pages 2 0 R >>' });
objects.push({ id: 2, content: '<< /Type /Pages /Kids [3 0 R] /Count 1 >>' });
objects.push({ id: 3, content: '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>' });
objects.push({ id: 4, content: `<< /Length ${streamBytes.length} >>\nstream\n${textStream}\nendstream` });
objects.push({ id: 5, content: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>' });

let pdf = '%PDF-1.4\n%âãÏÓ\n';
const offsets = [0];
for (const obj of objects) {
  const offset = Buffer.byteLength(pdf, 'utf8');
  offsets.push(offset);
  pdf += `${obj.id} 0 obj\n${obj.content}\nendobj\n`;
}
const xrefOffset = Buffer.byteLength(pdf, 'utf8');
pdf += 'xref\n0 ' + (objects.length + 1) + '\n';
pdf += '0000000000 65535 f \n';
for (let i = 1; i < offsets.length; i += 1) {
  pdf += offsets[i].toString().padStart(10, '0') + ' 00000 n \n';
}
pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

fs.writeFileSync(pdfPath, pdf, 'binary');
console.log('Generated', pdfPath);