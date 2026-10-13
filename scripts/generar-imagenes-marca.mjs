// Genera las imágenes PNG de marca a partir de SVG con sharp (viene con Astro).
// Uso: node scripts/generar-imagenes-marca.mjs
// Nota: sharp dibuja el texto con las fuentes instaladas en este equipo; si no
// tienes Montserrat instalada saldrá con una fuente parecida (es provisional).
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const blanco = await readFile('public/logos/servimopar-blanco.svg', 'utf8');
const interior = blanco.replace(/^[\s\S]*?<title[\s\S]*?<\/title>/, '').replace(/<\/svg>\s*$/, '');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1F4E9E"/>
  <rect y="590" width="1200" height="40" fill="#0F2A5C"/>
  <g transform="translate(140 170) scale(1.77)">${interior}</g>
  <text x="140" y="500" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="34" fill="#FFFFFF">Chevrolet · Dodge · Ram · Jeep — Bucaramanga</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile('public/og-servimopar.png');
await sharp('public/logos/servimopar-cuadrado.svg').resize(512, 512).png().toFile('public/logos/servimopar-cuadrado-512.png');
await sharp('public/logos/servimopar-cuadrado.svg').resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp('public/logos/servimopar-horizontal.svg').resize({ width: 1200 }).png().toFile('public/logos/servimopar-horizontal-1200.png');
console.log('Imágenes de marca generadas.');
