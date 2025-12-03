// src/components/Layout.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.content}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;