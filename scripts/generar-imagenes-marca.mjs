// Fuente única de los logos: genera los SVG de public/logos/ y los PNG de
// marca (Open Graph, íconos). Uso: npm run marca
//
// El logo reproduce el letrero del almacén: letras doradas con sombra azul
// desplazada, como pintadas a mano. Es PROVISIONAL: para la versión final,
// abrir el SVG en Inkscape/Figma y convertir los textos a curvas, porque un
// SVG con <text> depende de que la fuente esté instalada donde se abre.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const C = {
  azul: '#1F4E9E', azulNoche: '#0F2A5C', azulPorton: '#2A7FC1', dorado: '#E0A92E',
  rojo: '#D32F2F', blanco: '#FFFFFF', texto: '#1E2430',
};
const TITULO = "Montserrat, 'Arial Black', Arial, sans-serif";
const TEXTO = 'Inter, Arial, sans-serif';

/** Logo horizontal 560x130. letra/sombra/sub: colores de cada capa. */
export function logoHorizontal({ letra, sombra, sub, titulo = true }) {
  const palabra = (x, y, fill) =>
    `<text x="${x}" y="${y}" textLength="540" lengthAdjust="spacingAndGlyphs" font-family="${TITULO}" font-weight="800" font-size="70" fill="${fill}">SERVIMOPAR</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 130" width="560" height="130"${titulo ? ' role="img" aria-labelledby="t"' : ''}>
  ${titulo ? '<title id="t">Servimopar · Repuestos, importadores y distribuidores</title>' : ''}
  ${sombra ? palabra(9, 72, sombra) : ''}
  ${palabra(12, 68, letra)}
  <text x="14" y="118" textLength="536" lengthAdjust="spacingAndGlyphs" font-family="${TEXTO}" font-weight="700" font-size="17" letter-spacing="1" fill="${sub}">REPUESTOS · IMPORTADORES Y DISTRIBUIDORES</text>
</svg>`;
}

/** Ícono cuadrado: la "S" del letrero sobre el azul del portón, con sus barras blancas abajo. */
export function logoCuadrado() {
  const barras = Array.from({ length: 9 }, (_, i) => `<rect x="${92 + i * 38}" y="392" width="16" height="64" rx="3" fill="${C.blanco}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-labelledby="t">
  <title id="t">Servimopar</title>
  <rect width="512" height="512" rx="96" fill="${C.azul}"/>
  <text x="240" y="338" text-anchor="middle" font-family="${TITULO}" font-weight="800" font-size="330" fill="${C.azulNoche}">S</text>
  <text x="256" y="322" text-anchor="middle" font-family="${TITULO}" font-weight="800" font-size="330" fill="${C.dorado}">S</text>
  ${barras}
</svg>`;
}

const variantes = {
  // Sobre fondo claro: igual al letrero (dorado + sombra azul).
  'servimopar-horizontal.svg': logoHorizontal({ letra: C.dorado, sombra: C.azul, sub: C.azul }),
  // Sobre fondo azul (encabezado de la web): dorado + sombra azul noche.
  'servimopar-sobre-azul.svg': logoHorizontal({ letra: C.dorado, sombra: C.azulNoche, sub: C.blanco }),
  // Blanco total, para fotos o fondos oscuros.
  'servimopar-blanco.svg': logoHorizontal({ letra: C.blanco, sombra: null, sub: C.blanco }),
  // Una sola tinta, para sellos y facturas.
  'servimopar-una-tinta.svg': logoHorizontal({ letra: C.azul, sombra: null, sub: C.azul }),
  'servimopar-cuadrado.svg': logoCuadrado(),
};

for (const [nombre, svg] of Object.entries(variantes)) {
  await writeFile(`public/logos/${nombre}`, svg + '\n');
}
await writeFile('public/favicon.svg', logoCuadrado() + '\n');

// --- PNG (WhatsApp, Facebook y Google no usan SVG) ---------------------------------
await sharp(Buffer.from(logoCuadrado())).resize(512, 512).png().toFile('public/logos/servimopar-cuadrado-512.png');
await sharp(Buffer.from(logoCuadrado())).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(variantes['servimopar-horizontal.svg']), { density: 300 }).resize({ width: 1200 }).png()
  .toFile('public/logos/servimopar-horizontal-1200.png');

// Imagen para compartir (1200x630): foto real de la fachada + franja con el logo.
const fachada = await sharp('public/fotos/local/fachada-servimopar-almacen-abierto.jpg')
  .extract({ left: 0, top: 660, width: 1200, height: 630 }).toBuffer();
const franja = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect y="470" width="1200" height="160" fill="${C.azul}"/>
  <rect y="470" width="1200" height="6" fill="${C.dorado}"/>
  <g transform="translate(40 492) scale(0.82)">${logoHorizontal({ letra: C.dorado, sombra: C.azulNoche, sub: C.blanco, titulo: false }).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>
  <text x="1160" y="548" text-anchor="end" font-family="${TEXTO}" font-weight="700" font-size="30" fill="${C.blanco}">Cra. 15 No. 24-36</text>
  <text x="1160" y="590" text-anchor="end" font-family="${TEXTO}" font-weight="600" font-size="26" fill="${C.blanco}">Centro · Bucaramanga</text>
</svg>`;
await sharp(fachada).composite([{ input: Buffer.from(franja) }]).jpeg({ quality: 82 }).toFile('public/og-servimopar.jpg');

console.log('Logos e imágenes de marca generados.');
