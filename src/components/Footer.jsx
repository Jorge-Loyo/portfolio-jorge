import React from 'react';
import { Mail, MessageCircle, Github, Linkedin, Globe, ExternalLink } from 'lucide-react';
import { cvData } from '../data/cv';
import styles from '../styles/Footer.module.css';

const iconMap = {
  Mail: Mail,
  MessageCircle: MessageCircle,
  Github: Github,
  Linkedin: Linkedin,
  Globe: Globe,
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.links}>
          {cvData.socials.map((item) => {
            const Icon = iconMap[item.icon] || ExternalLink;
            return (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                title={item.name}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
        <p className={styles.copy}>
          &copy; {year} {cvData.profile.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
