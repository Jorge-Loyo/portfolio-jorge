# Estructura del Proyecto Portfolio Jorge

```
portfolio-jorge/
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   ├── ChatInterface.jsx      # Interfaz de chat con IA (UI funcional, sin API)
│   │   └── Layout.jsx              # Layout principal con animaciones
│   │
│   ├── data/
│   │   └── cv.js                   # Datos del CV (perfil, skills, experiencia, proyectos)
│   │
│   ├── styles/
│   │   ├── App.module.css
│   │   ├── ChatInterface.module.css
│   │   └── Layout.module.css
│   │
│   ├── App.jsx                     # Componente principal
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Estilos globales
│
├── .gitignore
├── cv_data.json                    # Datos CV en JSON (alternativo)
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Tecnologías
- **React 19** + **Vite**
- **Framer Motion** (animaciones)
- **Lucide React** (iconos)
- **CSS Modules** (estilos)

## Estado Actual
✅ UI del portfolio con header y datos del CV  
✅ Chat interface funcional (sin conexión a Gemini aún)  
✅ Sistema de mensajes con estado local  
⏳ Integración con Gemini AI (pendiente)
