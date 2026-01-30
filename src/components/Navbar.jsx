// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>{t.nav.home}</Link>
      <Link to="/projects" className={styles.link}>{t.nav.projects}</Link>
      <Link to="/contact" className={styles.link}>{t.nav.contact}</Link>
      <button onClick={toggleLanguage} className={styles.langButton}>
        {language === 'es' ? 'EN' : 'ES'}
      </button>
    </nav>
  );
};

export default Navbar;