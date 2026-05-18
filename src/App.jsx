import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Layout from './components/Layout';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import Projects from './components/Projects';
import About from './components/About';
import StarBackground from './components/StarBackground';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { cvData } from './data/cv';
import styles from './styles/App.module.css';

const pageTitles = {
  '/': 'Inicio',
  '/about': 'Acerca de',
  '/projects': 'Proyectos',
  '/contact': 'Contacto',
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3, ease: 'easeIn' } },
};

function AnimatedRoutes() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const base = `Jorge Loyo - ${pageTitles[location.pathname] || 'Portfolio'}`;
    document.title = base;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      const descs = {
        '/': cvData.profile.summary,
        '/about': language === 'es'
          ? 'Conoce mi trayectoria profesional, habilidades técnicas y formación.'
          : 'Learn about my professional experience, technical skills and education.',
        '/projects': language === 'es'
          ? 'Proyectos destacados de desarrollo de software, análisis de datos e IA.'
          : 'Featured projects in software development, data analysis and AI.',
        '/contact': language === 'es'
          ? 'Contacta conmigo para proyectos freelance, colaboraciones o contratación.'
          : 'Get in touch for freelance projects, collaborations or hiring.',
      };
      meta.setAttribute('content', descs[location.pathname] || cvData.profile.summary);
    }
  }, [location.pathname, language]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<ChatInterface />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

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
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.img
              src={cvData.profile.avatar}
              alt="Foto de Perfil"
              className={styles.avatar}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            />

            <motion.h1 variants={fadeInUp} className={styles.title}>
              {cvData.profile.name}
            </motion.h1>

            <motion.h2 variants={fadeInUp} className={styles.role}>
              {t.header.role}
            </motion.h2>

            <Navbar />

            <motion.p variants={fadeInUp} className={styles.summary}>
              {t.header.summary}
            </motion.p>
          </motion.div>
        </header>

        <AnimatedRoutes />
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