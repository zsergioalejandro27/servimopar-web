<div align="center">

<img src="public/logos/servimopar-horizontal-1200.png" alt="Servimopar · Repuestos, importadores y distribuidores" width="480">

### Sitio web de Servimopar

Repuestos para **Chevrolet, Dodge, Ram y Jeep** en el Centro de Bucaramanga.<br>
Catálogo rápido, pensado para el celular, con cotización directa por WhatsApp.

![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A522.12-5FA04E?logo=nodedotjs&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white)
![Schema.org](https://img.shields.io/badge/SEO-schema.org-1F4E9E)
![Estado](https://img.shields.io/badge/estado-en%20desarrollo-E0A92E)

</div>

<br>

<img src="public/og-servimopar.jpg" alt="Entrada del almacén Servimopar en la Carrera 15 No. 24-36, Bucaramanga" width="100%">

## Sobre el proyecto

Servimopar es un almacén de repuestos en la Cra. 15 No. 24-36 del Centro de Bucaramanga, importador y distribuidor de repuestos para Chevrolet, Dodge, Ram, Jeep, LUV, Kodiak, NPR y NKR.

Este sitio tiene un objetivo concreto: que quien busque en Google algo como *"repuestos Dodge Journey"* encuentre el almacén, vea la pieza que necesita y la cotice por WhatsApp en un toque. No hay pagos en línea: la venta sigue siendo de mostrador.

El diseño sale del propio local. El logo reproduce el letrero pintado a mano, el encabezado imita las barras azules y blancas del portón y el pie de página usa la baldosa de la fachada y el piso del almacén.

## Características

| | |
|---|---|
| **Una página por repuesto** | Generada a partir de un CSV, con título, descripción y URL únicos para cada pieza. |
| **Cotización por WhatsApp** | Cada botón abre el chat con un mensaje ya escrito: pieza, modelo, años y número de parte. |
| **SEO local** | JSON-LD `AutoPartsStore` con dirección, coordenadas y horario; `Product` en cada repuesto. |
| **Rápido en el celular** | HTML estático, fotos en WebP responsive y casi nada de JavaScript. |
| **Datos honestos** | Si falta un precio, la página dice *"cotizar"*; nada se inventa ni se marca como original sin serlo. |
| **Listo para compartir** | Open Graph con la foto real del local para que el enlace se vea bien en WhatsApp. |

## Tecnologías

- **[Astro](https://astro.build)** genera un sitio estático, sin frameworks pesados en el navegador.
- **HTML, CSS y JavaScript vanilla.**
- **[csv-parse](https://csv.js.org/parse/)** lee el inventario en tiempo de build.
- **[sharp](https://sharp.pixelplumbing.com)** optimiza las fotos y genera las imágenes de marca.
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** crea el `sitemap.xml` automáticamente.
- **Google Fonts**: Montserrat (títulos) e Inter (texto).
- **Cloudflare Pages** publica el sitio gratis.

## Empezar

**Requisitos:** [Node.js](https://nodejs.org) 22.12 o superior (se recomienda la versión LTS) y Git.

```bash
git clone https://github.com/zsergioalejandro27/servimopar-web.git
cd servimopar-web
npm install
npm run dev
```

El sitio queda en **http://localhost:4321** y se recarga solo con cada cambio.

### Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor local de desarrollo (incluye los repuestos de ejemplo). |
| `npm run build` | Genera el sitio final en `dist/` (excluye los ejemplos). |
| `npm run preview` | Sirve `dist/` localmente para revisarlo antes de publicar. |
| `npm run fotos` | Crea las versiones WebP de las fotos (corre solo antes de `dev` y `build`). |
| `npm run marca` | Regenera los logos SVG, los íconos y la imagen para compartir. |

## Estructura

```text
servimopar-web/
├── data/
│   └── inventario.csv        # Fuente del catálogo: una fila = una página
├── public/
│   ├── fotos/
│   │   ├── local/            # Fotos reales del almacén
│   │   └── repuestos/        # Fotos de cada repuesto (nombre referenciado en el CSV)
│   ├── logos/                # Variantes del logo en SVG y PNG
│   └── robots.txt
├── scripts/
│   ├── optimizar-fotos.mjs   # JPG/PNG → WebP en 480, 960 y 1440 px
│   └── generar-imagenes-marca.mjs
└── src/
    ├── config/negocio.ts     # Nombre, dirección, teléfonos, horario y coordenadas
    ├── lib/                  # Lectura del inventario, JSON-LD, enlaces de WhatsApp
    ├── components/           # Encabezado, pie, tarjetas, galería, mapa…
    ├── layouts/Base.astro    # <head> con SEO: canonical, Open Graph, idioma
    └── pages/                # Cada archivo es una URL del sitio
```

## Inventario

El catálogo se administra desde `data/inventario.csv`; se puede editar con Excel o Google Sheets y exportar como CSV.

| Columna | Ejemplo | Notas |
|---|---|---|
| `slug` | `soporte-motor-dodge-journey` | URL de la página. Minúsculas, números y guiones, sin tildes. Único. |
| `nombre` | `Soporte de motor` | Nombre de la pieza, sin el vehículo. |
| `categoria` | `Motor` | |
| `marca_repuesto` | `GS` | Fabricante **de la pieza**, no del carro. |
| `numero_parte` | `EM-5612116` | |
| `vehiculo_marca` / `vehiculo_modelo` | `Dodge` / `Journey` | |
| `anio_desde` / `anio_hasta` | `2009` / `2020` | |
| `precio_cop` | `185000` | Vacío = la página muestra *"cotizar"*. |
| `stock` | `3` | `0` = agotado; vacío = *"consultar disponibilidad"*. |
| `foto` | `soporte-motor-journey.jpg` | Archivo dentro de `public/fotos/repuestos/`. |
| `descripcion` | | Texto libre. |

Cualquier dato puede quedar vacío: la página se adapta sin romperse. Las filas cuyo `slug` empieza por `ejemplo-` solo se ven en desarrollo; nunca se publican ni entran al sitemap.

## SEO

- `<title>` y meta description únicos por página.
- Un solo `<h1>` por página.
- URL canónica absoluta.
- `lang="es-CO"`.
- **JSON-LD** con [schema.org](https://schema.org):
  - `AutoPartsStore` en el inicio y en contacto.
  - `Product` en cada repuesto, con `Offer` solo cuando hay precio real.
  - La compatibilidad con el vehículo va en `isAccessoryOrSparePartFor`.
- `sitemap.xml` y `robots.txt`.
- Imágenes con texto alternativo descriptivo, `srcset` y carga diferida.
- Nombre, dirección y teléfono definidos en un solo archivo, para que sean idénticos en todo el sitio y coincidan con el Perfil de Empresa en Google.

## Publicación

El sitio se publica en **Cloudflare Pages** conectado a este repositorio:

| Ajuste | Valor |
|---|---|
| Comando de build | `npm run build` |
| Carpeta de salida | `dist` |
| Variable de entorno | `SITE_URL` = dominio definitivo (opcional) |

Cada `git push` a `main` publica una nueva versión.

## Hoja de ruta

- [x] Proyecto base, marca y logo provisional
- [x] Plantilla de repuesto con JSON-LD y WhatsApp
- [x] Inicio y contacto con fotos reales, mapa y horario
- [ ] Catálogo con filtros y página especial de Dodge Journey
- [ ] Página *Nosotros* con la historia del almacén
- [ ] Inventario real (20-30 repuestos de Dodge Journey con fotos)
- [ ] Publicación en Cloudflare Pages y dominio propio
- [ ] Search Console, Analytics y Merchant Center

## Aviso legal

Chevrolet, Dodge, Ram, Jeep, Mopar y las demás marcas mencionadas pertenecen a sus respectivos dueños. Sus nombres se usan solo para indicar con qué vehículos es compatible cada repuesto.

Este repositorio es público como referencia, pero **no tiene una licencia de código abierto**: el código, las fotos y la marca Servimopar son de uso reservado.

<div align="center">
<br>
<sub><b>Servimopar & Cía Ltda.</b> · Cra. 15 No. 24-36, Centro, Bucaramanga · 607 683 5322</sub>
</div>
