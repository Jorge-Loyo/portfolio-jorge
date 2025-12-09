# Portfolio Jorge - Portafolio Inteligente con IA

> Portafolio web interactivo con chatbot impulsado por Gemini AI de Google

## 🚀 Características

- **Chat con IA**: Interfaz conversacional que responde preguntas sobre mi perfil profesional usando Gemini 2.0 Flash
- **Animaciones fluidas**: Implementadas con Framer Motion para una experiencia visual atractiva
- **Diseño responsive**: Adaptado a todos los dispositivos
- **Navegación SPA**: React Router para transiciones suaves entre secciones
- **Fondo animado**: Canvas con estrellas en movimiento

## 🛠️ Stack Tecnológico

### Frontend
- React 19
- Vite 7
- Framer Motion (animaciones)
- Lucide React (iconos)
- React Router DOM
- CSS Modules

### Backend
- Node.js + Express
- Google Generative AI (Gemini API)
- CORS
- dotenv

## 📦 Instalación Local

### Prerrequisitos
- Node.js 18+ y npm
- API Key de Google Gemini ([obtener aquí](https://makersuite.google.com/app/apikey))

### 1. Clonar el repositorio
```bash
git clone https://github.com/Jorge-Loyo/portfolio-jorge.git
cd portfolio-jorge
```

### 2. Instalar dependencias del Frontend
```bash
npm install
```

### 3. Instalar dependencias del Backend
```bash
cd server
npm install
```

### 4. Configurar variables de entorno
Crea un archivo `.env` dentro de la carpeta `server/`:

```env
GEMINI_API_KEY=tu_api_key_aqui
PORT=3000
```

### 5. Arrancar el proyecto

**Terminal 1 - Backend:**
```bash
cd server
node index.js
```
El servidor estará en `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
La aplicación estará en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
portfolio-jorge/
├── public/
│   ├── perfil.jpg          # Foto de perfil
│   └── vite.svg
├── server/
│   ├── index.js            # Servidor Express + Gemini API
│   ├── .env                # Variables de entorno (no incluido)
│   └── package.json
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx    # Chat con IA
│   │   ├── Contact.jsx          # Página de contacto
│   │   ├── Layout.jsx           # Layout principal
│   │   ├── Navbar.jsx           # Navegación
│   │   ├── Projects.jsx         # Galería de proyectos
│   │   ├── ScrollToTop.jsx      # Utilidad de scroll
│   │   └── StarBackground.jsx   # Fondo animado
│   ├── data/
│   │   └── cv.js                # Datos del CV
│   ├── styles/
│   │   └── *.module.css         # Estilos modulares
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
└── vite.config.js
```

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia Vite dev server

# Producción
npm run build        # Construye para producción
npm run preview      # Preview del build

# Linting
npm run lint         # Ejecuta ESLint
```

## 🔧 Configuración de la API de Gemini

Si tienes problemas con el modelo, puedes probar otros disponibles:

```bash
cd server
node check_real_models.js    # Lista modelos disponibles
node find_working_model.js   # Encuentra el mejor modelo para tu API Key
```

Modelos alternativos en `server/index.js`:
- `gemini-2.0-flash-lite`
- `gemini-1.5-flash`
- `gemini-1.5-pro`

## 🌐 Deploy

### Frontend (Vercel/Netlify)
```bash
npm run build
# Subir carpeta dist/
```

### Backend (Render/Railway)
- Configurar `GEMINI_API_KEY` en variables de entorno
- Actualizar URL del backend en `ChatInterface.jsx`

## 📝 Personalización

Para adaptar el portfolio a tu perfil:

1. **Datos personales**: Edita `src/data/cv.js`
2. **Foto de perfil**: Reemplaza `public/perfil.jpg`
3. **Contexto de la IA**: Modifica `portfolioContext` en `server/index.js`
4. **Estilos**: Ajusta los archivos en `src/styles/`

## 📄 Licencia

MIT License - Jorge Antonio Loyo Nayati

## 📧 Contacto

- Email: Jorgenayati@gmail.com
- GitHub: [@Jorge-Loyo](https://github.com/Jorge-Loyo)
- WhatsApp: +54 9 11 6557 6344
