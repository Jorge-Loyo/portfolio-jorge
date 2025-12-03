// server/check_real_models.js
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("🔍 Consultando lista oficial de modelos a Google...");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      console.error("❌ Error de Google:", data.error.message);
    } else if (data.models) {
      console.log(
        "✅ ¡Conexión Exitosa! Estos son los modelos exactos que puedes usar:"
      );
      console.log(
        "---------------------------------------------------------------"
      );
      // Filtramos solo los que sirven para generar contenido (chat)
      const chatModels = data.models.filter((m) =>
        m.supportedGenerationMethods.includes("generateContent")
      );

      chatModels.forEach((m) => {
        // El nombre viene como "models/gemini-pro", nosotros queremos lo que sigue a la barra
        console.log(
          `Nombre para usar en código: "${m.name.replace("models/", "")}"`
        );
      });
      console.log(
        "---------------------------------------------------------------"
      );
    } else {
      console.log("⚠️ Respuesta extraña:", data);
    }
  })
  .catch((err) => console.error("❌ Error de red:", err));
