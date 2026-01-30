// src/App.jsx
import React from 'react';
import { motion } from 'framer-motion'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import Projects from './components/Projects';
import StarBackground from './components/StarBackground';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

// i18n
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

// Datos y Estilos
import { cvData } from './data/cv';
import styles from './styles/App.module.css';

// Configuración de la animación (Fade In hacia arriba)
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function AppContent() {
  const { t } = useLanguage();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <StarBackground />
      <Layout>
        <header className={styles.header}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.img 
              src={cvData.profile.avatar} 
              alt="Foto de Perfil" 
              className={styles.avatar}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, borderColor: "#e5e5e5" }}
            />           
            
            <motion.h1 variants={fadeInUp} className={styles.title}>
              {cvData.profile.name}
            </motion.h1>
            
            <motion.h2 variants={fadeInUp} className={styles.role}>
              {t.header.role}
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
          <Route path="/contact" element={<Contact />} />
        </Routes>

      </Layout>
    </BrowserRouter>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;