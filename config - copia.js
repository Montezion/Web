/**
 * ============================================================
 *  MONTE ZION - APART DE MONTAÑA
 *  ARCHIVO DE CONFIGURACIÓN CENTRAL
 * ============================================================
 *  INSTRUCCIONES:
 *  - Edita SOLO este archivo para cambiar textos, colores,
 *    links de fotos/videos e IDs de analítica.
 *  - Nunca toques el HTML o CSS directamente para contenido.
 * ============================================================
 */

const MONTE_ZION_CONFIG = {

  // ──────────────────────────────────────────────────────────
  // 1. MARKETING, SEO Y TRACKING
  // ──────────────────────────────────────────────────────────
  marketing: {
    pixel_id: "957922966916898",
    analytics_id: "G-XXXXXXX",
    tag_manager_id: "GTM-XXXXXXX",
    meta_title_home: "Monte Zion | Apart de Montaña en Catamarca",
    meta_desc_home: "Disfruta de la paz y el lujo en el corazón de la montaña. Cabañas y apartamentos totalmente equipados.",
    og_image: "fotos/social-share.jpg"
  },

  // ──────────────────────────────────────────────────────────
  // 2. CONTACTO
  // ──────────────────────────────────────────────────────────
  contacto: {
    whatsapp_numero: "5493834334989",   // Formato internacional sin el +
    email: "reservas@montezion.com.ar",
    redes: {
      instagram: "https://instagram.com/montezion",
      facebook: "https://facebook.com/montezion"
    },
    // Template del mensaje al confirmar reserva — los {{tokens}} se reemplazan por JS
    whatsapp_template: "🏠 *Apartamento:* {{apartamento}}\n📅 *Desde:* {{desde}}\n📅 *Hasta:* {{hasta}}\n👥 *Huéspedes:* {{huespedes}}\n💳 *Pago:* {{medio_pago}}\n\n💰 *Total:* {{total}}\n✅ *Seña (30%):* {{sena}}\n\n_Mis datos: {{nombre}} | WhatsApp: {{whatsapp_user}}{{email_user}}_\n\n_{{mensaje}}_"
  },

  // ──────────────────────────────────────────────────────────
  // 3. ENCABEZADO (HEADER)
  // ──────────────────────────────────────────────────────────
  encabezado: {
    logo_url: "fotos/logo azul.png",
    logo_alt: "fotos/LOGO NARANJA.png",
    menu_items: [
      { etiqueta: "Inicio", anclaje: "#inicio" },
      { etiqueta: "Departamentos", anclaje: "#apartamentos" },
      { etiqueta: "Servicios", anclaje: "#servicios" },
      { etiqueta: "Actividades", anclaje: "#actividades" },
      { etiqueta: "Galería", anclaje: "#galeria" },
      { etiqueta: "Ubicación", anclaje: "#ubicacion" }
    ],
    boton_reservar: {
      etiqueta: "Reservar",
      url: "reservas.html"
    }
  },

  // ──────────────────────────────────────────────────────────
  // 4. SECCIÓN HERO (VIDEO Y TEXTOS DINÁMICOS)
  // ──────────────────────────────────────────────────────────
  hero: {
    video_desktop_url: "videos/hero-pc.mp4",
    video_mobile_url: "videos/hero-celular.mp4",
    textos_rotativos: [
      "Tu refugio en el corazón de la montaña",
      "rodeado de naturaleza",
      "El descanso que te mereces"
    ]
  },

  // ──────────────────────────────────────────────────────────
  // 5. SECCIÓN BIENVENIDA
  // ──────────────────────────────────────────────────────────
  bienvenida: {
    titulo: "Dónde Alojarse",
    mensaje: "Bienvenidos a Monte Zion. Un espacio diseñado para conectar con la naturaleza y disfrutar de la paz de Catamarca. Cada rincón fue pensado para que encuentres el equilibrio entre el confort y la autenticidad de la montaña."
  },

  // ──────────────────────────────────────────────────────────
  // 6. TARJETAS DE APARTAMENTOS (PÁGINA PRINCIPAL)
  // ──────────────────────────────────────────────────────────
  apartamentos: [
    {
      id: "apart-1",
      titulo_principal: "Apart Benteveo",
      titulo_secundario: "Vista Panorámica · 2 Huéspedes",
      detalle_breve: "Ideal para parejas que buscan intimidad, confort y vistas inigualables.",
      comodidades_resumen: "Cama 2 plazas / Aire frio-calor / Wi-Fi / Ropa Blanca / Elem.Higiene / Cocina completa ",
      url_detalle: "apartamento-1.html"
    },
    {
      id: "apart-2",
      titulo_principal: "Apart Colibrí",
      titulo_secundario: "Espacio y Confort · 5 Huéspedes",
      detalle_breve: "Perfecto para familias. Espacio amplio y cocina completa.",
      comodidades_resumen: "Cocina completa · 2 habitaciones · Deck exterior",
      url_detalle: "apartamento-2.html"
    },
    {
      id: "apart-3",
      titulo_principal: "Apart Carpintero",
      titulo_secundario: "Intimidad familiar · 3 Huéspedes",
      detalle_breve: "Rodeada de verde y absoluto silencio. La experiencia más auténtica.",
      comodidades_resumen: "Parrilla propia · Hogar a leña · Cochera",
      url_detalle: "apartamento-3.html"
    }
  ],

  // ──────────────────────────────────────────────────────────
  // 7. SECCIÓN SERVICIOS
  // ──────────────────────────────────────────────────────────
  servicios: {
    titulo_seccion: "Nuestros Servicios",
    subtitulo: "Todo lo que necesitas para una estadía perfecta, pensado hasta el último detalle.",
    tarjetas: [
      {
        titulo: "Comodidades",
        icono: "✦",
        especificaciones: ["Wi-Fi", "Las medialunas más ricas", "Aire Frio/Calor", "Puedes traer tu mascota"]
      },
      {
        titulo: "Equipamiento",
        icono: "✦",
        especificaciones: ["Cocina completa", "Elementos de Higiene personal", "Vajilla completa", "Ropa blanca"]
      },
      {
        titulo: "Espacios",
        icono: "✦",
        especificaciones: ["Balcon con vista a la montaña", "Rio a 10 minutos a pie", "Senderos para caminatas", "Mirador de estrellas"]
      },
      {
        titulo: "Actividades",
        icono: "✦",
        especificaciones: ["Senderismo guiado", "Avistaje de aves", "Cabalgatas", "Yoga al amanecer"]
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // 8. INFO LOGÍSTICA (micro-tarjetas bajo servicios)
  // ──────────────────────────────────────────────────────────
  info_logistica: [
    { icono: "🕒", titulo: "Check-in", texto: "A partir de las 13:00 hs" },
    { icono: "🏠", titulo: "Check-Out", texto: "Hasta las 11:00 hs" },
    { icono: "🚭", titulo: "Libre de humo", texto: "Espacio cuidado libre de humo" },
    { icono: "🐾", titulo: "Mascotas", texto: "¡Somos Pet Friendly! Bajo petición previa.", es_pet_friendly: true }
  ],

  // ──────────────────────────────────────────────────────────
  // 9. SECCIÓN QUÉ HACER (ACTIVIDADES)
  // ──────────────────────────────────────────────────────────
  que_hacer: {
    titulo_seccion: "¿Qué podés hacer?",
    subtitulo: "La naturaleza de Catamarca te espera con aventuras para todos los gustos.",
    actividades: [
      {
        foto: "fotos/actividad-senderismo.jpg",
        titulo: "Senderismo",
        descripcion: "Recorré senderos de montaña con guías locales y descubrí paisajes únicos."
      },
      {
        foto: "fotos/actividad-cabalgata.jpg",
        titulo: "Cabalgatas",
        descripcion: "Explorá las sierras a caballo y conectá con la tradición gaucha catamarqueña."
      },
      {
        foto: "fotos/actividad-astroturismo.jpg",
        titulo: "Astroturismo",
        descripcion: "El cielo más limpio de la Argentina te regala noches de observación estelar."
      },
      {
        foto: "fotos/actividad-piscina.jpg",
        titulo: "Relax & Piscina",
        descripcion: "Disfrutá de la piscina climatizada rodeada de naturaleza y paz."
      },
      {
        foto: "fotos/actividad-gastronomia.jpg",
        titulo: "Gastronomía Regional",
        descripcion: "Sabores auténticos de Catamarca en tu mesa. Empanadas, locro y más."
      },
      {
        foto: "fotos/actividad-yoga.jpg",
        titulo: "Yoga al Amanecer",
        descripcion: "Comenzá el día con energía. Clases de yoga con vista a las sierras."
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // 10. GALERÍA DE FOTOS
  // ──────────────────────────────────────────────────────────
  galeria: {
    titulo_seccion: "Galería",
    fotos: [
      "fotos/galeria-01.jpg",
      "fotos/galeria-02.jpg",
      "fotos/galeria-03.jpg",
      "fotos/galeria-04.jpg",
      "fotos/galeria-05.jpg",
      "fotos/galeria-06.jpg",
      "fotos/galeria-07.jpg",
      "fotos/galeria-08.jpg"
    ]
  },

  // ──────────────────────────────────────────────────────────
  // 11. UBICACIÓN
  // ──────────────────────────────────────────────────────────
  ubicacion: {
    titulo_seccion: "Ubicación",
    subtitulo: "En el corazón de las Sierras de Catamarca",
    texto_cta: "Ver en Google Maps →",
    video_zoom_loop: "videos/zoom-catamarca.mp4",
    google_maps_link: "https://maps.google.com/?q=Catamarca+Monte+Zion"
  },

  // ──────────────────────────────────────────────────────────
  // 12. FOOTER
  // ──────────────────────────────────────────────────────────
  footer: {
    ciudad: "Catamarca, Argentina",
    copyright: "© 2026 Monte Zion - Apart de Montaña",
    desarrollo: "Desarrollado por WorkCaptital"
  },

  // ──────────────────────────────────────────────────────────
  // 13. PÁGINAS DETALLE (una por apartamento)
  // ──────────────────────────────────────────────────────────
  paginas_detalle: [
    {
      id: "apart-1",
      hero_foto: "fotos/apart-1-hero.jpg",
      titulo_principal: "Benteveo",
      info_tecnica: "Hasta 2 huéspedes · 45 m² · Cama Doble plaza",
      descripcion_larga: "Sumérgete en la experiencia definitiva de la montaña. El Apart Benteveo combina discreción con la autenticidad natural. Desde su amplio balcón, su inigualable terraza, las vistas a las cumbres de Catamarca te acompañarán en cada momento. Un refugio íntimo y exclusivo, diseñado para parejas que buscan reconectarse con lo esencial.",
      servicios_iconos: [
        { nombre: "Vistas Panorámicas", icono: "⛰️" },
        { nombre: "Climatización", icono: "🌡️" },
        { nombre: "Wi-Fi", icono: "📶" },
        { nombre: "Cocina Equipada", icono: "🍳" },
        { nombre: "Cochera Cubierta", icono: "🚗" },
        { nombre: "Desayuno Regional", icono: "☕" }
      ],
      galeria_fotos: [
        "fotos/benteveo1.jpg",
        "fotos/benteveo2.jpg",
        "fotos/benteveo3.jpg",
        "fotos/benteveo4.jpg"
      ]
    },
    {
      id: "apart-2",
      hero_foto: "fotos/apart-2-hero.jpg",
      titulo_principal: "Colibrí",
      info_tecnica: "Hasta 5 huéspedes · 70 m² - Cama Matrimonial + 3 simples",
      descripcion_larga: "Diseñado para que toda la familia disfrute. El Apart Colibrí ofrece amplios espacios, una cocina completa y un deck exterior perfecto para compartir atardeceres únicos. La naturaleza a tu alrededor y el fantástico balcon a la montaña.",
      servicios_iconos: [
        { nombre: "Vistas Panorámicas", icono: "⛰️" },
        { nombre: "2 aires Frio/Calor", icono: "🌡️" },
        { nombre: "Wi-Fi", icono: "📶" },
        { nombre: "Cocina Completa", icono: "🍳" },
        { nombre: "Cochera Cubierta", icono: "🚗" },
        { nombre: "Desayuno Regional", icono: "☕" }
      ],
      galeria_fotos: [
        "fotos/apart-2-01.jpg",
        "fotos/apart-2-02.jpg",
        "fotos/apart-2-03.jpg",
        "fotos/apart-2-04.jpg"
      ]
    },
    {
      id: "apart-3",
      hero_foto: "fotos/apart-3-hero.jpg",
      titulo_principal: "Carpintero",
      info_tecnica: "Hasta 3 huéspedes · 60 m² · Cama Matrimonial + individual",
      descripcion_larga: "La experiencia más auténtica de Monte Zion. Rodeada de una vista exuberante y el sonido del viento y los pajaros. Aca te puedes conectar con Tigo mismo facilmente",
      servicios_iconos: [
        { nombre: "Vistas Panorámicas", icono: "⛰️" },
        { nombre: "Aire frio/calor", icono: "🔥" },
        { nombre: "Wi-Fi", icono: "📶" },
        { nombre: "Cocina completa", icono: "🍖" },
        { nombre: "Cochera Cubierta", icono: "🚗" },
        { nombre: "Desayuno Regional", icono: "☕" }
      ],
      galeria_fotos: [
        "fotos/apart-3-01.jpg",
        "fotos/apart-3-02.jpg",
        "fotos/apart-3-03.jpg",
        "fotos/apart-3-04.jpg"
      ]
    }
  ],

  // ──────────────────────────────────────────────────────────
  // 14. SECCIÓN DE RESERVAS
  // ──────────────────────────────────────────────────────────
  reserva: {
    config_general: {
      porcentaje_sena: 0.30,  // 30% de seña
      porcentaje_saldo: 0.70,  // 70% saldo al ingresar
      whatsapp_destino: "5493834034056",
      moneda: "$"
    },
    paso_1_seleccion: [
      {
        id: "apart-1",
        precio_noche: 45000,
        capacidad_maxima: 2
      },
      {
        id: "apart-2",
        precio_noche: 65000,
        capacidad_maxima: 5
      },
      {
        id: "apart-3",
        precio_noche: 85000,
        capacidad_maxima: 3
      }
    ],
    paso_2_detalles: {
      banner_titulo: "Tarifa y Disponibilidad",
      incluye: ["Ropa blanca", "Desayuno seco", "Estacionamiento"],
      no_incluye: ["Lavandería", "Tours adicionales"],
      promocion_activa: "🔥 10% OFF pagando en efectivo"
    },
    paso_3_formulario: {
      medios_pago: ["Efectivo", "Transferencia Bancaria", "Tarjeta de Crédito"],
      campos: {
        nombre: { requerido: true, label: "Nombre Completo" },
        whatsapp: { requerido: true, label: "WhatsApp (Obligatorio)" },
        email: { requerido: false, label: "Email (Opcional)" }
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // 15. APARIENCIA Y PALETAS DE COLOR
  // ──────────────────────────────────────────────────────────
  apariencia: {
    // Cambia "AZUL_NOCHE" por "ATARDECER" para alternar el tema
    tema_activo: "AZUL_NOCHE",
    paletas: {
      AZUL_NOCHE: {
        "--color-fondo-general": "#0B162C",
        "--color-fondo-secundario": "#1A2C4C",
        "--color-fondo-tarjeta": "#162238",
        "--color-header-bg": "rgba(11, 22, 44, 0.97)",
        "--color-texto-principal": "#FFFFFF",
        "--color-texto-secundario": "#B0C4DE",
        "--color-acento": "#FFCC00",
        "--color-acento-hover": "#FFD740",
        "--color-boton-reserva-fondo": "#FFCC00",
        "--color-boton-reserva-texto": "#0B162C",
        "--color-boton-reserva-glow": "rgba(255, 204, 0, 0.5)",
        "--color-borde": "rgba(255, 204, 0, 0.2)",
        "--color-separador-linea": "#FFCC00",
        "--color-overlay-hero": "rgba(11, 22, 44, 0.55)",
        "--fuente-titulos": "'Playfair Display', Georgia, serif",
        "--fuente-cuerpo": "'Montserrat', Arial, sans-serif",
        "--calendar-invert-filter": "1"
      },
      MAR_PROFUNDO: {
        "--color-fondo-general": "#040A18",
        "--color-fondo-secundario": "#0B1526",
        "--color-fondo-tarjeta": "#07101E",
        "--color-header-bg": "rgba(4, 10, 24, 0.98)",
        "--color-texto-principal": "#E4E9F2",
        "--color-texto-secundario": "#8A9CB3",
        "--color-acento": "#E5A900",
        "--color-acento-hover": "#FFC107",
        "--color-boton-reserva-fondo": "#E5A900",
        "--color-boton-reserva-texto": "#040A18",
        "--color-boton-reserva-glow": "rgba(229, 169, 0, 0.4)",
        "--color-borde": "rgba(229, 169, 0, 0.15)",
        "--color-separador-linea": "#E5A900",
        "--color-overlay-hero": "rgba(4, 10, 24, 0.7)",
        "--fuente-titulos": "'Playfair Display', Georgia, serif",
        "--fuente-cuerpo": "'Montserrat', Arial, sans-serif",
        "--calendar-invert-filter": "1"
      },
      CIELO_NOCTURNO: {
        "--color-fondo-general": "#152238",
        "--color-fondo-secundario": "#223554",
        "--color-fondo-tarjeta": "#1B2A46",
        "--color-header-bg": "rgba(21, 34, 56, 0.95)",
        "--color-texto-principal": "#FFFFFF",
        "--color-texto-secundario": "#C2D1E5",
        "--color-acento": "#FFDA44",
        "--color-acento-hover": "#FFEA8A",
        "--color-boton-reserva-fondo": "#FFDA44",
        "--color-boton-reserva-texto": "#152238",
        "--color-boton-reserva-glow": "rgba(255, 218, 68, 0.6)",
        "--color-borde": "rgba(255, 218, 68, 0.25)",
        "--color-separador-linea": "#FFDA44",
        "--color-overlay-hero": "rgba(21, 34, 56, 0.45)",
        "--fuente-titulos": "'Lora', Georgia, serif",
        "--fuente-cuerpo": "'Quicksand', Arial, sans-serif",
        "--calendar-invert-filter": "1"
      },
      AMANECER_SIERRA: {
        "--color-fondo-general": "#FFF3E0",
        "--color-fondo-secundario": "#FFE0B2",
        "--color-fondo-tarjeta": "#FFFFFF",
        "--color-header-bg": "linear-gradient(135deg, #E65100 0%, #FFB300 100%)",
        "--color-texto-principal": "#3E2723",
        "--color-texto-secundario": "#D84315",
        "--color-acento": "#FF8F00",
        "--color-acento-hover": "#FF6F00",
        "--color-boton-reserva-fondo": "#FF8F00",
        "--color-boton-reserva-texto": "#FFFFFF",
        "--color-boton-reserva-glow": "rgba(255, 143, 0, 0.5)",
        "--color-borde": "rgba(255, 143, 0, 0.3)",
        "--color-separador-linea": "#D84315",
        "--color-overlay-hero": "rgba(230, 81, 0, 0.4)",
        "--fuente-titulos": "'Lora', Georgia, serif",
        "--fuente-cuerpo": "'Montserrat', Arial, sans-serif"
      },
      FUEGO_ANDINO: {
        "--color-fondo-general": "#FFF8F5",
        "--color-fondo-secundario": "#FFCCBC",
        "--color-fondo-tarjeta": "#FFFFFF",
        "--color-header-bg": "linear-gradient(135deg, #BF360C 0%, #E64A19 100%)",
        "--color-texto-principal": "#3E2723",
        "--color-texto-secundario": "#BF360C",
        "--color-acento": "#D84315",
        "--color-acento-hover": "#BF360C",
        "--color-boton-reserva-fondo": "#D84315",
        "--color-boton-reserva-texto": "#FFFFFF",
        "--color-boton-reserva-glow": "rgba(216, 67, 21, 0.5)",
        "--color-borde": "rgba(216, 67, 21, 0.3)",
        "--color-separador-linea": "#BF360C",
        "--color-overlay-hero": "rgba(191, 54, 12, 0.5)",
        "--fuente-titulos": "'Lora', Georgia, serif",
        "--fuente-cuerpo": "'Montserrat', Arial, sans-serif"
      },
      SOL_RADIANTE: {
        "--color-fondo-general": "#FFFDF5",
        "--color-fondo-secundario": "#FFF176",
        "--color-fondo-tarjeta": "#FFFFFF",
        "--color-header-bg": "linear-gradient(135deg, #F57F17 0%, #FBC02D 100%)",
        "--color-texto-principal": "#4E342E",
        "--color-texto-secundario": "#F57F17",
        "--color-acento": "#F9A825",
        "--color-acento-hover": "#F57F17",
        "--color-boton-reserva-fondo": "#F9A825",
        "--color-boton-reserva-texto": "#FFFFFF",
        "--color-boton-reserva-glow": "rgba(249, 168, 37, 0.5)",
        "--color-borde": "rgba(249, 168, 37, 0.4)",
        "--color-separador-linea": "#F57F17",
        "--color-overlay-hero": "rgba(245, 127, 23, 0.4)",
        "--fuente-titulos": "'Playfair Display', Georgia, serif",
        "--fuente-cuerpo": "'Quicksand', Arial, sans-serif"
      },
      // ── NUEVAS CÁLIDAS ──
      ARENA_SOLEADA: {
        "--color-fondo-general": "#FFF8E1",
        "--color-fondo-secundario": "#FFECB3",
        "--color-fondo-tarjeta": "#FFFFFF",
        "--color-header-bg": "linear-gradient(135deg, #FFB300 0%, #FFCA28 100%)",
        "--color-texto-principal": "#5D4037",
        "--color-texto-secundario": "#8D6E63",
        "--color-acento": "#FF8F00",
        "--color-acento-hover": "#FF6F00",
        "--color-boton-reserva-fondo": "#FF8F00",
        "--color-boton-reserva-texto": "#FFFFFF",
        "--color-boton-reserva-glow": "rgba(255, 143, 0, 0.5)",
        "--color-borde": "rgba(255, 143, 0, 0.2)",
        "--color-separador-linea": "#FFB300",
        "--color-overlay-hero": "rgba(255, 179, 0, 0.35)",
        "--fuente-titulos": "'Lora', Georgia, serif",
        "--fuente-cuerpo": "'Montserrat', Arial, sans-serif"
      },
      MAGMA_VOLCANICO: {
        "--color-fondo-general": "#2D0A02",
        "--color-fondo-secundario": "#4A1105",
        "--color-fondo-tarjeta": "#1E0601",
        "--color-header-bg": "linear-gradient(135deg, #0A0200 0%, #2D0A02 100%)",
        "--color-texto-principal": "#FFCCBC",
        "--color-texto-secundario": "#FF8A65",
        "--color-acento": "#FF3D00",
        "--color-acento-hover": "#DD2C00",
        "--color-boton-reserva-fondo": "#FF3D00",
        "--color-boton-reserva-texto": "#FFFFFF",
        "--color-boton-reserva-glow": "rgba(255, 61, 0, 0.6)",
        "--color-borde": "rgba(255, 61, 0, 0.25)",
        "--color-separador-linea": "#FF3D00",
        "--color-overlay-hero": "rgba(45, 10, 2, 0.8)",
        "--fuente-titulos": "'Playfair Display', Georgia, serif",
        "--fuente-cuerpo": "'Quicksand', Arial, sans-serif",
        "--calendar-invert-filter": "1"
      },
      BRONCE_ANTIGUO: {
        "--color-fondo-general": "#1A1512",
        "--color-fondo-secundario": "#261D18",
        "--color-fondo-tarjeta": "#312620",
        "--color-header-bg": "linear-gradient(135deg, #100C09 0%, #261D18 100%)",
        "--color-texto-principal": "#FFE0B2",
        "--color-texto-secundario": "#D7CCC8",
        "--color-acento": "#D84315",
        "--color-acento-hover": "#E64A19",
        "--color-boton-reserva-fondo": "#D84315",
        "--color-boton-reserva-texto": "#FFFFFF",
        "--color-boton-reserva-glow": "rgba(216, 67, 21, 0.5)",
        "--color-borde": "rgba(216, 67, 21, 0.2)",
        "--color-separador-linea": "#D84315",
        "--color-overlay-hero": "rgba(26, 21, 18, 0.75)",
        "--fuente-titulos": "'Lora', Georgia, serif",
        "--fuente-cuerpo": "'Montserrat', Arial, sans-serif",
        "--calendar-invert-filter": "1"
      },
      // ── NUEVAS FRÍAS ──
      AZUL_HIELO: {
        "--color-fondo-general": "#F0F4F8",
        "--color-fondo-secundario": "#D1E2EE",
        "--color-fondo-tarjeta": "#FFFFFF",
        "--color-header-bg": "linear-gradient(135deg, #1A365D 0%, #2A4365 100%)",
        "--color-texto-principal": "#1A365D",
        "--color-texto-secundario": "#4A5568",
        "--color-acento": "#3182CE",
        "--color-acento-hover": "#2B6CB0",
        "--color-boton-reserva-fondo": "#3182CE",
        "--color-boton-reserva-texto": "#FFFFFF",
        "--color-boton-reserva-glow": "rgba(49, 130, 206, 0.5)",
        "--color-borde": "rgba(49, 130, 206, 0.25)",
        "--color-separador-linea": "#2A4365",
        "--color-overlay-hero": "rgba(26, 54, 93, 0.45)",
        "--fuente-titulos": "'Lora', Georgia, serif",
        "--fuente-cuerpo": "'Quicksand', Arial, sans-serif"
      },
      GLACIAR_PROFUNDO: {
        "--color-fondo-general": "#E0F2F1",
        "--color-fondo-secundario": "#B2DFDB",
        "--color-fondo-tarjeta": "#FFFFFF",
        "--color-header-bg": "linear-gradient(135deg, #004D40 0%, #00695C 100%)",
        "--color-texto-principal": "#00251A",
        "--color-texto-secundario": "#004D40",
        "--color-acento": "#00796B",
        "--color-acento-hover": "#00695C",
        "--color-boton-reserva-fondo": "#00796B",
        "--color-boton-reserva-texto": "#FFFFFF",
        "--color-boton-reserva-glow": "rgba(0, 121, 107, 0.5)",
        "--color-borde": "rgba(0, 121, 107, 0.3)",
        "--color-separador-linea": "#004D40",
        "--color-overlay-hero": "rgba(0, 77, 64, 0.5)",
        "--fuente-titulos": "'Playfair Display', Georgia, serif",
        "--fuente-cuerpo": "'Montserrat', Arial, sans-serif"
      },
      NEBULA_DARK: {
        "--color-fondo-general": "#0F0C29",
        "--color-fondo-secundario": "#302B63",
        "--color-fondo-tarjeta": "#24243E",
        "--color-header-bg": "linear-gradient(135deg, #0F0C29 0%, #302B63 100%)",
        "--color-texto-principal": "#E0E7FF",
        "--color-texto-secundario": "#A5B4FC",
        "--color-acento": "#818CF8",
        "--color-acento-hover": "#6366F1",
        "--color-boton-reserva-fondo": "#818CF8",
        "--color-boton-reserva-texto": "#0F0C29",
        "--color-boton-reserva-glow": "rgba(129, 140, 248, 0.6)",
        "--color-borde": "rgba(129, 140, 248, 0.2)",
        "--color-separador-linea": "#818CF8",
        "--color-overlay-hero": "rgba(15, 12, 41, 0.75)",
        "--fuente-titulos": "'Playfair Display', Georgia, serif",
        "--fuente-cuerpo": "'Quicksand', Arial, sans-serif",
        "--calendar-invert-filter": "1"
      }
    }
  },

  // ──────────────────────────────────────────────────────────
  // 16. SECCIÓN LEGAL
  // ──────────────────────────────────────────────────────────
  legal: {
    url_privacidad: "privacidad.html",
    texto_footer_privacidad: "Política de Privacidad",
    // Contenido de la página de privacidad
    privacidad_titulo: "Política de Privacidad - Monte Zion",
    privacidad_actualizado: "Última actualización: Marzo 2026",
    privacidad_secciones: [
      {
        numero: "1",
        titulo: "Datos recolectados",
        texto: "Solo solicitamos tu nombre completo, número de WhatsApp y correo electrónico (opcional)."
      },
      {
        numero: "2",
        titulo: "Finalidad",
        texto: "Tus datos serán utilizados exclusivamente para gestionar tu solicitud de reserva, enviarte el presupuesto correspondiente y contactarte vía WhatsApp o Email para coordinar los detalles de tu estadía."
      },
      {
        numero: "3",
        titulo: "No cesión a terceros",
        texto: "No compartimos, vendemos ni alquilamos tus datos personales a terceras empresas bajo ninguna circunstancia."
      },
      {
        numero: "4",
        titulo: "Tus derechos",
        texto: "Puedes solicitar el acceso, rectificación o eliminación de tus datos en cualquier momento enviando un correo a reservas@montezion.com.ar."
      },
      {
        numero: "5",
        titulo: "Consentimiento",
        texto: "Al utilizar nuestro formulario de reserva y hacer clic en el botón de confirmación, aceptas el tratamiento de tus datos para los fines aquí descritos."
      }
    ]
  }

};
