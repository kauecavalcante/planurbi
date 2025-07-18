import styles from './ExpectedResultsSection.module.css';


const resultados = [
  "Diagnóstico completo e atualizado do município",
  "Dados georreferenciados disponíveis para gestores e população",
  "Planejamento urbano baseado em evidências e integrado à realidade local",
  "Instrumentos legais modernos e adaptados ao contexto da cidade",
  "Maior justiça fiscal, transparência e eficiência na arrecadação municipal",
  "Fortalecimento da governança e da participação cidadã",
];

export function ExpectedResultsSection() {
  return (
    <section id="results" className={styles.resultsSection}>
      <div className={styles.container}>
        <div className={styles.introContainer}>
          <h2 className={styles.sectionTitle}>Resultados Esperados</h2>
        </div>

        <div className={styles.resultsGrid}>
          {resultados.map((item, index) => (
            <div key={index} className={styles.resultCard}>
              <span className={styles.cardNumber}>0{index + 1}</span>
              <p className={styles.cardText}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}