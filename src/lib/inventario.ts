// Lee data/inventario.csv en tiempo de build y lo convierte en objetos tipados.
// Regla de oro: si falta un dato, el campo queda `undefined` y las páginas lo
// manejan. Una fila incompleta nunca debe romper el build.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'csv-parse/sync';

export interface Repuesto {
  slug: string;
  nombre: string;
  categoria?: string;
  marcaRepuesto?: string;
  numeroParte?: string;
  vehiculoMarca?: string;
  vehiculoModelo?: string;
  anioDesde?: number;
  anioHasta?: number;
  precioCop?: number;
  stock?: number;
  foto?: string;
  descripcion?: string;
  esEjemplo: boolean;
}

const texto = (v: unknown) => {
  const s = String(v ?? '').trim();
  return s === '' ? undefined : s;
};
const entero = (v: unknown) => {
  const s = texto(v)?.replace(/[.\s$]/g, ''); // tolera "123.456" o "$ 123456"
  if (!s) return undefined;
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : undefined;
};
const slugValido = (s: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);

function cargar(): Repuesto[] {
  // process.cwd() es la raíz del proyecto tanto en `dev` como en `build`.
  const crudo = readFileSync(join(process.cwd(), 'data', 'inventario.csv'), 'utf8');
  const filas: Record<string, string>[] = parse(crudo, {
    columns: true,
    skip_empty_lines: true,
    bom: true, // Excel guarda los CSV con BOM
    trim: true,
  });

  const vistos = new Set<string>();
  const repuestos: Repuesto[] = [];
  filas.forEach((f, i) => {
    const linea = i + 2; // +1 por el encabezado, +1 porque las líneas se cuentan desde 1
    const slug = texto(f.slug)?.toLowerCase();
    const nombre = texto(f.nombre);
    if (!slug || !nombre) {
      console.warn(`[inventario] Línea ${linea}: falta slug o nombre, se omite.`);
      return;
    }
    if (!slugValido(slug)) {
      console.warn(`[inventario] Línea ${linea}: slug "${slug}" inválido (solo minúsculas, números y guiones, sin tildes). Se omite.`);
      return;
    }
    if (vistos.has(slug)) {
      console.warn(`[inventario] Línea ${linea}: slug repetido "${slug}", se omite.`);
      return;
    }
    vistos.add(slug);
    repuestos.push({
      slug,
      nombre,
      categoria: texto(f.categoria),
      marcaRepuesto: texto(f.marca_repuesto),
      numeroParte: texto(f.numero_parte),
      vehiculoMarca: texto(f.vehiculo_marca),
      vehiculoModelo: texto(f.vehiculo_modelo),
      anioDesde: entero(f.anio_desde),
      anioHasta: entero(f.anio_hasta),
      precioCop: entero(f.precio_cop),
      stock: entero(f.stock),
      foto: texto(f.foto),
      descripcion: texto(f.descripcion),
      esEjemplo: slug.startsWith('ejemplo-'),
    });
  });

  // Los ejemplos solo existen en desarrollo (npm run dev), salvo que se pida
  // explícitamente con INCLUIR_EJEMPLOS=true para probar un build.
  const incluirEjemplos = import.meta.env.DEV || process.env.INCLUIR_EJEMPLOS === 'true';
  return incluirEjemplos ? repuestos : repuestos.filter((r) => !r.esEjemplo);
}

export const inventario: Repuesto[] = cargar();

// --- Ayudas de presentación ------------------------------------------------------

/** "2009-2020", "2012", "2009 en adelante" o "" si no hay años. */
export function rangoAnios(r: Repuesto): string {
  const { anioDesde: d, anioHasta: h } = r;
  if (d && h) return d === h ? `${d}` : `${d}-${h}`;
  if (d) return `${d} en adelante`;
  if (h) return `hasta ${h}`;
  return '';
}

/** "Dodge Journey" */
export function vehiculo(r: Repuesto): string {
  return [r.vehiculoMarca, r.vehiculoModelo].filter(Boolean).join(' ');
}

/** Nombre completo para h1 y title: "Soporte de motor Dodge Journey 2009-2020" */
export function tituloRepuesto(r: Repuesto): string {
  return [r.nombre, vehiculo(r), rangoAnios(r)].filter(Boolean).join(' ');
}

const formatoCOP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
export const precioLegible = (r: Repuesto) => (r.precioCop ? formatoCOP.format(r.precioCop) : undefined);

export type Disponibilidad = 'disponible' | 'agotado' | 'consultar';
export function disponibilidad(r: Repuesto): Disponibilidad {
  if (r.stock === undefined) return 'consultar';
  return r.stock > 0 ? 'disponible' : 'agotado';
}

export function fotoUrl(r: Repuesto): string {
  return r.foto ? `/fotos/repuestos/${r.foto}` : '/fotos/repuesto-sin-foto.svg';
}

/** Mensaje prellenado: "Hola, quiero cotizar: Soporte de motor Dodge Journey 2009-2020 (ref. 5085)" */
export function mensajeCotizacion(r: Repuesto): string {
  const ref = r.numeroParte ? ` (ref. ${r.numeroParte})` : '';
  return `Hola, quiero cotizar: ${tituloRepuesto(r)}${ref}`;
}

/** Otros repuestos del mismo modelo, para enlazado interno. */
export function relacionados(r: Repuesto, max = 6): Repuesto[] {
  return inventario
    .filter((o) => o.slug !== r.slug && o.vehiculoModelo && o.vehiculoModelo === r.vehiculoModelo)
    .slice(0, max);
}
