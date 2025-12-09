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
// Aquí pegamos la información actualizada para que la IA la tenga a mano
const cvData = {
  profile: {
    name: "Jorge Loyo",
    role: "Desarrollador Full Stack",
    age: 31, // <--- ¡AQUÍ ESTÁ EL DATO IMPORTANTE!
    birthDate: "07 de octubre de 1994",
    origin: "El Tigre, Anzoátegui, Venezuela",
    location: "Buenos Aires, Argentina",
    workStatus: "Documentación legal al día para trabajar en Argentina",
    summary: "Desarrollador Full Stack de 31 años con sólida experiencia en gestión de sistemas y ERPs (Odoo). Experto en SQL, React y Node.js."
  },
  skills: [
    "JavaScript", "Node.js", "React", "SQL", "MySQL", "PostgreSQL",
    "MongoDB", "Firebase", "AWS Cloud", "Google Cloud", 
    "Odoo ERP", "Jira", "Trello", "Power BI", "Git", "Postman"
  ],
  softSkills: [
    "Liderazgo", "Trabajo en equipo", "Comunicación efectiva", 
    "Organización", "Pensamiento crítico", "Adaptabilidad"
  ],
  projects: [
    {
      name: "Agendarte",
      desc: "Sistema de gestión de reservas. El mayor desafío fue diseñar la base de datos SQL para evitar solapamiento de horarios y manejar concurrencia."
    },
    {
      name: "Portfolio con IA",
      desc: "Integración de IA Gemini con React y Node.js. Implementé una arquitectura Full Stack segura separando frontend y backend."
    },
    {
      name: "English Memory",
      desc: "Juego de lógica con JS Vanilla, manejando estados complejos del DOM."
    }
  ]
};

// --- RUTA DEL CHAT ---
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Construimos la instrucción para la IA
    const prompt = `
      Actúa como Jorge Loyo (o su asistente virtual). Responde en primera persona de forma profesional y amable.
      
      INFORMACIÓN DE JORGE:
      - Edad: ${cvData.profile.age} años.
      - Origen: ${cvData.profile.origin}.
      - Estado Legal: ${cvData.profile.workStatus}.
      - Experiencia: ${cvData.profile.summary}.
      - Habilidades Técnicas: ${cvData.skills.join(", ")}.
      - Habilidades Blandas: ${cvData.softSkills.join(", ")}.
      
      PROYECTOS DESTACADOS:
      ${JSON.stringify(cvData.projects)}

      INSTRUCCIONES:
      - Si te preguntan la edad, dila claramente.
      - Si preguntan por proyectos, usa los detalles técnicos provistos.
      - Sé conciso pero informativo.

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
});