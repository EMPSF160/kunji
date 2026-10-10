import React, { useEffect, useRef } from 'react';

export default function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.min(Math.floor((width * height) / 4500), 180);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.015 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.6 ? '#f7d1ba' : Math.random() > 0.3 ? '#c084fc' : '#ffffff',
    }));

    // Floating heart dust
    const heartCount = 18;
    const hearts = Array.from({ length: heartCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height,
      size: Math.random() * 9 + 5,
      alpha: Math.random() * 0.35 + 0.1,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      wobble: Math.random() * Math.PI * 2,
    }));

    function drawHeart(x, y, size, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#f472b6';
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      // bottom left curve
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.2, x, y + size);
      // bottom right curve
      ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      // top right curve
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha > 0.95) {
          star.alpha = 0.95;
          star.direction = -1;
        } else if (star.alpha < 0.15) {
          star.alpha = 0.15;
          star.direction = 1;
        }

        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.size > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render Floating Hearts
      hearts.forEach((heart) => {
        heart.y -= heart.speedY;
        heart.wobble += 0.02;
        heart.x += Math.sin(heart.wobble) * 0.5 + heart.speedX;

        if (heart.y < -30) {
          heart.y = height + 20;
          heart.x = Math.random() * width;
        }

        drawHeart(heart.x, heart.y, heart.size, heart.alpha);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
