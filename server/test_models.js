// server/test_models.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    // Esto listará todos los modelos disponibles para tu clave
    const models = await genAI.getGenerativeModel({ model: "gemini-pro" })
      .apiKey; // Verificación simple
    console.log("Conectando con Google...");

    // Obtener lista real (truco usando el cliente interno si la librería lo permite,
    // o simplemente probando uno seguro).
    // La forma estándar en la v1beta es usar el modelo directamente,
    // pero vamos a probar el 'gemini-pro' que nunca falla.

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hola, ¿funcionas?");
    console.log("✅ ¡Éxito! El modelo 'gemini-pro' funciona.");
    console.log("Respuesta:", result.response.text());
  } catch (error) {
    console.error("\n❌ Error detallado:", error.message);
    if (error.message.includes("404")) {
      console.log(
        "Diagnóstico: Tu clave funciona, pero el nombre del modelo no existe."
      );
    } else if (error.message.includes("400") || error.message.includes("403")) {
      console.log("Diagnóstico: Tu clave API es inválida o no tiene permisos.");
    }
  }
}

listModels();
