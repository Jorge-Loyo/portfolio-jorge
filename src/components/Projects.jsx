import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { cvData } from '../data/cv';
import { ExternalLink, Database, Code2, Building2 } from 'lucide-react';
import styles from '../styles/Projects.module.css';

const categoryIcons = {
  data: Database,
  fullstack: Code2,
  enterprise: Building2,
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' }
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const Projects = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('data');

  const filteredProjects = cvData.projects.filter(p => p.category === activeCategory);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t.projects.title}</h2>

      <div className={styles.tabs}>
        {cvData.projectCategories.map((cat) => {
          const Icon = categoryIcons[cat.id];
          return (
            <button
              key={cat.id}
              className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <Icon size={16} />
              <span>{language === 'es' ? cat.labelEs : cat.labelEn}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProjects.map((proj, index) => {
            const isLink = proj.link && proj.link !== '#';
            const Tag = isLink ? motion.a : motion.div;
            const linkProps = isLink
              ? { href: proj.link, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <Tag
                key={proj.id}
                className={styles.card}
                {...linkProps}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {proj.type === 'case-study' && (
                  <span className={styles.badge}>
                    {language === 'es' ? 'Caso de Estudio' : 'Case Study'}
                  </span>
                )}

                <h3 className={styles.projectName}>
                  {proj.name}
                  {isLink && <ExternalLink size={14} style={{ marginLeft: 8, opacity: 0.5, verticalAlign: 'middle' }} />}
                </h3>

                {proj.highlight && (
                  <div className={styles.highlight}>{proj.highlight}</div>
                )}

                <p className={styles.projectDesc}>{proj.desc}</p>

                <div className={styles.techStack}>
                  {proj.tech.map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </Tag>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Projects;
