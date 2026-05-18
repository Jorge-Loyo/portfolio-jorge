import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { cvData } from '../data/cv';
import { ExternalLink } from 'lucide-react';
import styles from '../styles/Projects.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' }
  })
};

const Projects = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t.projects.title}</h2>

      <div className={styles.grid}>
        {cvData.projects.map((proj, index) => (
          <motion.a
            key={proj.id}
            href={proj.link}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <h3 className={styles.projectName}>
              {proj.name}
              <ExternalLink size={14} style={{ marginLeft: 8, opacity: 0.5, verticalAlign: 'middle' }} />
            </h3>
            <p className={styles.projectDesc}>{proj.desc}</p>

            <div className={styles.techStack}>
              {proj.tech.map((tech, i) => (
                <span key={i} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Projects;