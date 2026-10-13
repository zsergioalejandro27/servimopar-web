import { negocio } from '../config/negocio';

/** Enlace wa.me con mensaje prellenado. Abre la app en el celular y WhatsApp Web en el computador. */
export function enlaceWhatsApp(mensaje = 'Hola, quiero cotizar un repuesto.'): string {
  return `https://wa.me/${negocio.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
}
