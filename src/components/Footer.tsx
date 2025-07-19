import Image from 'next/image';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer id="footer" className={styles.footerSection}>
      <div className={styles.container}>
    
        <div className={styles.realizacaoColumn}>
          <h3 className={styles.footerTitle}>Realização:</h3>
          <div className={styles.logoWrapper}>
            
            <Image
              src="/logo-prefeitura-placeholder.png"
              alt="Logo da Prefeitura da Barra de São Miguel"
              width={180}
              height={75}
            />
          </div>
        </div>

        
        <div className={styles.fepesaColumn}>
           
          <div className={styles.logoWrapper}>
            
            <Image
              src="/logo-fepesa-placeholder.png"
              alt="Logo da FEPESA"
              width={180}
              height={75}
            />
          </div>
          <div className={styles.contactInfo}>
            <p>Rua Aminadab Valente, 59 – Trapiche da Barra – Maceió/AL</p>
            <p>(82) 3223-5847</p>
            <p>www.fepesa.org.br</p>
          </div>
        </div>
      </div>
      <div className={styles.copyRight}>
        <p>© 2025 PlanUrbi. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}