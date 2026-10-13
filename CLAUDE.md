# Proyecto: sitio web de Servimopar (repuestos Chevrolet, Dodge, Ram y Jeep, Bucaramanga)

Este archivo es el brief para Claude Code. Léelo completo antes de hacer cambios. La marca está en `MARCA.md` y el plan de posicionamiento en `PLAN-POSICIONAMIENTO.md`.

## Objetivo
Que quien busque en Google "repuestos Dodge Journey" (y variantes por pieza y año) en Bucaramanga encuentre Servimopar, y que pueda cotizar por WhatsApp. Todo con herramientas gratuitas.

## Stack
- **Astro** (sitio estático, rápido, ideal para SEO), sin frameworks pesados.
- Inventario en `data/inventario.csv`; Astro genera una página por repuesto.
- Hosting gratis: Cloudflare Pages (build: `npm run build`, salida: `dist`).
- Sin pagos en línea: el botón principal es WhatsApp.
- Sin dependencias de pago ni servicios con costo.

## Datos del negocio
- Nombre: Servimopar & Cía Ltda. (nombre comercial: Servimopar)
- Dirección: Cra. 15 No. 24-36, Centro, Bucaramanga, Santander, Colombia
- Teléfono: 607 683 5322
- WhatsApp: 314 421 3447 (confirmar con el dueño cuál usar como principal; el secundario es 310 302 4336)
- Correo: servimopar@gmail.com
- Horario: PENDIENTE (preguntar al dueño)
- Marcas: Chevrolet, Dodge, Ram, Jeep, Mopar, LUV, Kodiak, NPR, NKR

## Estructura de la web
1. `/` Inicio: propuesta de valor, buscador por marca/modelo/año, repuestos destacados, mapa, botón de WhatsApp.
2. `/repuestos/` Catálogo con filtros por marca, modelo y categoría.
3. `/repuestos/[slug]/` Una página por repuesto.
4. `/dodge-journey/` Página especial pensada para posicionar "repuestos Dodge Journey": texto útil, lista de piezas disponibles, preguntas frecuentes.
5. `/nosotros/` Historia, el local con fotos reales, importadores y distribuidores.
6. `/contacto/` Dirección, mapa de Google, horario, teléfono, WhatsApp y cómo llegar.

## Cada página de repuesto debe tener
- `<title>` tipo: "Soporte de motor Dodge Journey 2009-2020 | Servimopar Bucaramanga"
- Meta description única (150-160 caracteres)
- Un solo `<h1>` con nombre de la pieza + modelo + años
- Nombre, marca de la pieza, número de parte, compatibilidad (modelo y años), precio (o "cotizar"), disponibilidad, foto
- Botón "Cotizar por WhatsApp" con mensaje prellenado, por ejemplo: `https://wa.me/573144213447?text=Hola, quiero cotizar: {nombre} {modelo} {año} (ref. {numero_parte})`
- Datos estructurados JSON-LD tipo `Product` con `Offer` (si hay precio) y marca
- Texto alt descriptivo en las fotos
- Enlaces internos a otros repuestos del mismo modelo

## SEO técnico obligatorio
- `sitemap.xml` y `robots.txt` generados automáticamente
- JSON-LD `AutoPartsStore` (LocalBusiness) en el inicio y en contacto, con dirección, teléfono, horario y coordenadas
- URLs limpias en minúsculas y sin tildes: `/repuestos/soporte-motor-dodge-journey/`
- Etiqueta canonical en cada página
- Open Graph para que se vea bien al compartir por WhatsApp
- Imágenes optimizadas (WebP, tamaños responsivos, `loading="lazy"`)
- Puntaje Lighthouse objetivo: 90+ en móvil
- Etiquetas `lang="es-CO"`

## Diseño
Seguir `MARCA.md` (paleta azul/rojo/dorado, Montserrat + Inter). Mobile first, porque la mayoría busca desde el celular. Botón flotante de WhatsApp siempre visible.

## Formato del inventario (`data/inventario.csv`)
Columnas: `slug,nombre,categoria,marca_repuesto,numero_parte,vehiculo_marca,vehiculo_modelo,anio_desde,anio_hasta,precio_cop,stock,foto,descripcion`
Si falta un dato, dejarlo vacío y que la página lo maneje sin romperse. Empezar con 20-30 repuestos de Dodge Journey. Crear un CSV de ejemplo con datos claramente falsos marcados "EJEMPLO" para probar, y no publicarlos.

## Reglas de trabajo
- Trabajar por etapas pequeñas y mostrar cómo ver el avance (`npm run dev`).
- Antes de publicar, correr `npm run build` y corregir errores.
- No inventar datos del negocio (horario, precios, referencias). Si falta algo, dejar un `TODO` y avisarme.
- No usar logos de Chevrolet, Dodge, Ram, Jeep ni Mopar como si fueran propios.
- No decir "repuestos originales" en general; usar "original" solo donde el dato del inventario lo indique.
- Hacer commits claros en español.
- Explicarme como si fuera mi primera vez con cada herramienta (Git, Node, Cloudflare).

## Primer prompt para pegar en Claude Code
> Lee CLAUDE.md y MARCA.md. Crea el proyecto Astro en esta carpeta con la estructura descrita, aplica la paleta y tipografías de la marca, y genera un `data/inventario.csv` de ejemplo con 5 repuestos marcados como EJEMPLO. Implementa primero el inicio, la plantilla de página de repuesto con JSON-LD y el botón de WhatsApp. Al final dime cómo verlo en el navegador y qué sigue.

## Orden sugerido de etapas
1. Proyecto base + diseño + inicio
2. Plantilla de repuesto + lectura del CSV
3. Catálogo con filtros + página `/dodge-journey/`
4. Contacto, nosotros, mapa
5. SEO técnico (sitemap, robots, JSON-LD, canonical, Open Graph)
6. Revisión de velocidad y celular
7. Publicar en GitHub + Cloudflare Pages
8. Conectar dominio
