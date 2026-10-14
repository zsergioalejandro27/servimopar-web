# Marca Servimopar: colores, tipografía y logo

Basado en las fotos del local (letrero, puertas, estantería, tarjeta de presentación).

## Datos del negocio (tomados de las fotos)
- Nombre comercial: **Servimopar** (en el letrero: "Servimopar Ltda."; en la tarjeta: "Servimopar & Cía Ltda.")
- Confirmar el nombre legal exacto en el certificado de Cámara de Comercio.
- Actividad: importadores y distribuidores de repuestos
- Marcas que atienden: Chevrolet, Dodge, Ram, Jeep, Mopar, LUV, Kodiak, NPR, NKR
- Dirección: Cra. 15 No. 24-36, Centro, Bucaramanga
- Teléfono fijo (tarjeta): 607 683 5322
- Teléfonos del letrero (formato viejo, confirmar si siguen activos): 630 3129 y 630 3532
- WhatsApp: 314 421 3447 y 310 302 4336 (decidir cuál va en la web y en Google)
- Correo: servimopar@gmail.com
- Contacto en la tarjeta: Sergio Amaya Muñoz

## Paleta de colores
Salen de lo que ya tiene el local, para que la web se sienta igual que la tienda. Los hex son aproximados: con un cuentagotas (eyedropper) sobre las fotos o en Figma/Canva se pueden afinar.

| Uso | Color | Hex aprox. | De dónde sale |
|---|---|---|---|
| Primario | Azul rey | `#1F4E9E` | Portón, estantes, borde de la tarjeta |
| Primario oscuro | Azul noche | `#0F2A5C` | Fondo oscuro de la tarjeta, textos grandes |
| Acento 1 | Rojo | `#D32F2F` | Letrero "LUV", nombre en la tarjeta |
| Acento 2 | Dorado | `#E0A92E` | Letras "SERVIMOPAR" del letrero |
| Apoyo | Terracota | `#C0603A` | "DODGE" en la ventana, piso del local |
| Fondo | Blanco | `#FFFFFF` | Letrero y paredes |
| Fondo suave | Gris azulado claro | `#F3F6FB` | Secciones alternas de la web |
| Texto | Gris carbón | `#1E2430` | Texto de lectura |

Reglas de uso:
- Fondo blanco, encabezado y botones en azul, rojo solo para llamadas a la acción importantes (WhatsApp, "Cotizar") y dorado para detalles pequeños.
- Mantener buen contraste: texto blanco sobre azul sí; texto dorado sobre blanco no.
- Botón de WhatsApp en el verde oficial (`#25D366`), porque la gente lo reconoce.

## Tipografía (gratis, Google Fonts)
- Títulos y logo: **Montserrat** ExtraBold o **Poppins** Bold
- Texto: **Inter** o **Open Sans**
- Números de parte: una fuente monoespaciada como **JetBrains Mono** o **IBM Plex Mono**

## Logo: instrucciones

> **Decisión (13-oct-2026):** el logo provisional reproduce el letrero del almacén: "SERVIMOPAR" en letras doradas (`#E0A92E`) con sombra azul desplazada (`#1F4E9E`), como pintado a mano. El ícono cuadrado es la "S" dorada sobre azul con las barras blancas del portón. Se generan con `npm run marca` (`scripts/generar-imagenes-marca.mjs`). Falta convertir los textos a curvas para la versión final.
**Concepto:** simple, legible de lejos y que recuerde al letrero del local.

1. **Texto:** "SERVIMOPAR" en mayúsculas, Montserrat ExtraBold, azul `#1F4E9E`.
2. **Detalle:** una franja corta dorada o roja debajo de la palabra, o una "O" que parezca una rueda o engranaje.
3. **Subtítulo:** "REPUESTOS · IMPORTADORES Y DISTRIBUIDORES", en gris carbón, letra pequeña con espaciado amplio.
4. **Variantes que hay que tener:**
   - Horizontal (para el encabezado de la web)
   - Cuadrada con solo la "S" (para el ícono de Google, WhatsApp y redes)
   - Versión blanca (para fondos azules)
   - Versión de un solo color (para sellos y facturas)
5. **Formatos:** SVG y PNG con fondo transparente. Tamaño mínimo del PNG: 1000 px de ancho; el ícono de Google Business debe ser cuadrado, mínimo 250x250 px.

**Importante (marcas registradas):** NO usar los logos de Chevrolet, Dodge, Ram, Jeep ni Mopar dentro del logo de Servimopar ni como si fueran propios. Los nombres de las marcas sí se pueden escribir como texto para decir qué repuestos se venden ("Repuestos para Dodge Journey"). Si algún día quieren mostrar los logos de las marcas, que sea en una sección de "Marcas que atendemos" y con aclaración de que no son oficiales, salvo que tengan autorización de la marca.

**Cómo hacerlo:**
- Opción A (gratis, rápido): pedirle a Claude Code que genere el logo en SVG con estas instrucciones, y ajustarlo hasta que guste.
- Opción B (gratis): Canva, con las fuentes y colores de arriba.
- Opción C: un diseñador, si más adelante quieren algo más pulido.

## Fotos
- Mantener las fotos originales del local en `public/fotos/local/`:
  - Fachada con letrero (la foto frontal con el portón cerrado sirve para Google, porque se ve el nombre y el número 24-36)
  - Interior con vitrinas y estantería
- Fotos de cada repuesto: fondo limpio, buena luz, de frente y con la caja o referencia visible.
- Nombrar los archivos con la referencia, por ejemplo `soporte-motor-dodge-journey-em5612116.jpg`.
- Reducir el peso (máx. ~300 KB por foto) para que la web cargue rápido.

## Tono de los textos
Cercano y directo, como un mostrador: "Dinos tu modelo y año, y te confirmamos si lo tenemos". Evitar frases como "repuestos originales" para todo el catálogo si algunas referencias son de marcas alternas (en las vitrinas se ven cajas de GS, Eagle y Standard). Usar "original" solo en los productos que realmente lo son, y poner la marca de cada repuesto.
