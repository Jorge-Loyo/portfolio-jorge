// src/App.jsx
import React from 'react';
import { motion } from 'framer-motion'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import Projects from './components/Projects';

// Datos y Estilos
import { cvData } from './data/cv';
import styles from './styles/App.module.css';

// Configuración de la animación (Fade In hacia arriba)
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <header className={styles.header}>
          {/* AQUÍ USAMOS 'motion': Cambiamos div por motion.div */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            {/* También aquí: h1 -> motion.h1 */}
            <motion.h1 variants={fadeInUp} className={styles.title}>
              {cvData.profile.name}
            </motion.h1>
            
            <motion.h2 variants={fadeInUp} className={styles.role}>
              {cvData.profile.role}
            </motion.h2>
            
            <Navbar />

            <motion.p variants={fadeInUp} className={styles.summary}>
              {cvData.profile.summary}
            </motion.p>
          </motion.div>
        </header>

        <Routes>
          <Route path="/" element={
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <ChatInterface />
            </motion.div>
          } />

          <Route path="/projects" element={<Projects />} />
        </Routes>

      </Layout>
    </BrowserRouter>
  );
}

export default App;