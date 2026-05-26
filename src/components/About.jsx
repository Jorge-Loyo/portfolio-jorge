import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { cvData } from '../data/cv';
import { Briefcase, GraduationCap, Award, Cpu, Heart, MessageSquare } from 'lucide-react';
import styles from '../styles/About.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' }
  })
};

const aboutTextEs = {
  greeting: "¡Hola! Soy Jorge Loyo 👋",
  intro: "Soy Senior Project Manager y Desarrollador Tecnológico con más de 7 años de trayectoria liderando la intersección entre el código de alto rendimiento, el análisis analítico de datos y la gestión estratégica de proyectos.",
  hybrid: "Mi enfoque profesional se basa en un perfil netamente híbrido: tengo la capacidad de negociar presupuestos y coordinar roadmaps con la gerencia, y al mismo tiempo la solvencia técnica para sentarme a estructurar una base de datos o programar una API.",
  context: "A lo largo de mi carrera, me he especializado en entornos de alta criticidad operativa (como el sector salud y logístico), donde asumí la responsabilidad de:",
  pillars: [
    { title: "Liderar Equipos y Proyectos End-to-End", desc: "Dirigiendo células multidisciplinarias de hasta 24 personas y coordinando la apertura integral de infraestructuras IT desde cero." },
    { title: "Full Stack Development", desc: "Construyendo aplicaciones web robustas y escalables utilizando el ecosistema moderno de JavaScript/TypeScript (React, Next.js, Node.js)." },
    { title: "Data Analytics & BI", desc: "Transformando volúmenes masivos de información (+58 millones de registros) en tableros analíticos de alto impacto con Power BI y modelos avanzados en Python y SQL." },
  ],
  passion: "Me apasiona resolver problemas de negocio complejos mediante la arquitectura de software limpia, la automatización de procesos y metodologías ágiles (Scrum/Kanban) que lleven los proyectos a término en tiempo y forma.",
  current: "Actualmente me desempeño como consultor y desarrollador independiente, diseñando soluciones a medida y plataformas e-commerce que potencian la conversión y la eficiencia de mis clientes.",
  valueTitle: "🎯 ¿Qué aporto a un equipo?",
  values: [
    { title: "Visión 360°", desc: "Entiendo las necesidades del cliente (Análisis Funcional), planifico el camino (Project Management) y ejecuto la solución técnica (Development & Data)." },
    { title: "Comunicación Asertiva", desc: "Actúo como un puente de comunicación fluido entre los equipos de desarrollo técnico y los stakeholders del negocio." },
  ],
};

const aboutTextEn = {
  greeting: "Hi! I'm Jorge Loyo 👋",
  intro: "I'm a Senior Project Manager and Technology Developer with 7+ years leading the intersection of high-performance code, data analytics, and strategic project management.",
  hybrid: "My professional approach is based on a truly hybrid profile: I can negotiate budgets and coordinate roadmaps with management, while having the technical expertise to design a database or build an API.",
  context: "Throughout my career, I've specialized in high-criticality environments (healthcare and logistics sectors), where I took responsibility for:",
  pillars: [
    { title: "End-to-End Team & Project Leadership", desc: "Leading multidisciplinary teams of up to 24 people and coordinating full IT infrastructure deployments from scratch." },
    { title: "Full Stack Development", desc: "Building robust and scalable web applications using the modern JavaScript/TypeScript ecosystem (React, Next.js, Node.js)." },
    { title: "Data Analytics & BI", desc: "Transforming massive data volumes (+58 million records) into high-impact analytical dashboards with Power BI and advanced Python/SQL models." },
  ],
  passion: "I'm passionate about solving complex business problems through clean software architecture, process automation, and agile methodologies (Scrum/Kanban) that deliver projects on time and on budget.",
  current: "Currently working as an independent consultant and developer, designing custom solutions and e-commerce platforms that boost conversion and efficiency for my clients.",
  valueTitle: "🎯 What do I bring to a team?",
  values: [
    { title: "360° Vision", desc: "I understand client needs (Functional Analysis), plan the path (Project Management), and execute the technical solution (Development & Data)." },
    { title: "Assertive Communication", desc: "I act as a seamless bridge between technical development teams and business stakeholders." },
  ],
};

const skillCategories = [
  { category: "Management & Agile", items: ["Project Management", "Scrum", "Kanban", "Gestión de Presupuestos", "Liderazgo de Equipos", "Jira", "Trello", "Notion"] },
  { category: "Development", items: ["Next.js", "React", "Node.js", "Python", "TypeScript", "Express", "APIs REST", "C#"] },
  { category: "Data & Database", items: ["Power BI (DAX / M)", "SQL Server", "PostgreSQL", "MySQL", "MongoDB", "ETL", "Pandas", "Polars"] },
  { category: "DevOps & Tools", items: ["Docker", "AWS Cloud Fundamentals", "Git", "GitHub", "CI/CD", "Vercel", "Render"] },
];

const About = () => {
  const { language, t } = useLanguage();
  const text = language === 'es' ? aboutTextEs : aboutTextEn;

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

      {/* Bio Section */}
      <motion.div
        className={styles.bioSection}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <h3 className={styles.bioGreeting}>{text.greeting}</h3>
        <p className={styles.bioText}>{text.intro}</p>
        <p className={styles.bioText}>{text.hybrid}</p>
        <p className={styles.bioText}>{text.context}</p>
        <div className={styles.pillars}>
          {text.pillars.map((p, i) => (
            <div key={i} className={styles.pillar}>
              <strong className={styles.pillarTitle}>{p.title}:</strong>{' '}
              <span className={styles.pillarDesc}>{p.desc}</span>
            </div>
          ))}
        </div>
        <p className={styles.bioText}>{text.passion}</p>
        <p className={styles.bioText}>{text.current}</p>

        <h4 className={styles.valueTitle}>{text.valueTitle}</h4>
        <div className={styles.values}>
          {text.values.map((v, i) => (
            <div key={i} className={styles.valueItem}>
              <strong>{v.title}:</strong> {v.desc}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div
        className={styles.section}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={3}
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

      {/* Education */}
      <motion.div
        className={styles.section}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={4}
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

      {/* Skills Grid */}
      <motion.div
        className={styles.section}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={5}
      >
        <h3 className={styles.sectionTitle}>
          <Cpu size={20} className={styles.sectionIcon} />
          {t.about.skills}
        </h3>
        <div className={styles.skillsGrid}>
          {skillCategories.map((skillGroup, i) => (
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

      {/* Soft Skills */}
      <motion.div
        className={styles.section}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={6}
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

      {/* Certifications */}
      <motion.div
        className={styles.section}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={7}
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

      {/* CTA Button */}
      <motion.div
        className={styles.ctaSection}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={8}
      >
        <a href="https://www.linkedin.com/in/jorgeloyonayati/" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
          <MessageSquare size={18} />
          {language === 'es' ? 'Hablemos' : "Let's Talk"}
        </a>
      </motion.div>
    </div>
  );
};

export default About;
