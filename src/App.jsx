import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Layout from './components/Layout';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import Projects from './components/Projects';
import StarBackground from './components/StarBackground';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { cvData } from './data/cv';
import styles from './styles/App.module.css';

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
              {cvData.profile.summary}
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