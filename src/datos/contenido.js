// ==========================================
// ARCHIVO DE CONTENIDO (TARJETAS Y PRECIOS)
// ==========================================
// Toda la información de las tarjetas de servicios, precios y textos de la cinta.
// Hacerlo en arrays de objetos permite que React genere el HTML automáticamente.

export const datosServicios = [
  {
    id: "01",
    category: "SOLUCIONES",
    title: "Ingeniería a Medida",
    description: "Si puedes imaginarlo, podemos programarlo. Desarrollamos funciones especializadas adaptadas al 100% a las necesidades de tu negocio."
  },
  {
    id: "02",
    category: "SEGURIDAD",
    title: "Sistemas de Usuarios",
    description: "Gestión de login, paneles de control privados y áreas exclusivas con seguridad de grado bancario para tu información."
  },
  {
    id: "03",
    category: "CONFIANZA",
    title: "Reputación Real",
    description: "Sincronización directa con Google Maps para mostrar tus reseñas reales y ubicación de forma interactiva."
  },
  {
    id: "04",
    category: "VELOCIDAD",
    title: "Rendimiento Extremo",
    description: "Páginas que cargan en milisegundos. Optimizamos cada línea para obtener puntuaciones perfectas en Google Lighthouse."
  },
  {
    id: "05",
    category: "CONTROL",
    title: "Inteligencia de Datos",
    description: "Integramos paneles de métricas personalizados para que tomes decisiones basadas en datos reales de tus usuarios."
  }
];

export const datosPrecios = [
  {
    id: "basico",
    type: "BÁSICO",
    title: "PRESENCIA DIGITAL",
    price: "Desde 99€",
    description: "Landing page de alto impacto para captar clientes.",
    features: [
      "Diseño UI/UX único (Cero Plantillas)",
      "Maquetación Responsive",
      "Optimizada para velocidad",
      "Formulario de contacto directo"
    ],
    whatsappLinkKey: "whatsappBasico", // Conecta con enlaces.js
    isRecommended: false
  },
  {
    id: "recomendado",
    type: "RECOMENDADO",
    title: "INGENIERÍA WEB",
    price: "Desde 299€",
    description: "Arquitectura web avanzada con interactividad premium.",
    features: [
      "Todo lo del plan Básico",
      "Animaciones GSAP a medida",
      "Integración con API de Google Maps",
      "Panel autogestionable básico",
      "SEO Técnico"
    ],
    whatsappLinkKey: "whatsappRecomendado",
    isRecommended: true
  },
  {
    id: "premium",
    type: "PREMIUM",
    title: "SISTEMA FULL-STACK",
    price: "A medida",
    description: "Desarrollo integral con lógica de servidor y bases de datos.",
    features: [
      "Backend con Node.js",
      "Sistema de login/usuarios seguro",
      "Panel de inteligencia de datos/métricas",
      "Integraciones a medida"
    ],
    whatsappLinkKey: "whatsappPremium",
    isRecommended: false
  }
];

export const textosCinta = [
  "HTML5", "CSS3 AVANZADO", "JAVASCRIPT ES6", "BOOTSTRAP", 
  "GSAP ANIMATIONS", "REACT BITS", "NODE.JS", "UI/UX DESIGN"
];
