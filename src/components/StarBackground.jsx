import React, { useRef, useEffect } from 'react';

const COLORS = [
  '255, 255, 255',
  '168, 85, 247',
  '59, 130, 246',
  '236, 72, 153',
  '6, 182, 212',
];

const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let shootingStars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const layers = [
      { count: 80, speed: 0.02, minR: 0.5, maxR: 1, opacity: 0.3 },
      { count: 100, speed: 0.05, minR: 0.8, maxR: 1.5, opacity: 0.6 },
      { count: 50, speed: 0.1, minR: 1.2, maxR: 2.2, opacity: 0.9 },
    ];

    const stars = layers.map((layer) =>
      Array.from({ length: layer.count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * (layer.maxR - layer.minR) + layer.minR,
        speed: layer.speed,
        opacity: layer.opacity,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      }))
    );

    const nebula = [
      { x: 0.2, y: 0.3, r: 300, color: '59, 130, 246', alpha: 0.03 },
      { x: 0.8, y: 0.6, r: 250, color: '168, 85, 247', alpha: 0.03 },
      { x: 0.5, y: 0.8, r: 200, color: '236, 72, 153', alpha: 0.02 },
    ];

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width * 1.5 - canvas.width * 0.25,
        y: Math.random() * canvas.height * 0.4,
        length: Math.random() * 120 + 60,
        speed: Math.random() * 8 + 4,
        angle: Math.PI / 4 + Math.random() * 0.3,
        opacity: 1,
        life: 1,
      });
    };

    let shootingTimer = 0;

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nebula.forEach((n) => {
        const gradient = ctx.createRadialGradient(
          n.x * canvas.width, n.y * canvas.height, 0,
          n.x * canvas.width, n.y * canvas.height, n.r
        );
        gradient.addColorStop(0, `rgba(${n.color}, ${n.alpha})`);
        gradient.addColorStop(1, `rgba(${n.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      stars.forEach((layer) => {
        layer.forEach((star) => {
          const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
          const alpha = star.opacity * twinkle;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
          ctx.fill();

          if (star.r > 1.2) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = `rgba(${star.color}, ${alpha * 0.5})`;
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          star.y -= star.speed;
          star.x -= star.speed * 0.1;

          if (star.y < -5) {
            star.y = canvas.height + 5;
            star.x = Math.random() * canvas.width;
          }
          if (star.x < -5) star.x = canvas.width + 5;
        });
      });

      shootingTimer++;
      if (shootingTimer > 120 + Math.random() * 180) {
        spawnShootingStar();
        shootingTimer = 0;
      }

      shootingStars = shootingStars.filter((s) => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        const grad = ctx.createLinearGradient(0, 0, -s.length, 0);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        grad.addColorStop(0.3, `rgba(200, 200, 255, ${s.opacity * 0.4})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-s.length, 0);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.005;
        s.life -= 0.008;

        return s.life > 0 && s.opacity > 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'transparent',
        pointerEvents: 'none',
      }}
    />
  );
};

export default StarBackground;