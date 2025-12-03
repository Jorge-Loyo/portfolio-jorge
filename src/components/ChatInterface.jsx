// src/components/ChatInterface.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/ChatInterface.module.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola, soy la IA de Jorge. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Referencia para bajar el scroll automáticamente
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('https://portfolio-jorge-x82x.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });
      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.reply || "No pude conectar con el servidor.",
        sender: 'bot'
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
        // ... manejo de errores igual que antes ...
        console.error(error);
        setMessages((prev) => [...prev, { id: Date.now()+1, text: "Error de conexión.", sender: 'bot'}]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesArea}>
        {/* AnimatePresence permite animar elementos cuando se crean O destruyen */}
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.9 }} // Empieza pequeño y abajo
              animate={{ opacity: 1, y: 0, scale: 1 }}     // Crece y sube
              transition={{ type: "spring", stiffness: 300, damping: 20 }} // Efecto rebote suave
              className={`${styles.messageBubble} ${msg.sender === 'user' ? styles.userMessage : styles.botMessage}`}
            >
              {msg.text}
            </motion.div>
          ))}
          
          {/* Animación de "Escribiendo..." */}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.messageBubble} ${styles.botMessage} ${styles.typingContainer}`}
            >
              <span className={styles.dot}>.</span>
              <span className={styles.dot}>.</span>
              <span className={styles.dot}>.</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className={styles.inputArea}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Pregunta sobre mis proyectos..."
          className={styles.input}
          disabled={isLoading}
        />
        <motion.button 
          type="submit" 
          className={styles.sendButton} 
          disabled={isLoading}
          whileHover={{ scale: 1.1 }} // <--- El botón crece al pasar el mouse
          whileTap={{ scale: 0.9 }}   // <--- El botón se encoge al hacer clic
        >
          <Send size={18} />
        </motion.button>
      </form>
    </div>
  );
};

export default ChatInterface;