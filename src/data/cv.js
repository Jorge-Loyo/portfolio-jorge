// src/data/cv.js

export const cvData = {
  profile: {
    name: "Jorge Loyo",
    role: "Desarrollador de Software & Web | Analista Funcional - Analista de Datos Senior",
    location: "San Telmo, CABA, Argentina",
    email: "Jorgenayati@gmail.com",
    phone: "+54 9 11 6557 6344",
    github: "https://github.com/Jorge-Loyo",
    avatar: "/perfil.jpg",
    birthDate: "1994-10-07",
    age: 31,
    origin: "El Tigre, Anzoátegui, Venezuela",
    workStatus: "Documentación legal al día para trabajar en Argentina",

    summary:
      "Desarrollador Full Stack y Analista de Datos con experiencia en el diseño, desarrollo y despliegue de aplicaciones web, integración de APIs y manejo de bases de datos. He trabajado con SQL, Power BI, Excel y Python para el análisis de información y seguimiento de KPIs, y con tecnologías como React, Angular y Node.js para construir soluciones completas. Mi background técnico me permite conectar datos, negocio y desarrollo de software, aportando una visión integral y orientada a resultados.",
  },

  socials: [
    {
      id: 1,
      name: "Email",
      value: "Jorgenayati@gmail.com",
      link: "mailto:Jorgenayati@gmail.com",
      icon: "Mail",
    },
    {
      id: 2,
      name: "WhatsApp",
      value: "+54 9 11 6557 6344",
      link: "https://wa.me/5491165576344",
      icon: "MessageCircle",
    },
    {
      id: 3,
      name: "GitHub",
      value: "Jorge-Loyo",
      link: "https://github.com/Jorge-Loyo",
      icon: "Github",
    },
    {
      id: 4,
      name: "LinkedIn",
      value: "Jorge Loyo",
      link: "https://www.linkedin.com/",
      icon: "Linkedin",
    },
  ],

  // SKILLS CLASIFICADAS (Para que la IA sepa qué eres)
  skills: [
    { name: "JavaScript / Node.js", level: "Avanzado" },
    { name: "React / Angular", level: "Intermedio" },
    { name: "Python / FastAPI", level: "Intermedio" },
    { name: "C#", level: "Básico" },
    { name: "SQL / MySQL / PostgreSQL", level: "Avanzado" },
    { name: "MongoDB / Firebase", level: "Intermedio" },
    { name: "AWS / Google Cloud", level: "Fundamentos" },
    { name: "Odoo ERP", level: "Experto" },
    { name: "Power BI", level: "Intermedio" },
    { name: "Herramientas", level: "Git, Jira, Trello, Postman" },
  ],

  // HABILIDADES BLANDAS (Soft Skills)
  softSkills: [
    "Liderazgo y Trabajo en Equipo",
    "Pensamiento Crítico y Resolución de Problemas",
    "Adaptabilidad y Flexibilidad",
    "Comunicación Efectiva",
    "Organización y Puntualidad",
    "Orientación al Cliente/Usuario",
  ],

  experience: [
    {
      id: 1,
      role: "Responsable de Sistemas / Analista",
      company: "CMI S.A",
      period: "05/2023 - 07/2025",
      description:
        "Liderazgo técnico en la migración y configuración de Odoo ERP. Soporte a +500 usuarios, administración de bases de datos PostgreSQL y optimización de flujos de trabajo con Python.",
    },
    {
      id: 2,
      role: "Responsable de Compras",
      company: "Vooraf Worden",
      period: "08/2025 - 10/2025",
      description:
        "Gestión estratégica de proveedores y optimización de costos. Uso intensivo de herramientas de análisis de datos para la toma de decisiones.",
    },
  ],

  projects: [
    {
      id: 1,
      name: "Agendarte",
      desc: "Sistema integral de gestión de reservas. Lo más desafiante fue diseñar la arquitectura de la base de datos (SQL) para manejar la concurrencia de citas y evitar solapamientos en tiempo real, asegurando la integridad de los datos.",
      tech: ["React", "Node.js", "SQL", "Auth"],
      link: "https://github.com/Jorge-Loyo/Agendarte",
    },
    {
      id: 2,
      name: "Portfolio con IA",
      desc: "Implementación Full Stack con arquitectura CI/CD (Vercel + Render). El reto principal fue integrar la API de Gemini 2.0 manejando el contexto de la conversación y las cuotas de uso mediante un backend seguro en Node.js.",
      tech: ["React", "Gemini AI", "Node.js", "CI/CD"],
      link: "https://github.com/Jorge-Loyo/portfolio-jorge",
    },
    {
      id: 3,
      name: "English Memory",
      desc: "Juego de lógica desarrollado con JavaScript Vanilla. Se implementaron algoritmos de manipulación del DOM y gestión de estado local para controlar la mecánica del juego, los tiempos y el sistema de puntuación.",
      tech: ["JavaScript", "DOM", "CSS3", "Logic"],
      link: "https://github.com/Jorge-Loyo/English_Memory",
    },
    {
      id: 4,
      name: "Tienda Repostería",
      desc: "E-commerce front-end enfocado en UX/UI. Uso avanzado de CSS Grid y Flexbox para garantizar una experiencia totalmente responsive y accesible en cualquier dispositivo móvil.",
      tech: ["HTML5", "CSS3", "Responsive", "UX/UI"],
      link: "https://github.com/Jorge-Loyo/tienda-reposteria",
    },
    {
      id: 5,
      name: "Umbrella Project",
      desc: "Maquetación corporativa de alto nivel. Demostración de estructura semántica HTML5 y buenas prácticas de SEO on-page, optimizando la carga y el posicionamiento.",
      tech: ["HTML5", "Sass", "BEM", "Git"],
      link: "https://github.com/Jorge-Loyo/umbrella_project",
    },
  ],
};
