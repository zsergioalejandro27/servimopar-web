// Datos del negocio en UN solo lugar. La web, el JSON-LD y los enlaces de
// WhatsApp salen de aquí: así el NAP (nombre, dirección, teléfono) es idéntico
// en todo el sitio, algo que Google usa para confiar en un negocio local.

export interface FranjaHorario {
  dias: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[];
  abre: string; // '08:00'
  cierra: string; // '18:00'
}

export const negocio = {
  nombre: 'Servimopar',
  nombreLegal: 'Servimopar & Cía Ltda.', // TODO: confirmar con el certificado de Cámara de Comercio
  descripcion:
    'Importadores y distribuidores de repuestos para Chevrolet, Dodge, Ram y Jeep en Bucaramanga. Cotiza por WhatsApp.',
  direccion: {
    calle: 'Cra. 15 No. 24-36',
    barrio: 'Centro',
    ciudad: 'Bucaramanga',
    departamento: 'Santander',
    pais: 'CO',
    codigoPostal: undefined as string | undefined, // TODO: confirmar código postal
  },
  telefono: { visible: '607 683 5322', e164: '+576076835322' },
  // TODO: confirmar con el dueño cuál WhatsApp es el principal (secundario: 310 302 4336).
  whatsapp: { visible: '314 421 3447', numero: '573144213447' },
  correo: 'servimopar@gmail.com',
  marcas: ['Chevrolet', 'Dodge', 'Ram', 'Jeep', 'Mopar', 'LUV', 'Kodiak', 'NPR', 'NKR'],

  // Confirmado por el dueño (13-oct-2026). TODO: preguntar si abren los festivos.
  horario: [
    { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], abre: '08:00', cierra: '17:00' },
    { dias: ['Saturday'], abre: '08:00', cierra: '12:00' },
  ] as FranjaHorario[],

  // Coordenadas del pin en Google Maps.
  geo: { lat: 7.124075, lng: -73.128957 } as { lat: number; lng: number } | undefined,
};

export const direccionCompleta = `${negocio.direccion.calle}, ${negocio.direccion.barrio}, ${negocio.direccion.ciudad}, ${negocio.direccion.departamento}`;

// Embed de Google Maps sin API key (gratis), centrado en las coordenadas exactas del local.
// TODO: cuando el Perfil de Empresa esté verificado, usar su enlace para que el pin muestre la ficha.
const coordenadas = `${negocio.geo!.lat},${negocio.geo!.lng}`;
export const mapaEmbed = `https://www.google.com/maps?q=${coordenadas}&z=18&output=embed`;
export const mapaComoLlegar = `https://www.google.com/maps/dir/?api=1&destination=${coordenadas}`;

const diasES: Record<string, string> = {
  Monday: 'Lunes', Tuesday: 'Martes', Wednesday: 'Miércoles', Thursday: 'Jueves',
  Friday: 'Viernes', Saturday: 'Sábado', Sunday: 'Domingo',
};
const hora = (h: string) => {
  const [hh, mm] = h.split(':').map(Number);
  const sufijo = hh < 12 ? 'a. m.' : 'p. m.';
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return mm ? `${h12}:${String(mm).padStart(2, '0')} ${sufijo}` : `${h12} ${sufijo}`;
};
const rangoDias = (dias: string[]) =>
  dias.length > 2 ? `${diasES[dias[0]]} a ${diasES[dias.at(-1)!]}` : dias.map((d) => diasES[d]).join(' y ');

/** [{ dias: 'Lunes a Viernes', horas: '8 a. m. – 5 p. m.' }, ...] */
export const horarioLegible = negocio.horario.map((h) => ({
  dias: rangoDias(h.dias),
  horas: `${hora(h.abre)} – ${hora(h.cierra)}`,
}));

/** Fotos reales del local (originales en public/fotos/local/). */
export const fotosLocal = {
  fachadaCerrada: {
    src: '/fotos/local/fachada-servimopar-porton-cerrado.jpg',
    alt: 'Fachada de Servimopar en la Carrera 15 No. 24-36, con el letrero del almacén y el portón azul y blanco',
  },
  fachadaAbierta: {
    src: '/fotos/local/fachada-servimopar-almacen-abierto.jpg',
    alt: 'Almacén Servimopar abierto, con las vitrinas de repuestos a la entrada, en el Centro de Bucaramanga',
  },
  entrada: {
    src: '/fotos/local/entrada-vitrinas-servimopar.jpg',
    alt: 'Entrada de Servimopar: vitrinas con repuestos en caja y estantería azul al fondo',
  },
  interior: {
    src: '/fotos/local/interior-estanteria-vitrinas-servimopar.jpg',
    alt: 'Interior de Servimopar: estantes llenos de repuestos, mezzanine y vitrina con soportes de motor',
  },
};
