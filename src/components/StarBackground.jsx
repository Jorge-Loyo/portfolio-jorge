import React, { useRef, useEffect } from 'react';

const COLORS = [
  '255, 255, 255',
  '168, 85, 247',
  '59, 130, 246',
  '236, 72, 153',
  '6, 182, 212',
];

const drawRocket = (ctx, x, y, angle, scale, flamePhase) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);

  const flameLen = 16 + Math.sin(flamePhase) * 6;

  const grad = ctx.createLinearGradient(0, -flameLen, 0, 0);
  grad.addColorStop(0, 'rgba(255, 200, 50, 0)');
  grad.addColorStop(0.3, 'rgba(255, 150, 50, 0.6)');
  grad.addColorStop(0.7, 'rgba(255, 100, 50, 0.8)');
  grad.addColorStop(1, 'rgba(255, 200, 100, 1)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-6, -flameLen * 0.5, 0, -flameLen);
  ctx.quadraticCurveTo(6, -flameLen * 0.5, 0, 0);
  ctx.fill();

  ctx.fillStyle = '#e5e5e5';
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.lineTo(-10, -10);
  ctx.lineTo(-7, 8);
  ctx.lineTo(0, 12);
  ctx.lineTo(7, 8);
  ctx.lineTo(10, -10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.moveTo(0, -26);
  ctx.lineTo(-6, -14);
  ctx.lineTo(6, -14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
  ctx.beginPath();
  ctx.arc(0, -4, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.moveTo(-7, 8);
  ctx.lineTo(-12, 14);
  ctx.lineTo(-7, 12);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(7, 8);
  ctx.lineTo(12, 14);
  ctx.lineTo(7, 12);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
};

const PLANET_TYPES = [
  { colors: ['#a855f7', '#7c3aed'], ring: true, bands: false },
  { colors: ['#3b82f6', '#06b6d4'], ring: false, bands: true },
  { colors: ['#ec4899', '#be185d'], ring: true, bands: false },
  { colors: ['#06b6d4', '#0891b2'], ring: false, bands: true },
];

const drawPlanet = (ctx, x, y, radius, type, rotation) => {
  ctx.save();
  ctx.translate(x, y);

  const grad = ctx.createRadialGradient(-radius * 0.3, -radius * 0.3, 0, 0, 0, radius);
  grad.addColorStop(0, type.colors[0]);
  grad.addColorStop(0.6, type.colors[1]);
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = radius * 0.5;
  ctx.shadowColor = type.colors[0];
  ctx.fill();
  ctx.shadowBlur = 0;

  if (type.bands) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let i = -3; i <= 3; i++) {
      const bandY = i * (radius * 0.22);
      ctx.beginPath();
      ctx.ellipse(0, bandY, radius * 0.9, radius * 0.08, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  if (type.ring) {
    ctx.save();
    ctx.rotate(rotation * 0.5);
    ctx.strokeStyle = `rgba(255, 255, 255, 0.15)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 2, radius * 0.35, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(255, 255, 255, 0.08)`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 2.3, radius * 0.4, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(-radius * 0.2, -radius * 0.2, radius * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fill();

  ctx.restore();
};

const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let shootingStars = [];
    let mouseX = -1;
    let mouseY = -1;

    const rockets = [];

    const MAX_ROCKETS = 2;

    const spawnRocket = () => {
      if (rockets.length >= MAX_ROCKETS) return;
      const fromLeft = Math.random() > 0.5;
      const upperBound = canvas.height * 0.35;
      const baseY = 40 + Math.random() * upperBound;
      rockets.push({
        x: fromLeft ? -60 : canvas.width + 60,
        y: baseY,
        speed: 1.2 + Math.random() * 0.8,
        angle: fromLeft ? -0.08 + Math.random() * 0.16 : Math.PI - (-0.08 + Math.random() * 0.16),
        scale: 0.5 + Math.random() * 0.25,
        trail: [],
        alive: true,
      });
    };

    const spawnClickRocket = () => {
      if (rockets.length >= MAX_ROCKETS) return;
      const fromLeft = Math.random() > 0.5;
      rockets.push({
        x: fromLeft ? -60 : canvas.width + 60,
        y: 40 + Math.random() * (canvas.height * 0.25),
        speed: 2 + Math.random() * 0.8,
        angle: fromLeft ? -0.05 + Math.random() * 0.1 : Math.PI - (-0.05 + Math.random() * 0.1),
        scale: 0.45 + Math.random() * 0.2,
        trail: [],
        alive: true,
      });
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleClick = () => {
      spawnClickRocket();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

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

    const planets = Array.from({ length: 4 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height * 0.1 + Math.random() * canvas.height * 0.5,
      radius: 12 + Math.random() * 25,
      type: PLANET_TYPES[Math.floor(Math.random() * PLANET_TYPES.length)],
      speedX: (Math.random() - 0.5) * 0.08,
      speedY: (Math.random() - 0.5) * 0.04,
      rotation: Math.random() * Math.PI * 2,
      alpha: 0.15 + Math.random() * 0.2,
    }));

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
    let rocketTimer = 0;

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

      planets.forEach((p) => {
        ctx.globalAlpha = p.alpha;
        drawPlanet(ctx, p.x, p.y, p.radius, p.type, p.rotation);
        ctx.globalAlpha = 1;

        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += 0.001;

        if (p.x < -p.radius * 3) p.x = canvas.width + p.radius * 3;
        if (p.x > canvas.width + p.radius * 3) p.x = -p.radius * 3;
        if (p.y < -p.radius * 3) p.y = canvas.height + p.radius * 3;
        if (p.y > canvas.height + p.radius * 3) p.y = -p.radius * 3;
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

      rocketTimer++;
      if (rocketTimer > 300 + Math.random() * 400) {
        spawnRocket();
        rocketTimer = 0;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        if (!r.alive) {
          rockets.splice(i, 1);
          continue;
        }

        const dx = Math.cos(r.angle) * r.speed;
        const dy = Math.sin(r.angle) * r.speed;
        r.x += dx;
        r.y += dy;

        r.trail.push({ x: r.x, y: r.y, life: 1 });
        if (r.trail.length > 25) r.trail.shift();

        r.trail.forEach((t) => (t.life -= 0.04));
        r.trail = r.trail.filter((t) => t.life > 0);

        r.trail.forEach((t) => {
          const alpha = t.life * 0.15;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2 * t.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.fill();
        });

        const flamePhase = time * 0.02 + i;
        drawRocket(ctx, r.x, r.y, r.angle, r.scale, flamePhase);

        const margin = 80;
        if (
          r.x < -margin ||
          r.x > canvas.width + margin ||
          r.y < -margin ||
          r.y > canvas.height + margin
        ) {
          r.alive = false;
        }
      }

      if (mouseX > 0 && mouseY > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
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