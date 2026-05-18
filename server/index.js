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
    linkedin: "https://www.linkedin.com/in/jorge-antonio-loyo-nayati/",
    github: "https://github.com/Jorge-Loyo",
    summary: "Desarrollador Full Stack y Analista de Datos con más de 7 años de experiencia en el diseño, desarrollo e implementación de aplicaciones web de extremo a extremo. Especializado en construir sistemas desde cero —APIs, autenticación, lógica de negocio y arquitectura de bases de datos— combinando frontend, backend y soluciones orientadas a datos. Ha participado en sistemas productivos utilizados por más de 800 usuarios en entornos críticos del sector salud."
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
    { name: "Inglés", level: "Intermedio A2/B1 (en proceso de mejora)" }
  ],

  certifications: [
    "SQL Intermedio y Avanzado - Hola Mundo Academy",
    "Python Básico e Intermedio - Talento Tech",
    "Excel Avanzado - Smart Academy",
    "Power BI Intermedio - Smart Academy",
    "AWS Cloud Fundamentals - AWS Academy",
    "Docker",
    "APIs REST",
    "Tango Soft Trainer"
  ],

  education: [
    { degree: "Técnico Superior en Desarrollo de Software", institution: "IFTS 11 (Instituto de Formación Técnica Superior)", status: "Último cuatrimestre", period: "2024 - Actualidad" },
    { degree: "SQL Intermedio y Avanzado", institution: "Hola Mundo Academy", period: "Mar 2022 - Dic 2022" },
    { degree: "Python Básico e Intermedio", institution: "Talento Tech", period: "Jun 2024 - Dic 2024" },
    { degree: "Power BI Intermedio", institution: "Smart Academy", period: "Ago 2024 - Oct 2024" },
    { degree: "AWS Cloud Fundamentals", institution: "AWS Academy", period: "Ago 2025 - Dic 2025" },
  ],

  industries: [
    "Salud", "Farmacéutico", "Compras", "Ventas", "Logística", "Operaciones", "Sistemas", "Finanzas"
  ],

  specializations: [
    "Desarrollo Full Stack", "Análisis de Datos", "Business Intelligence", "Análisis Funcional", "Arquitectura de Sistemas"
  ],

  interests: {
    projects: [
      "Desarrollo de mejoras operacionales",
      "Creación de herramientas digitales desde cero",
      "Automatización de procesos con IA",
      "Sistemas de gestión empresarial e integraciones"
    ],
    specialization: "Backend, Análisis de Datos e IA"
  },

  portfolio: {
    live: "https://jorge-loyo-portfolio.vercel.app/",
    url: "https://github.com/Jorge-Loyo"
  },

  skills: {
    frontend: ["React", "Next.js", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind"],
    backend: ["Node.js", "Express", "Python", "Flask", "FastAPI", "APIs REST", "JWT", "C#"],
    databases: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Firebase"],
    cloud_devops: ["AWS", "Docker", "CI/CD", "Render", "Vercel", "Google Cloud"],
    bi_data: ["Power BI", "DAX Avanzado", "Power Query", "Tableau", "Python (Pandas, Polars)", "ETL", "Pentaho"],
    erp: ["Odoo ERP (Experto)", "Tango Soft", "Carena", "SAP"],
    tools: ["Git", "GitHub", "Postman", "Jira", "Trello", "Notion", "N8N"],
    levels: {
      "JavaScript/TypeScript/Node.js": "Avanzado",
      "React/Next.js/Angular": "Intermedio-Avanzado",
      "Python/Flask/FastAPI": "Intermedio",
      "SQL/PostgreSQL/MySQL": "Avanzado",
      "Power BI/DAX": "Avanzado",
      "Odoo ERP": "Experto",
      "AWS/Docker": "Intermedio",
      "C#": "Básico"
    }
  },

  softSkills: [
    "Liderazgo Técnico y Mentoría (equipos de hasta 24 personas)",
    "Pensamiento Analítico y Resolución de Problemas Complejos",
    "Comunicación Efectiva con Stakeholders",
    "Gestión del Tiempo y Priorización",
    "Adaptabilidad a Entornos Dinámicos",
    "Orientación al Negocio y Resultados",
    "Gestión de Requerimientos y Procesos",
    "Capacitación y Adopción de Sistemas"
  ],

  experience: [
    {
      role: "Full Stack Developer / Analista de Sistemas",
      company: "CMI S.A",
      period: "Julio 2018 - Julio 2025",
      description: "Participación en el desarrollo, integración y mantenimiento de sistemas empresariales del sector salud. Sistema de alta disponibilidad usado por más de 800 usuarios en hospitales.",
      achievements: [
        "Diseño y desarrollo de aplicaciones web completas integrando frontend, backend y bases de datos",
        "Desarrollo de APIs desde cero con autenticación JWT, roles y lógica de negocio",
        "Diseño y optimización de bases de datos relacionales mejorando rendimiento",
        "Implementación de integraciones entre sistemas internos y plataformas externas de salud",
        "Implementación técnica de nuevas sucursales: configuración, integraciones y puesta en producción",
        "Desarrollo de dashboards corporativos en Power BI para monitoreo de ventas, compras e inventarios",
        "Liderazgo técnico en migración y configuración de Odoo ERP",
        "Soporte a más de 500 usuarios y gestión de infraestructura IT"
      ]
    },
    {
      role: "Analista de Datos / Responsable de Compras",
      company: "Vooraf Worden",
      period: "Agosto 2025 - Enero 2026",
      description: "Gestión estratégica de proveedores y optimización de costos. Desarrollo de soluciones analíticas en Power BI.",
      achievements: [
        "Desarrollo de dashboards analíticos para rotación de inventario, costos y desempeño de proveedores",
        "Automatización de reportes financieros y operativos con Power Query y SQL",
        "Implementación de KPIs estructurados mejorando precisión de reportes",
        "Integración de múltiples fuentes de datos en dashboards unificados de BI"
      ]
    }
  ],

  projects: [
    {
      name: "Licitarte",
      desc: "Sistema profesional de gestión de licitaciones farmacéuticas. Incluye análisis de márgenes en tiempo real con alertas visuales, dashboard con 6 indicadores clave y catálogos configurables. Arquitectura escalable con SQLite y PostgreSQL.",
      tech: ["Python", "Flask", "SQLite", "PostgreSQL", "JavaScript"],
      link: "https://github.com/Jorge-Loyo/Licitarte"
    },
    {
      name: "Plataforma de Inteligencia de Mercado",
      desc: "Plataforma analítica para tendencias de precios del mercado farmacéutico. Procesamiento de más de 58M de registros. Modelos SQL optimizados y dashboards Power BI con DAX avanzado.",
      tech: ["Power BI", "SQL", "Python", "DAX", "ETL"],
      link: "https://github.com/Jorge-Loyo"
    },
    {
      name: "Infodets",
      desc: "Sistema de Gestión de Conocimiento Dinámico para entidades públicas. Utiliza IA para responder consultas ciudadanas con fuentes oficiales, asegurando soberanía de datos.",
      tech: ["TypeScript", "React", "Node.js", "IA", "PostgreSQL"],
      link: "https://github.com/Jorge-Loyo/infodets"
    },
    {
      name: "Agendarte",
      desc: "Sistema integral de gestión de reservas con arquitectura SQL para concurrencia de citas en tiempo real, evitando solapamientos.",
      tech: ["React", "Node.js", "SQL", "Auth"],
      link: "https://github.com/Jorge-Loyo/Agendarte"
    },
    {
      name: "Portfolio con IA",
      desc: "Portfolio profesional con chat interactivo impulsado por Gemini AI. Arquitectura Full Stack con CI/CD. Asistente virtual que responde sobre experiencia y disponibilidad.",
      tech: ["React", "Gemini AI", "Node.js", "CI/CD"],
      link: "https://github.com/Jorge-Loyo/portfolio-jorge"
    },
    {
      name: "Sistema de Integración y Facturación",
      desc: "Automatización de intercambio de información con hospitales. Eliminación de procesos manuales con Excel mediante integración estructurada y sincronización en tiempo real.",
      tech: ["SQL", "Python", "ETL", "Bases de Datos"],
      link: "https://github.com/Jorge-Loyo"
    },
    {
      name: "English Memory",
      desc: "Juego de lógica en JavaScript Vanilla con manipulación del DOM, gestión de estado, control de tiempos y puntuación.",
      tech: ["JavaScript", "DOM", "CSS3"],
      link: "https://github.com/Jorge-Loyo/English_Memory"
    },
    {
      name: "Creador de Audios IA",
      desc: "Generación de audios con inteligencia artificial usando Gemini AI. Texto a voz automatizado para presentaciones y contenido multimedia.",
      tech: ["Node.js", "Gemini AI", "API REST"],
      link: "https://github.com/Jorge-Loyo/Creador_Audios"
    },
    {
      name: "Recetario",
      desc: "App de recetas con TypeScript y React. Búsqueda y filtrado por ingredientes, categorías y tiempo de preparación. Interfaz responsive.",
      tech: ["TypeScript", "React", "CSS3"],
      link: "https://github.com/Jorge-Loyo/Recetario"
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
      - GitHub: ${cvData.profile.github}
      - LinkedIn: ${cvData.profile.linkedin}
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
      ${cvData.education.map(edu => `- ${edu.degree} - ${edu.institution} (${edu.period})`).join("\n      ")}
      
      === HABILIDADES TÉCNICAS ===
      Frontend: ${cvData.skills.frontend.join(", ")}
      Backend: ${cvData.skills.backend.join(", ")}
      Bases de Datos: ${cvData.skills.databases.join(", ")}
      Cloud & DevOps: ${cvData.skills.cloud_devops.join(", ")}
      BI & Data: ${cvData.skills.bi_data.join(", ")}
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