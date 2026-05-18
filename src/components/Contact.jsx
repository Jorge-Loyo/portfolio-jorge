import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Github, Linkedin, Globe, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { cvData } from '../data/cv';
import styles from '../styles/Contact.module.css';

const iconMap = {
  Mail: Mail,
  MessageCircle: MessageCircle,
  Github: Github,
  Linkedin: Linkedin,
  Globe: Globe
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
};

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t.contact.title}</h2>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', fontSize: '1.05rem' }}>
        {t.contact.subtitle}
      </p>

      <div className={styles.grid}>
        {cvData.socials.map((item, index) => {
          const IconComponent = iconMap[item.icon] || ExternalLink;

          return (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={styles.iconContainer}>
                <IconComponent size={40} strokeWidth={1.5} />
              </div>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <span className={styles.cardValue}>{item.value}</span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default Contact;