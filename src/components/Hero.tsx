import Image from 'next/image';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.heroSection}>
      
      <div className={`${styles.backgroundImage} ${styles.mapa}`}>
        <Image
          src="/grafismo-mapa.png"
          alt="Grafismo do mapa de Barra de São Miguel"
          layout="fill"
          objectFit="contain"
          aria-hidden="true"
        />
      </div>
      <div className={`${styles.backgroundImage} ${styles.forma}`}>
        <Image
          src="/grafismo-forma.png"
          alt="Grafismo de forma orgânica"
          layout="fill"
          objectFit="contain"
          aria-hidden="true"
        />
      </div>

      
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.logoContainer}>
            <Image
              src="/logo-planurbi-stag.png"
              alt="Logo PlanUrbi"
              width={220}
              height={65}
              priority
              className={styles.logoImage}
            />
          </div>

          <h1 className={styles.mainHeadline}>
            Planejamento urbano integrado para uma cidade mais inclusiva, moderna e eficiente.
          </h1>

          <div className={styles.textBlock}>
            <p className={styles.paragraph}>
              Transformando o território com tecnologia, participação social e desenvolvimento sustentável.
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
}