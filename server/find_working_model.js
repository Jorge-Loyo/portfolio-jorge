// server/find_working_model.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Lista de candidatos (los más comunes y estables)
const candidates = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro",
  "gemini-1.0-pro",
  "gemini-pro",
  "gemini-2.0-flash-lite-preview-02-05", // Una versión ligera nueva que suele funcionar
];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testCandidate(modelName) {
  try {
    console.log(`⏳ Probando: ${modelName}...`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hola");
    const response = await result.response;

    // Si llegamos aquí, funcionó
    console.log(`✅ ¡ÉXITO! El modelo "${modelName}" funciona y tiene cuota.`);
    return true;
  } catch (error) {
    console.log(`❌ Falló ${modelName}: ${error.message.split("[")[0]}`); // Muestra error corto
    return false;
  }
}

async function findBestModel() {
  console.log("🔍 Buscando un modelo compatible para tu API Key...");
  console.log("------------------------------------------------");

  for (const name of candidates) {
    const works = await testCandidate(name);
    if (works) {
      console.log("------------------------------------------------");
      console.log(`🏆 GANADOR: Usa el modelo "${name}" en tu index.js`);
      return; // Terminamos al encontrar el primero que sirva
    }
  }

  console.log("------------------------------------------------");
  console.log(
    "⚠️ Ninguno de los modelos estándar funcionó. Revisa tu API Key o tu cuenta de Google."
  );
}

findBestModel();
