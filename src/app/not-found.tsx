"use client";
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import styles from './NotFound.module.css'; 


export default function NotFoundPage() {
  return (
    <div className={styles.pageContainer}>
      <MessageDisplay />
      <CharactersAnimation />
      <CircleAnimation />
    </div>
  );
}


function MessageDisplay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.messageContainer}>
      <div className={`${styles.messageContent} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className={styles.title}>
          Página Não Encontrada
        </div>
        <div className={styles.errorCode}>
          404
        </div>
        <div className={styles.description}>
          Parece que um dos nossos algoritmos de navegação está numa pausa para o café. A página que procura pode não existir ou estar temporariamente indisponível.
        </div>
        <div className={styles.buttonsContainer}>
          <Link href="/" className={`${styles.button} ${styles.goHomeButton}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
}


function CharactersAnimation() {
  const charactersRef = useRef<HTMLDivElement>(null);

  const createAnimations = () => {
    const container = charactersRef.current;
    if (!container) return;
    container.innerHTML = ''; 

    const stickFigures = [
      { top: '0%', src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg', transform: 'rotateZ(-90deg)', speedX: 1500 },
      { top: '10%', src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick1.svg', speedX: 3000, speedRotation: 2000 },
      { top: '20%', src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick2.svg', speedX: 5000, speedRotation: 1000 },
      { top: '25%', src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg', speedX: 2500, speedRotation: 1500 },
      { top: '35%', src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg', speedX: 2000, speedRotation: 300 },
      { bottom: '5%', src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick3.svg', speedX: 0 },
    ];

    
    const figuresToRender = window.innerWidth < 768 ? [stickFigures[5]] : stickFigures;

    figuresToRender.forEach((figure) => {
      const stick = document.createElement('img');
      stick.style.position = 'absolute';
      stick.style.width = '18%';
      stick.style.height = '18%';
      stick.style.filter = 'invert(88%) sepia(13%) saturate(545%) hue-rotate(359deg) brightness(95%) contrast(91%)';
      
      if (figure.top) stick.style.top = figure.top;
      if (figure.bottom) stick.style.bottom = figure.bottom;
      stick.src = figure.src;
      if (figure.transform) stick.style.transform = figure.transform;
      container.appendChild(stick);

      if (figure.speedX > 0) {
        stick.animate([{ left: '100%' }, { left: '-20%' }], { duration: figure.speedX, easing: 'linear', fill: 'forwards' });
      }
      if (figure.speedRotation) {
        stick.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-300deg)' }], { duration: figure.speedRotation, iterations: Infinity, easing: 'linear' });
      }
    });
  };

  useEffect(() => {
    createAnimations();
    window.addEventListener('resize', createAnimations);
    return () => window.removeEventListener('resize', createAnimations);
  }, []);

  return <div ref={charactersRef} className={styles.charactersContainer} />;
}


interface Circulo { x: number; y: number; size: number; }

function CircleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let timer = 0;
    let circulos: Circulo[] = [];

    const initArr = () => {
      circulos = [];
      for (let i = 0; i < 300; i++) {
        const randomX = Math.floor(Math.random() * (canvas.width * 3 - canvas.width * 1.2 + 1)) + canvas.width * 1.2;
        const randomY = Math.floor(Math.random() * (canvas.height - canvas.height * -0.2 + 1)) + canvas.height * -0.2;
        circulos.push({ x: randomX, y: randomY, size: canvas.width / 1000 });
      }
    };

    const draw = () => {
      timer++;
      context.setTransform(1, 0, 0, 1, 0, 0);
      const distanceX = canvas.width / 80;
      const growthRate = canvas.width / 1000;
      context.fillStyle = '#9EBAF2';
      context.clearRect(0, 0, canvas.width, canvas.height);

      circulos.forEach((circulo) => {
        context.beginPath();
        if (timer < 65) { circulo.x -= distanceX; circulo.size += growthRate; }
        if (timer > 65 && timer < 500) { circulo.x -= distanceX * 0.02; circulo.size += growthRate * 0.2; }
        context.arc(circulo.x, circulo.y, circulo.size, 0, 2 * Math.PI);
        context.fill();
      });

      if (timer > 500) { if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current); return; }
      requestIdRef.current = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      timer = 0;
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current);
      initArr();
      draw();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}