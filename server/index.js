// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors()); // Permite que React (puerto 5173) hable con este servidor
app.use(express.json());

// Configuración de Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// CONTEXTO: Lo que la IA sabe de ti
// (Más adelante podemos hacer que lea esto directamente del archivo cv.json)
const portfolioContext = `
  ERES: El asistente virtual del portafolio de Jorge Antonio Loyo Nayati.
  OBJETIVO: Responder preguntas de reclutadores o colegas sobre la experiencia de Jorge para que lo contraten como Desarrollador.

  PERFIL PROFESIONAL:
  - Profesional de Sistemas con sólida experiencia en gestión de ERP (especializado en Odoo).
  - Transición exitosa de gestión de procesos (compras/farmacia) a Desarrollo de Software.
  - Enfoque: Soluciones tecnológicas que resuelven problemas reales de negocio.
  - Ubicación: San Telmo, CABA, Buenos Aires.
  - Contacto: Jorgenayati@gmail.com | 11 6557 6344 | GitHub: Jorge-Loyo

  HABILIDADES TÉCNICAS (HARD SKILLS):
  - Lenguajes: JavaScript (Frontend), React (Básico/Aprendiendo), Python (Básico), C# (Básico).
  - Backend & Datos: SQL (Intermedio), MySQL, PostgreSQL, Node.js.
  - Cloud & Herramientas: AWS Cloud (Fundamentos), Git, Postman, VS Code, Odoo ERP (Avanzado/Implementador).
  - Business Intelligence: Power BI, Excel Experto.

  EXPERIENCIA LABORAL:
  1. Responsable de Compras | Vooraf Worden (08/2025 - 10/2025)
     - Optimización de costos y procesos de abastecimiento.
     - Gestión de normas ISO 9001.

  2. Responsable de Sistemas / Analista de Ventas | CMI S.A (05/2023 - 07/2025)
     - LOGRO CLAVE: Lideró la implementación del sistema ERP Odoo.
     - Creación de Intranet corporativa y sistemas de tickets.
     - Administración de servidores y soporte a +500 usuarios.
     - Gestión de licitaciones públicas y documentación técnica.

  3. Encargado Administrativo de Farmacia | CMI - Hospital Naval (07/2018 - 05/2023)
     - Gestión de stock bajo normas ANMAT e ISO 9001.
     - Liderazgo de equipos y reportes mensuales.

  EDUCACIÓN:
  - Desarrollo de Software | IFTS 11 (2023 - Presente/En curso).
  - Cursos: Frontend con JS (Talento Tech), AWS Cloud Fundamentos, SQL Intermedio.

  REGLAS DE RESPUESTA:
  - Responde siempre en primera persona del plural ("Nosotros" o "Jorge") o tercera persona neutral, pero muy profesional.
  - Sé conciso (máximo 3 o 4 oraciones).
  - Si preguntan por Odoo, destaca tu experiencia implementándolo.
  - Si preguntan por tu nivel de React, sé honesto: "Estoy en proceso de aprendizaje avanzado, construyendo este portafolio con ello".
`;

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Crear el prompt combinando el contexto + la pregunta del usuario
    const prompt = `
      ${portfolioContext}
      
      USUARIO PREGUNTA: "${message}"
      
      RESPUESTA (Máximo 3 oraciones):
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Error en Gemini:", error);
    res
      .status(500)
      .json({ error: "Lo siento, tuve un error procesando tu solicitud." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor Backend corriendo en http://localhost:${PORT}`);
});
