import styles from './ObjectiveSection.module.css';


const objetivos = [
  "Redução das desigualdades socioespaciais",
  "Melhoria na prestação de serviços públicos",
  "Justiça fiscal e uso estratégico do território",
  "Crescimento sustentável e integrado à região metropolitana",
];


const CheckmarkIcon = () => (
  <svg className={styles.checkmarkIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export function ObjectiveSection() {
  return (
    <section id="objectives" className={styles.objectiveSection}>
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          
          <div className={styles.textColumn}>
            <h2 className={styles.sectionTitle}>Objetivo do Programa</h2>
            <p className={styles.sectionParagraph}>
              Modernizar o planejamento urbano da Barra de São Miguel com base em evidências, participação popular e tecnologia de ponta, promovendo:
            </p>
          </div>

         
          <div className={styles.listColumn}>
            <ul className={styles.objectiveList}>
              {objetivos.map((item, index) => (
                <li key={index} className={styles.objectiveItem}>
                  <CheckmarkIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}