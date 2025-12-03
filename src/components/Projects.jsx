// src/components/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cv';
import styles from '../styles/Projects.module.css';

const Projects = () => {
  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.title}>Proyectos Destacados</h2>
      
      <div className={styles.grid}>
        {cvData.projects.map((proj) => (
          <a key={proj.id} href={proj.link} className={styles.card} target="_blank" rel="noopener noreferrer">
            <h3 className={styles.projectName}>{proj.name}</h3>
            <p className={styles.projectDesc}>{proj.desc}</p>
            
            <div className={styles.techStack}>
              {proj.tech.map((tech, index) => (
                <span key={index} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;