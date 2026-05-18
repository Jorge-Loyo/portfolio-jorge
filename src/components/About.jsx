import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { cvData } from '../data/cv';
import { Briefcase, GraduationCap, Award, Cpu, Heart, Download } from 'lucide-react';
import styles from '../styles/About.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' }
  })
};

const About = () => {
  const { language, t } = useLanguage();

  return (
    <div className={styles.container}>
      <motion.h2
        className={styles.title}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        {t.about.title}
      </motion.h2>

      <motion.p
        className={styles.subtitle}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        {language === 'es'
          ? 'Conoce mi trayectoria profesional, habilidades técnicas y formación.'
          : 'Explore my professional journey, technical skills, and education.'}
      </motion.p>

      <motion.div
        className={styles.section}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <h3 className={styles.sectionTitle}>
          <Briefcase size={20} className={styles.sectionIcon} />
          {t.about.experience}
        </h3>
        <div className={styles.timeline}>
          {cvData.experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
            >
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <h4 className={styles.timelineRole}>{exp.role}</h4>
                  <span className={styles.timelinePeriod}>{exp.period}</span>
                </div>
                <p className={styles.timelineCompany}>{exp.company}</p>
                <p className={styles.timelineDesc}>{exp.description}</p>
                <ul className={styles.achievementList}>
                  {exp.achievements.map((ach, j) => (
                    <li key={j} className={styles.achievementItem}>{ach}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className={styles.section}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <h3 className={styles.sectionTitle}>
          <Cpu size={20} className={styles.sectionIcon} />
          {t.about.skills}
        </h3>
        <div className={styles.skillsGrid}>
          {cvData.skills.map((skillGroup, i) => (
            <motion.div
              key={skillGroup.category}
              className={styles.skillCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
            >
              <h4 className={styles.skillCategoryTitle}>{skillGroup.category}</h4>
              <div className={styles.skillTags}>
                {skillGroup.items.map((item, j) => (
                  <span key={j} className={styles.skillTag}>{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className={styles.section}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <h3 className={styles.sectionTitle}>
          <Heart size={20} className={styles.sectionIcon} />
          {t.about.softSkills}
        </h3>
        <div className={styles.softSkillsGrid}>
          {cvData.softSkills.map((skill, i) => (
            <motion.div
              key={i}
              className={styles.softSkillCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.06, duration: 0.3 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className={styles.section}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={5}
      >
        <h3 className={styles.sectionTitle}>
          <GraduationCap size={20} className={styles.sectionIcon} />
          {t.about.education}
        </h3>
        <div className={styles.educationGrid}>
          {cvData.education.map((edu, i) => (
            <motion.div
              key={i}
              className={styles.educationCard}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
            >
              <div className={styles.eduDot} />
              <div>
                <h4 className={styles.eduDegree}>{edu.degree}</h4>
                <p className={styles.eduInstitution}>{edu.institution}</p>
                <span className={styles.eduPeriod}>{edu.period}</span>
                {edu.status && <span className={styles.eduStatus}>{edu.status}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className={styles.section}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={6}
      >
        <h3 className={styles.sectionTitle}>
          <Award size={20} className={styles.sectionIcon} />
          {t.about.certifications}
        </h3>
        <div className={styles.certGrid}>
          {cvData.certifications.map((cert, i) => (
            <motion.span
              key={i}
              className={styles.certTag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.3 }}
            >
              {cert}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className={styles.downloadSection}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={7}
      >
        <a
          href="https://raw.githubusercontent.com/Jorge-Loyo/portfolio-jorge/main/Document/CV%20Jorge%20Loyo.docx"
          className={styles.downloadBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download size={18} />
          {t.about.downloadCV}
        </a>
      </motion.div>
    </div>
  );
};

export default About;
