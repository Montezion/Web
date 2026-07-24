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
    whatsapp_numero: "5493834949319",   // Formato internacional sin el +
    email: "jacintafaggi1@gmail.com",
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
      { etiqueta: "Aparts", anclaje: "#apartamentos" },
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
    video_desktop_url: "videos/HERO_MONTEZION_pc2000.mp4",
    video_mobile_url: "videos/HERO_MONTEZION_cel2000.mp4",
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
      comodidades_resumen: "Cama 2 plazas · Aire frio-calor · Wi-Fi · Ropa Blanca · Elem.Higiene · Cocina completa ",
      url_detalle: "apartamento-1.html"
    },
    {
      id: "apart-2",
      titulo_principal: "Apart Colibrí",
      titulo_secundario: "Espacio y Confort · 5 Huéspedes",
      detalle_breve: "Perfecto para familias. Espacio amplio y cocina completa.",
      comodidades_resumen: "Cocina completa · 2 habitaciones · Aire frio-calor · Wi-Fi · Deck exterior · Vistas",
      url_detalle: "apartamento-2.html"
    },
    {
      id: "apart-3",
      titulo_principal: "Apart Carpintero",
      titulo_secundario: "Grupo de amigos · 3 Huéspedes",
      detalle_breve: "Rodeada de montaña y silencio. Comodidad y privacidad.",
      comodidades_resumen: "3 camas simples · Aire frio-calor · Wi-Fi · Ropa Blanca · Lavarropas · Cocina completa ",
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
        icono: "hotel",
        especificaciones: ["Wi-Fi", "Las medialunas más ricas", "Aire Frio/Calor", "Puedes traer tu mascota"]
      },
      {
        titulo: "Equipamiento",
        icono: "countertops",
        especificaciones: ["Cocina completa", "Elementos de Higiene personal", "Vajilla completa", "Ropa blanca"]
      },
      {
        titulo: "Espacios",
        icono: "landscape",
        especificaciones: ["Balcon con vista a la montaña", "Rio a 10 minutos a pie", "Senderos para caminatas", "Mirador de estrellas"]
      },
      {
        titulo: "Actividades",
        icono: "hiking",
        especificaciones: ["Senderismo", "Rio a 10 minutos", "Cabalgatas", "Yoga al amanecer"]
      },
      {
        titulo: "Traslados y Excursiones",
        icono: "commute",
        especificaciones: [
          "Coordinación de traslados al aeropuerto y ciudad de Catamarca",
          "Excursiones para recorrer distintos paisajes y destinos de la provincia",
          "Servicios brindados por prestadores externos (sujetos a disponibilidad)"
        ]
      },
      {
        titulo: "Bienestar y Armonía",
        icono: "spa",
        especificaciones: [
          "Masajes relajantes",
          "Reflexología",
          "Estética Facial",
          "Tai Chi"
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // 8. INFO LOGÍSTICA (micro-tarjetas bajo servicios)
  // ──────────────────────────────────────────────────────────
  info_logistica: [
    { icono: "schedule", titulo: "Check-in", texto: "A partir de las 13:00 hs" },
    { icono: "key", titulo: "Check-Out", texto: "Hasta las 11:00 hs" },
    { icono: "smoke_free", titulo: "Libre de humo", texto: "Espacio cuidado libre de humo" },
    { icono: "pets", titulo: "Mascotas", texto: "¡Somos Pet Friendly! Bajo petición previa.", es_pet_friendly: true }
  ],

  // ──────────────────────────────────────────────────────────
  // 9. SECCIÓN QUÉ HACER (ACTIVIDADES)
  // ──────────────────────────────────────────────────────────
  que_hacer: {
    titulo_seccion: "¿Qué podés hacer?",
    subtitulo: "La naturaleza de Catamarca te espera con aventuras para todos los gustos.",
    actividades: [
      {
        foto: "fotos/senderismo.webp",
        titulo: "Senderismo",
        descripcion: "Recorré senderos de montaña y descubrí paisajes únicos."
      },
      {
        foto: "fotos/cabalgata.webp",
        titulo: "Cabalgatas",
        descripcion: "Explorá las sierras a caballo y conectá con la tradición gaucha catamarqueña."
      },
      {
        foto: "fotos/yoga_al_amanecer.webp",
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
      "fotos/galeria-01.webp",
      "fotos/Videos/galeria-01.mp4",
      "fotos/galeria-02.webp",
      "fotos/galeria-03.webp",
      "fotos/galeria-04.webp",
      "fotos/galeria-05.webp",
      "fotos/galeria-06.webp",
      "fotos/galeria-07.webp",
      "fotos/galeria-08.webp",
      "fotos/galeria-09.webp",
      "fotos/galeria-10.webp",
      "fotos/galeria-11.webp",
      "fotos/galeria-12.webp",
      "fotos/galeria-13.webp",
      "fotos/galeria-14.webp",
      "fotos/galeria-15.webp",
      "fotos/galeria-16.webp",
      "fotos/galeria-17.webp",
      "fotos/galeria-18.webp",
      "fotos/galeria-19.webp",
      "fotos/galeria-20.webp",
      "fotos/galeria-21.webp",
      "fotos/galeria-22.webp",
      "fotos/galeria-23.webp",
      "fotos/galeria-24.webp",
      "fotos/galeria-25.webp",
      "fotos/galeria-26.webp",
      "fotos/galeria-27.webp",
      "fotos/galeria-28.webp",
      "fotos/galeria-29.webp",
      "fotos/galeria-31.webp"
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
      hero_foto: "fotos/benteveo/benteveo-hero.jpg",
      titulo_principal: "Benteveo",
      info_tecnica: "Hasta 2 huéspedes · 45 m² · Cama Doble plaza",
      descripcion_larga: "Sumérgete en la experiencia definitiva de la montaña. El Apart Benteveo combina discreción con la autenticidad natural. Desde su amplio balcón, su inigualable terraza, las vistas a las cumbres de Catamarca te acompañarán en cada momento. Un refugio íntimo y exclusivo, diseñado para parejas que buscan reconectarse con lo esencial.",
      servicios_iconos: [
        { nombre: "Vistas Panorámicas", icono: "landscape" },
        { nombre: "Climatización", icono: "thermostat" },
        { nombre: "Wi-Fi", icono: "wifi" },
        { nombre: "Cocina Equipada", icono: "countertops" },
        { nombre: "Desayuno Regional", icono: "coffee" }
      ],
      galeria_fotos: [
        "fotos/benteveo/benteveo1.webp",
        "fotos/benteveo/benteveo2.webp",
        "fotos/benteveo/benteveo3.webp",
        "fotos/benteveo/benteveo4.webp",
        "fotos/benteveo/benteveo5.webp",
        "fotos/benteveo/benteveo6.webp",
        "fotos/benteveo/benteveo7.webp",
        "fotos/benteveo/benteveo8.webp",
        "fotos/benteveo/benteveo9.webp",
        "fotos/benteveo/benteveo10.webp",
        "fotos/benteveo/benteveo11.webp",
        "fotos/benteveo/benteveo12.webp",
        "fotos/benteveo/benteveo13.webp",
        "fotos/benteveo/benteveo14.webp"
      ]
    },
    {
      id: "apart-2",
      hero_foto: "fotos/colibri/colibri-hero.webp",
      titulo_principal: "Colibrí",
      info_tecnica: "Hasta 5 huéspedes · 70 m² - Cama Matrimonial + 3 simples",
      descripcion_larga: "Diseñado para que toda la familia disfrute. El Apart Colibrí ofrece amplios espacios, una cocina completa y un deck exterior perfecto para compartir atardeceres únicos. La naturaleza a tu alrededor y el fantástico balcon a la montaña.",
      servicios_iconos: [
        { nombre: "Vistas Panorámicas", icono: "landscape" },
        { nombre: "2 aires Frio/Calor", icono: "thermostat" },
        { nombre: "Wi-Fi", icono: "wifi" },
        { nombre: "Lavarropas", icono: "local_laundry_service" },
        { nombre: "Cocina Completa", icono: "countertops" },
        { nombre: "Desayuno Regional", icono: "coffee" }
      ],
      galeria_fotos: [
        "fotos/colibri/colibri1.webp",
        "fotos/colibri/colibri2.webp",
        "fotos/colibri/colibri3.webp",
        "fotos/colibri/colibri4.webp",
        "fotos/colibri/colibri5.webp",
        "fotos/colibri/colibri6.webp",
        "fotos/colibri/colibri7.webp",
        "fotos/colibri/colibri8.webp",
        "fotos/colibri/colibri9.webp"
      ]
    },
    {
      id: "apart-3",
      hero_foto: "fotos/carpintero/carpintero-hero.webp",
      titulo_principal: "Carpintero",
      info_tecnica: "Hasta 3 huéspedes · 60 m² · 3 camas simples",
      descripcion_larga: "La experiencia más auténtica de Monte Zion. Rodeada de una vista exuberante y el sonido del viento y los pajaros. Aca te puedes conectar con Tigo mismo facilmente",
      servicios_iconos: [
        { nombre: "Vistas Panorámicas", icono: "landscape" },
        { nombre: "Aire frio/calor", icono: "thermostat" },
        { nombre: "Wi-Fi", icono: "wifi" },
        { nombre: "Cocina completa", icono: "countertops" },
        { nombre: "Desayuno Regional", icono: "coffee" }
      ],
      galeria_fotos: [
        "fotos/carpintero/carpintero1.webp",
        "fotos/carpintero/carpintero2.webp",
        "fotos/carpintero/carpintero3.webp",
        "fotos/carpintero/carpintero4.webp",
        "fotos/carpintero/carpintero5.webp",
        "fotos/carpintero/carpintero6.webp",
        "fotos/carpintero/carpintero7.webp",
        "fotos/carpintero/carpintero8.webp",
        "fotos/carpintero/carpintero9.webp",
        "fotos/carpintero/carpintero10.webp",
        "fotos/carpintero/carpintero11.webp",
        "fotos/carpintero/carpintero12.webp",
        "fotos/carpintero/carpintero13.webp",
        "fotos/carpintero/carpintero14.webp",
        "fotos/carpintero/carpintero15.webp",
        "fotos/carpintero/carpintero16.webp"
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
      whatsapp_destino: "5493834949319",
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
    tema_activo: "SIERRA_DORADA",
    paletas: {
      SIERRA_DORADA: {
        "--color-fondo-general": "#FFF9F0",
        "--color-fondo-secundario": "#F7E8D3",
        "--color-fondo-tarjeta": "#FFFFFF",
        "--color-header-bg": "linear-gradient(135deg, #c49a6c 0%, #faebd7 100%)",
        "--color-texto-principal": "#3b231d",
        "--color-texto-secundario": "#a87b32",
        "--color-acento": "#9c322b",
        "--color-acento-hover": "#80241e",
        "--color-boton-reserva-fondo": "#9c322b",
        "--color-boton-reserva-texto": "#FFFFFF",
        "--color-boton-reserva-glow": "rgba(156, 50, 43, 0.4)",
        "--color-borde": "rgba(156, 50, 43, 0.25)",
        "--color-separador-linea": "#9c322b",
        "--color-overlay-hero": "rgba(0, 0, 0, 0.4)",
        "--fuente-titulos": "'Lora', Georgia, serif",
        "--fuente-cuerpo": "'Montserrat', Arial, sans-serif"
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
