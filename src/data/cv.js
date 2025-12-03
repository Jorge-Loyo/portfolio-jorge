// src/data/cv.js

export const cvData = {
  profile: {
    name: "Jorge Loyo",
    role: "Desarrollador de Software | Especialista en Sistemas",
    location: "San Telmo, CABA, Argentina",
    email: "Jorgenayati@gmail.com",
    github: "https://github.com/Jorge-Loyo",
    avatar: "/perfil.jpg",
    summary:
      "Profesional en transición al desarrollo de software con sólida experiencia en gestión y ERP (Odoo). Combino lógica de negocio con habilidades técnicas en JS, React y Python para crear soluciones reales.",
  },
  skills: [
    { name: "JavaScript", level: "Intermedio" },
    { name: "React", level: "Aprendiendo" },
    { name: "Node.js", level: "Básico" },
    { name: "Python", level: "Básico" },
    { name: "SQL", level: "Intermedio" },
    { name: "Odoo ERP", level: "Avanzado" },
    { name: "AWS Cloud", level: "Fundamentos" },
    { name: "Git / GitHub", level: "Intermedio" },
  ],
  experience: [
    {
      id: 1,
      role: "Responsable de Sistemas / Analista",
      company: "CMI S.A",
      period: "05/2023 - 07/2025",
      description:
        "Lideré la implementación del ERP Odoo, soporte técnico a +500 usuarios y administración de servidores. Desarrollo de herramientas digitales para automatizar carga documental.",
    },
    {
      id: 2,
      role: "Responsable de Compras",
      company: "Vooraf Worden",
      period: "08/2025 - 10/2025",
      description:
        "Optimización de costos y procesos de abastecimiento. Gestión de normas ISO 9001.",
    },
  ],
  projects: [
    {
      id: 1, // Lo ponemos primero porque "Agendarte" suena a App completa (Full Stack)
      name: "Agendarte",
      desc: "Plataforma integral de gestión de turnos y reservas. Solución diseñada para optimizar la organización de agendas, permitiendo a los usuarios reservar citas en tiempo real y a los administradores gestionar disponibilidad.",
      tech: ["Angular", "Node.js", "SQL", "UX/UI"], // Ajusta si usaste Python/Mongo
      link: "https://github.com/Jorge-Loyo/Agendarte",
    },
    {
      id: 1,
      name: "Portfolio Inteligente con IA",
      desc: "Web personal interactiva desarrollada con React 19 y Node.js. Integra el modelo Gemini 2.0 Flash de Google para responder preguntas sobre mi perfil en tiempo real, con animaciones en Framer Motion.",
      tech: ["React", "Node.js", "Gemini API", "Framer Motion"],
      link: "https://github.com/Jorge-Loyo/portfolio-jorge",
    },
    {
      id: 2,
      name: "English Memory Game",
      desc: "Juego interactivo de memoria diseñado para facilitar el aprendizaje de vocabulario en inglés. Implementa lógica de juego en JavaScript (DOM manipulation) y gestión de estados visuales.",
      tech: ["JavaScript", "HTML5", "CSS3", "Game Logic"],
      link: "https://github.com/Jorge-Loyo/English_Memory",
    },
    {
      id: 3,
      name: "Tienda Repostería",
      desc: "Landing page responsive para un comercio gastronómico. Enfocada en diseño UI/UX atractivo, estructura semántica y maquetación adaptable a dispositivos móviles.",
      tech: ["HTML5", "CSS3", "Next.js", "Flexbox"],
      link: "https://github.com/Jorge-Loyo/tienda-reposteria",
    },
    {
      id: 4,
      name: "Umbrella Project",
      desc: "Proyecto de maquetación web avanzada. Demostración de habilidades en estructuración de contenido y estilización moderna para sitios web corporativos o temáticos.",
      tech: ["HTML5", "CSS3", "Web Layout", "Git"],
      link: "https://github.com/Jorge-Loyo/umbrella_project",
    },
    {
      id: 5,
      name: "Implementación Odoo ERP",
      desc: "Experiencia profesional en configuración de Odoo para CMI S.A. Automatización de flujos de compras e inventario para optimizar la gestión empresarial.",
      tech: ["Odoo", "Python", "PostgreSQL", "ERP"],
      link: "https://github.com/Jorge-Loyo", // Link a tu perfil general ya que es privado
    },
  ],
};
