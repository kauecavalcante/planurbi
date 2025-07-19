import styles from './BenefitsSection.module.css';


const beneficios = [
  "Planejamento com visão de futuro",
  "Crescimento urbano ordenado e inclusivo",
  "Qualidade de vida para moradores e visitantes",
  "Segurança jurídica para investimentos",
  "Sustentabilidade ambiental e adaptação às mudanças climáticas",
];

export function BenefitsSection() {
  return (
    <section id="benefits" className={styles.benefitsSection}>
      <div className={styles.container}>
        <div className={styles.introContainer}>
          <h2 className={styles.sectionTitle}>O que se espera para a Cidade</h2>
        </div>

        <div className={styles.benefitsGrid}>
          {beneficios.map((item, index) => (
            <div key={index} className={styles.benefitCard}>
              <p className={styles.cardText}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}