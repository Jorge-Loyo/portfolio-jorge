// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(cors());

// --- CONFIGURACIÓN DE IA ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Usamos el modelo que funcionó en tu cuenta
const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

// --- DATOS DEL CV (El "Cerebro" de la IA) ---
const cvData = {
  profile: {
    name: "Jorge Antonio Loyo Nayati",
    role: "Desarrollador de Software & Web | Analista Funcional - Analista de Datos Senior",
    age: 31,
    birthDate: "07 de octubre de 1994",
    origin: "El Tigre, Anzoátegui, Venezuela",
    location: "San Telmo, CABA, Buenos Aires, Argentina",
    email: "Jorgenayati@gmail.com",
    phone: "+54 9 11 6557 6344",
    workStatus: "Documentación legal al día para trabajar en Argentina",
    summary: "Desarrollador Full Stack y Analista de Datos con experiencia en el diseño, desarrollo y despliegue de aplicaciones web, integración de APIs y manejo de bases de datos. He trabajado con SQL, Power BI, Excel y Python para el análisis de información y seguimiento de KPIs, y con tecnologías como React, Angular y Node.js para construir soluciones completas. Mi background técnico me permite conectar datos, negocio y desarrollo de software, aportando una visión integral y orientada a resultados."
  },
  
  availability: {
    status: "Disponible para incorporación inmediata",
    modality: "Remoto preferido, pero abierto a híbrido o presencial",
    schedule: "Full-time, Part-time o Freelance"
  },
  
  rates: {
    salary: "Desde $1.800.000 ARS mensuales",
    freelance: "$8 USD por hora",
    currency: "Cotizo en USD, cobro en ARS"
  },
  
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Básico A2 (en proceso de mejora)" }
  ],
  
  certifications: [
    "AWS Cloud",
    "Python",
    "SQL",
    "Todos los cursos del CV tienen certificación e insignias"
  ],
  
  industries: [
    "Compras",
    "Ventas",
    "Logística",
    "Operaciones",
    "Sistemas",
    "Finanzas"
  ],
  
  specializations: [
    "Sistemas",
    "Desarrollo de Proyectos",
    "Análisis de Datos"
  ],
  
  interests: {
    projects: [
      "Desarrollo de mejoras operacionales",
      "Mejoras o creación de herramientas digitales",
      "Creación de métricas",
      "Sistemas de gestión empresarial"
    ],
    specialization: "Backend y Análisis de Datos"
  },
  
  portfolio: {
    live: "Varios proyectos con demo online y aplicaciones de escritorio portables",
    url: "https://github.com/Jorge-Loyo"
  },
  
  education: {
    degree: "Tecnicatura Superior en Desarrollo de Software",
    institution: "IFTS 11 (Instituto de Formación Técnica Superior)",
    status: "En curso",
    period: "2023 - Presente",
    location: "Buenos Aires, Argentina"
  },
  
  skills: {
    languages: ["JavaScript", "Python", "C#", "SQL"],
    frontend: ["React", "Angular", "HTML5", "CSS3", "Sass"],
    backend: ["Node.js", "Express", "FastAPI"],
    databases: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
    cloud: ["AWS Cloud", "Google Cloud"],
    erp: ["Odoo ERP (Experto)"],
    tools: ["Git", "Jira", "Trello", "Power BI", "Postman"],
    levels: {
      "JavaScript/Node.js": "Avanzado",
      "React/Angular": "Intermedio",
      "Python/FastAPI": "Intermedio",
      "SQL/PostgreSQL/MySQL": "Avanzado",
      "Odoo ERP": "Experto",
      "C#": "Básico"
    }
  },
  
  softSkills: [
    "Liderazgo y Trabajo en Equipo",
    "Pensamiento Crítico y Resolución de Problemas",
    "Adaptabilidad y Flexibilidad",
    "Comunicación Efectiva",
    "Organización y Puntualidad",
    "Orientación al Cliente/Usuario"
  ],
  
  experience: [
    {
      role: "Responsable de Sistemas / Analista",
      company: "CMI S.A",
      period: "Mayo 2023 - Julio 2025",
      achievements: [
        "Liderazgo técnico en migración y configuración de Odoo ERP",
        "Soporte a más de 500 usuarios",
        "Administración de bases de datos PostgreSQL",
        "Optimización de flujos de trabajo con Python",
        "Gestión de infraestructura IT"
      ]
    },
    {
      role: "Responsable de Compras",
      company: "Vooraf Worden",
      period: "Agosto 2025 - Octubre 2025",
      achievements: [
        "Gestión estratégica de proveedores",
        "Optimización de costos",
        "Análisis de datos para toma de decisiones"
      ]
    }
  ],
  
  projects: [
    {
      name: "Licitarte",
      desc: "Sistema profesional de gestión de licitaciones farmacéuticas. Incluye análisis de márgenes en tiempo real con alertas visuales, módulo de métricas con ranking de causas de pérdidas, dashboard con 6 indicadores clave y catálogos configurables. Arquitectura escalable con SQLite local y PostgreSQL en producción.",
      tech: ["Python", "Flask", "SQLite", "PostgreSQL", "JavaScript", "HTML5", "CSS3"],
      link: "https://github.com/Jorge-Loyo/Licitarte"
    },
    {
      name: "Agendarte",
      desc: "Sistema integral de gestión de reservas. Desafío principal: diseñar arquitectura de base de datos SQL para manejar concurrencia de citas y evitar solapamientos en tiempo real, asegurando integridad de datos.",
      tech: ["React", "Node.js", "SQL", "Auth"],
      link: "https://github.com/Jorge-Loyo/Agendarte"
    },
    {
      name: "Portfolio con IA",
      desc: "Implementación Full Stack con arquitectura CI/CD. Integración de API Gemini 2.0 manejando contexto de conversación y cuotas de uso mediante backend seguro en Node.js.",
      tech: ["React", "Gemini AI", "Node.js", "CI/CD"],
      link: "https://github.com/Jorge-Loyo/portfolio-jorge"
    },
    {
      name: "Infodets",
      desc: "Sistema de Gestión de Conocimiento Dinámico para entidades públicas. Utiliza IA para responder consultas ciudadanas con fuentes oficiales, asegurando soberanía de datos. Motor de mejora continua que detecta vacíos de información.",
      tech: ["TypeScript", "React", "Node.js", "IA", "PostgreSQL"],
      link: "https://github.com/Jorge-Loyo/infodets"
    },
    {
      name: "English Memory",
      desc: "Juego de lógica con JavaScript Vanilla. Implementación de algoritmos de manipulación del DOM y gestión de estado local para controlar mecánica del juego, tiempos y sistema de puntuación.",
      tech: ["JavaScript", "DOM", "CSS3"],
      link: "https://github.com/Jorge-Loyo/English_Memory"
    },
    {
      name: "Creador de Audios IA",
      desc: "Aplicación para creación de audios con inteligencia artificial usando Gemini AI. Genera contenido narrado automatizado con texto a voz, ideal para presentaciones y contenido multimedia.",
      tech: ["Node.js", "Gemini AI", "API REST", "Audio"],
      link: "https://github.com/Jorge-Loyo/Creador_Audios"
    },
    {
      name: "Recetario",
      desc: "Aplicación web de recetas de cocina con TypeScript y React. Sistema de búsqueda y filtrado por ingredientes, categorías y tiempo de preparación. Interfaz responsive con enfoque en UX.",
      tech: ["TypeScript", "React", "CSS3", "Responsive"],
      link: "https://github.com/Jorge-Loyo/Recetario"
    },
    {
      name: "Tienda Repostería",
      desc: "E-commerce front-end enfocado en UX/UI. Uso avanzado de CSS Grid y Flexbox para experiencia totalmente responsive y accesible.",
      tech: ["HTML5", "CSS3", "Responsive"],
      link: "https://github.com/Jorge-Loyo/tienda-reposteria"
    },
    {
      name: "Umbrella Project",
      desc: "Maquetación corporativa. Estructura semántica HTML5 y buenas prácticas de SEO on-page, optimizando carga y posicionamiento.",
      tech: ["HTML5", "Sass", "BEM", "Git"],
      link: "https://github.com/Jorge-Loyo/umbrella_project"
    }
  ]
};

// --- RUTA DEL CHAT ---
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Construimos la instrucción para la IA
    const prompt = `
      Actúa como Jorge Antonio Loyo Nayati (o su asistente virtual). Responde en primera persona de forma profesional, amable y conversacional.
      
      === PERFIL PERSONAL ===
      - Nombre completo: ${cvData.profile.name}
      - Edad: ${cvData.profile.age} años (nacido el ${cvData.profile.birthDate})
      - Origen: ${cvData.profile.origin}
      - Ubicación actual: ${cvData.profile.location}
      - Email: ${cvData.profile.email}
      - Teléfono: ${cvData.profile.phone}
      - GitHub: ${cvData.portfolio.url}
      - Estado legal: ${cvData.profile.workStatus}
      
      === DISPONIBILIDAD ===
      - Estado: ${cvData.availability.status}
      - Modalidad: ${cvData.availability.modality}
      - Horario: ${cvData.availability.schedule}
      
      === TARIFAS Y EXPECTATIVAS ===
      - Salario esperado: ${cvData.rates.salary}
      - Tarifa freelance: ${cvData.rates.freelance}
      - Moneda: ${cvData.rates.currency}
      
      === IDIOMAS ===
      ${cvData.languages.map(lang => `- ${lang.name}: ${lang.level}`).join("\n      ")}
      
      === CERTIFICACIONES ===
      ${cvData.certifications.map(cert => `- ${cert}`).join("\n      ")}
      
      === SECTORES DE EXPERIENCIA ===
      ${cvData.industries.join(", ")}
      
      === ESPECIALIZACIONES ===
      ${cvData.specializations.join(", ")}
      
      === INTERESES PROFESIONALES ===
      Proyectos de interés:
      ${cvData.interests.projects.map(p => `- ${p}`).join("\n      ")}
      Especialización objetivo: ${cvData.interests.specialization}
      
      === PORTAFOLIO ===
      ${cvData.portfolio.live}
      GitHub: ${cvData.portfolio.url}
      
      === FORMACIÓN ACADÉMICA ===
      - Carrera: ${cvData.education.degree}
      - Institución: ${cvData.education.institution}
      - Estado: ${cvData.education.status} (${cvData.education.period})
      - Ubicación: ${cvData.education.location}
      
      === HABILIDADES TÉCNICAS ===
      Lenguajes: ${cvData.skills.languages.join(", ")}
      Frontend: ${cvData.skills.frontend.join(", ")}
      Backend: ${cvData.skills.backend.join(", ")}
      Bases de Datos: ${cvData.skills.databases.join(", ")}
      Cloud: ${cvData.skills.cloud.join(", ")}
      ERP: ${cvData.skills.erp.join(", ")}
      Herramientas: ${cvData.skills.tools.join(", ")}
      
      Niveles de dominio:
      ${Object.entries(cvData.skills.levels).map(([tech, level]) => `- ${tech}: ${level}`).join("\n      ")}
      
      === HABILIDADES BLANDAS ===
      ${cvData.softSkills.map(skill => `- ${skill}`).join("\n      ")}
      
      === EXPERIENCIA LABORAL ===
      ${cvData.experience.map(exp => `
      ${exp.role} en ${exp.company} (${exp.period}):
      ${exp.achievements.map(ach => `  • ${ach}`).join("\n      ")}
      `).join("\n")}
      
      === PROYECTOS DESTACADOS ===
      ${cvData.projects.map(proj => `
      ${proj.name}:
      - Descripción: ${proj.desc}
      - Tecnologías: ${proj.tech.join(", ")}
      - Link: ${proj.link}
      `).join("\n")}

      === INSTRUCCIONES DE RESPUESTA ===
      1. Responde como si fueras Jorge, en primera persona
      2. NO repitas tu nombre completo en cada respuesta, solo preséntate si te preguntan quién eres o es el primer mensaje
      3. NO uses saludos como "¡Hola!", "¡Buenos días!", "Es un gusto conversar contigo" o "Soy Jorge Loyo" en cada respuesta, solo saluda al inicio de la conversación
      4. Ve directo al punto, comienza respondiendo la pregunta inmediatamente sin presentaciones
      5. Sé específico con datos técnicos cuando pregunten por experiencia o proyectos
      6. Si preguntan por disponibilidad, tarifas o modalidad, usa los datos exactos
      7. Si preguntan por habilidades, menciona el nivel de dominio
      8. Si preguntan por experiencia laboral, menciona logros concretos y sectores
      9. Si preguntan por certificaciones, menciona AWS, Python y SQL
      10. Enfatiza interés en Backend y Análisis de Datos si preguntan por especialización
      11. Mantén respuestas concisas pero informativas (máximo 3-4 párrafos)
      12. Si no tienes información sobre algo, sé honesto y sugiere contacto directo
      13. Para empleadores: destaca disponibilidad inmediata y flexibilidad de modalidad

      PREGUNTA DEL USUARIO: "${message}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error procesando la respuesta", details: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor IA corriendo en puerto ${PORT}`);
  console.log(`🧠 Contexto cargado: ${cvData.projects.length} proyectos, ${cvData.experience.length} experiencias laborales`);
});