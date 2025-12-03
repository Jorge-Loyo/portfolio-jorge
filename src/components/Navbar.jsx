// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>Inicio / Chat</Link>
      <Link to="/projects" className={styles.link}>Proyectos</Link>
      <Link to="/contact" className={styles.link}>Contacto</Link>
    </nav>
  );
};

export default Navbar;