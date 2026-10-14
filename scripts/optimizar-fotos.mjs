// Genera versiones WebP en varios anchos de cada foto de public/fotos/local y
// public/fotos/repuestos, y un índice (src/generado/fotos.json) que usan los
// componentes para armar el srcset. Corre solo antes de `npm run dev` y
// `npm run build` (scripts predev/prebuild), así que basta con soltar el JPG
// o PNG original en la carpeta.
import sharp from 'sharp';
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';

const CARPETAS = ['public/fotos/local', 'public/fotos/repuestos'];
const ANCHOS = [480, 960, 1440];
const EXTENSIONES = /\.(jpe?g|png)$/i;

const indice = {};
let generadas = 0;

for (const carpeta of CARPETAS) {
  const salida = join(carpeta, 'webp');
  await mkdir(salida, { recursive: true });
  const archivos = (await readdir(carpeta)).filter((f) => EXTENSIONES.test(f));

  for (const archivo of archivos) {
    const origen = join(carpeta, archivo);
    const { name } = parse(archivo);
    // .rotate() aplica la orientación EXIF de las fotos tomadas con celular.
    const imagen = sharp(origen).rotate();
    const meta = await imagen.metadata();
    // Orientaciones EXIF 5-8 = foto girada 90°: el ancho real es el alto.
    const girada = (meta.orientation ?? 1) >= 5;
    const width = girada ? meta.height : meta.width;
    const height = girada ? meta.width : meta.height;
    const fechaOrigen = (await stat(origen)).mtimeMs;
    const anchos = ANCHOS.filter((a) => a < width).concat(width).filter((a, i, l) => l.indexOf(a) === i);

    const variantes = [];
    for (const ancho of anchos) {
      const destino = join(salida, `${name}-${ancho}.webp`);
      const existe = await stat(destino).catch(() => null);
      if (!existe || existe.mtimeMs < fechaOrigen) {
        await imagen.clone().resize({ width: ancho }).webp({ quality: 72 }).toFile(destino);
        generadas++;
      }
      variantes.push({ ancho, src: '/' + destino.replaceAll('\\', '/').replace(/^public\//, '') });
    }
    const clave = '/' + origen.replaceAll('\\', '/').replace(/^public\//, '');
    indice[clave] = { ancho: width, alto: height, variantes };
  }
}

await mkdir('src/generado', { recursive: true });
await writeFile('src/generado/fotos.json', JSON.stringify(indice, null, 2));
console.log(`[fotos] ${Object.keys(indice).length} fotos indexadas, ${generadas} variantes WebP nuevas.`);
