"use client";
import { useEffect } from 'react';
import Image from 'next/image';
import styles from './BannerModal.module.css';

interface BannerModalProps {
  onClose: () => void;
  formUrl: string;
}

export function BannerModal({ onClose, formUrl }: BannerModalProps) {
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Fechar modal">
          <i className='bx bx-x'></i>
        </button>
        
        <a href={formUrl} target="_blank" rel="noopener noreferrer" className={styles.bannerLink}>
          <Image 
            src="/propaganda.jpeg" 
            alt="Banner do questionário de diagnóstico PlanUrbi"
            width={450} 
            height={450} 
            className={styles.bannerImage}
          />
        </a>
      </div>
    </div>
  );
}