// Datos estructurados (JSON-LD, schema.org) y metadatos.
// El JSON-LD no cambia lo que ve la persona: le describe a Google, en un
// formato que entiende sin ambigüedad, qué es la página (un negocio, un producto).
import { negocio, fotosLocal } from '../config/negocio';
import {
  type Repuesto, tituloRepuesto, rangoAnios, vehiculo,
} from './inventario';

/** URL absoluta a partir de una ruta del sitio. */
export const absoluta = (ruta: string, site: URL | undefined) => new URL(ruta, site).href;

/** Identificador estable del negocio: otras páginas o datos pueden referirse a él con este @id. */
export const idNegocio = (site: URL | undefined) => absoluta('/#negocio', site);

export function jsonLdNegocio(site: URL | undefined) {
  const n = negocio;
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore',
    '@id': idNegocio(site),
    name: n.nombre,
    legalName: n.nombreLegal,
    description: n.descripcion,
    url: absoluta('/', site),
    logo: absoluta('/logos/servimopar-cuadrado-512.png', site),
    // Fotos reales del local: Google las usa para mostrar el negocio.
    image: [fotosLocal.fachadaCerrada, fotosLocal.fachadaAbierta, fotosLocal.interior].map((f) => absoluta(f.src, site)),
    telephone: n.telefono.e164,
    email: n.correo,
    address: {
      '@type': 'PostalAddress',
      streetAddress: n.direccion.calle,
      addressLocality: n.direccion.ciudad,
      addressRegion: n.direccion.departamento,
      addressCountry: n.direccion.pais,
      ...(n.direccion.codigoPostal && { postalCode: n.direccion.codigoPostal }),
    },
    // Solo se publican si existen: es mejor omitir que inventar.
    ...(n.geo && { geo: { '@type': 'GeoCoordinates', latitude: n.geo.lat, longitude: n.geo.lng } }),
    ...(n.horario.length > 0 && {
      openingHoursSpecification: n.horario.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.dias.map((d) => `https://schema.org/${d}`),
        opens: h.abre,
        closes: h.cierra,
      })),
    }),
    areaServed: { '@type': 'City', name: 'Bucaramanga' },
    // TODO: sameAs con Facebook, Instagram y el enlace del Perfil de Empresa en Google.
  };
}

// Sin precio publicado no hay `offers`. Google entiende igual qué es la página y
// con qué vehículo es compatible, pero no muestra el precio en el resultado
// (Search Console avisará "falta offers": es esperado, no es un error del sitio).
export function jsonLdProducto(r: Repuesto, site: URL | undefined, urlPagina: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tituloRepuesto(r),
    url: urlPagina,
    ...(r.descripcion && { description: r.descripcion }),
    ...(r.categoria && { category: r.categoria }),
    // Sin foto real no se declara imagen: el placeholder no representa el producto.
    ...(r.foto && { image: absoluta(`/fotos/repuestos/${r.foto}`, site) }),
    ...(r.numeroParte && { sku: r.numeroParte, mpn: r.numeroParte }),
    // "brand" es el fabricante del REPUESTO, no del carro. Poner "Dodge" aquí
    // daría a entender que la pieza es original de Dodge.
    ...(r.marcaRepuesto && { brand: { '@type': 'Brand', name: r.marcaRepuesto } }),
    ...(vehiculo(r) && {
      isAccessoryOrSparePartFor: {
        '@type': 'Vehicle',
        name: [vehiculo(r), rangoAnios(r)].filter(Boolean).join(' '),
        ...(r.vehiculoMarca && { brand: { '@type': 'Brand', name: r.vehiculoMarca } }),
        ...(r.vehiculoModelo && { model: r.vehiculoModelo }),
      },
    }),
  };
}

/**
 * Meta description única por repuesto, apuntando a 150-160 caracteres
 * (lo que Google suele mostrar completo en el resultado).
 */
export function descripcionRepuesto(r: Repuesto): string {
  const partes = [
    tituloRepuesto(r),
    r.marcaRepuesto && ` marca ${r.marcaRepuesto}`,
    r.numeroParte && `, ref. ${r.numeroParte}`,
    '. ',
    'Cotiza precio y disponibilidad por WhatsApp en Servimopar',
  ].filter(Boolean).join('');
  const conDireccion = `${partes}, ${negocio.direccion.calle}, Bucaramanga.`;
  if (conDireccion.length <= 160) return conDireccion;
  const corta = `${partes}, Bucaramanga.`;
  if (corta.length <= 160) return corta;
  return corta.slice(0, 157).replace(/\s+\S*$/, '') + '…';
}
