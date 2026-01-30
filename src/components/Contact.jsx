// src/components/Contact.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { cvData } from '../data/cv';
import styles from '../styles/Contact.module.css';

const iconMap = {
  Mail: Mail,
  MessageCircle: MessageCircle,
  Github: Github,
  Linkedin: Linkedin
};

const Contact = () => {
  const { t } = useLanguage();

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.title}>{t.contact.title}</h2>
      <p style={{ color: '#aaa', marginBottom: '30px' }}>
        {t.contact.subtitle}
      </p>
      
      <div className={styles.grid}>
        {cvData.socials.map((item) => {
          const IconComponent = iconMap[item.icon] || ExternalLink;
          
          return (
            <a 
              key={item.id} 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.card}
            >
              <div className={styles.iconContainer}>
                <IconComponent size={40} strokeWidth={1.5} />
              </div>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <span className={styles.cardValue}>{item.value}</span>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Contact;