// Datos del negocio en UN solo lugar. La web, el JSON-LD y los enlaces de
// WhatsApp salen de aquí: así el NAP (nombre, dirección, teléfono) es idéntico
// en todo el sitio, algo que Google usa para confiar en un negocio local.

export interface FranjaHorario {
  dias: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[];
  abre: string; // "08:00"
  cierra: string; // "18:00"
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

  // TODO: HORARIO PENDIENTE (preguntar al dueño). Ejemplo del formato:
  // [{ dias: ['Monday','Tuesday','Wednesday','Thursday','Friday'], abre: '08:00', cierra: '18:00' }]
  horario: [] as FranjaHorario[],

  // TODO: coordenadas exactas del local (copiarlas del Perfil de Empresa en Google Maps).
  geo: undefined as { lat: number; lng: number } | undefined,
};

export const direccionCompleta = `${negocio.direccion.calle}, ${negocio.direccion.barrio}, ${negocio.direccion.ciudad}, ${negocio.direccion.departamento}`;

const consultaMapa = encodeURIComponent('Servimopar, Carrera 15 #24-36, Bucaramanga, Santander, Colombia');
// Embed de Google Maps sin API key (gratis).
// TODO: reemplazar por el embed del Perfil de Empresa cuando esté verificado.
export const mapaEmbed = `https://www.google.com/maps?q=${consultaMapa}&output=embed`;
export const mapaComoLlegar = `https://www.google.com/maps/dir/?api=1&destination=${consultaMapa}`;

const diasES: Record<string, string> = {
  Monday: 'Lunes', Tuesday: 'Martes', Wednesday: 'Miércoles', Thursday: 'Jueves',
  Friday: 'Viernes', Saturday: 'Sábado', Sunday: 'Domingo',
};
export const horarioLegible = negocio.horario.map(
  (h) => `${h.dias.map((d) => diasES[d]).join(', ')}: ${h.abre} – ${h.cierra}`,
);
