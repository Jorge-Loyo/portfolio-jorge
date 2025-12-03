// src/components/StarBackground.jsx
import React, { useRef, useEffect } from 'react';

const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configurar tamaño inicial
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const numStars = 150; // Cantidad de estrellas

    // Crear estrellas aleatorias
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5, // Tamaño variable
        speed: Math.random() * 0.5 + 0.1, // Velocidad variable
        opacity: Math.random() // Brillo variable
      });
    }

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar pantalla
      
      stars.forEach(star => {
        // Dibujar estrella
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Mover estrella hacia arriba
        star.y -= star.speed;

        // Si sale por arriba, vuelve a aparecer abajo
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate); // Repetir bucle
    };

    animate();

    // Ajustar si cambian el tamaño de la ventana
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', // Fijo en la pantalla
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,       // ¡IMPORTANTE! Detrás de todo (-1)
        background: 'transparent', // Fondo transparente para ver el color negro base
        pointerEvents: 'none' // Para que no interfiera con los clics
      }}
    />
  );
};

export default StarBackground;