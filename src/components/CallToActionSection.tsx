import Image from 'next/image';
import styles from './CallToActionSection.module.css';

interface CallToActionProps {
  formUrl: string;
}

export function CallToActionSection({ formUrl }: CallToActionProps) {
  return (
    <section id="call-to-action" className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.textColumn}>
          <h2 className={styles.title}>Sua Opinião Constrói o Futuro!</h2>
          <p className={styles.description}>
            Ajude-nos a construir o planeamento urbano da Barra de São Miguel! A sua participação é fundamental.
          </p>
          <p className={styles.audienceInfo}>
            <strong>Quem pode participar?</strong> Todos que têm envolvimento com a cidade: moradores, empresários, veranistas, trabalhadores e servidores.
          </p>
          <a href={formUrl} target="_blank" rel="noopener noreferrer" className={styles.formButton}>
            Preencher Questionário
          </a>
        </div>

        <div className={styles.qrColumn}>
          <a href={formUrl} target="_blank" rel="noopener noreferrer" className={styles.qrCodeWrapper}>
            <Image 
              src="/qrcode-diagnostico.jpg" 
              alt="QR Code para o questionário de diagnóstico"
              width={180}
              height={180}
            />
          </a>
          <p>Aponte a câmara e participe!</p>
        </div>
      </div>
    </section>
  );
}