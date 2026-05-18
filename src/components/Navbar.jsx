import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Link
        to="/"
        className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}
      >
        {t.nav.home}
      </Link>
      <Link
        to="/about"
        className={`${styles.link} ${location.pathname === '/about' ? styles.active : ''}`}
      >
        {t.nav.about}
      </Link>
      <Link
        to="/projects"
        className={`${styles.link} ${location.pathname === '/projects' ? styles.active : ''}`}
      >
        {t.nav.projects}
      </Link>
      <Link
        to="/contact"
        className={`${styles.link} ${location.pathname === '/contact' ? styles.active : ''}`}
      >
        {t.nav.contact}
      </Link>
      <button onClick={toggleLanguage} className={styles.langButton}>
        {language === 'es' ? 'EN' : 'ES'}
      </button>
    </nav>
  );
};

export default Navbar;