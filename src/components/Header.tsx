"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`${styles.headerSection} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={`${styles.logo} ${isScrolled ? styles.visible : ''}`}>
          <Image
            src="/icon-azul.png"
            alt="Logo PlanUrbi"
            width={70}
            height={45}
            priority
          />
        </Link>

        
        <nav className={styles.navDesktop}>
          <Link href="/">Início</Link>
          <Link href="/programacao">Seminário</Link>
          <Link href="/noticias">Notícias</Link>
        </nav>

       
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Abrir menu">
          <i className={isMenuOpen ? 'bx bx-x' : 'bx bx-menu'}></i>
        </button>

        
        <nav className={`${styles.navMobile} ${isMenuOpen ? styles.open : ''}`}>
          <Link href="/" onClick={toggleMenu}>Início</Link>
          <Link href="/programacao" onClick={toggleMenu}>Seminário</Link>
          <Link href="/noticias" onClick={toggleMenu}>Notícias</Link>
        </nav>
      </div>
    </header>
  );
}