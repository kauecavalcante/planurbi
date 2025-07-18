import styles from './AudienceSection.module.css';


const audienceList = [
  "Gestores públicos e tomadores de decisão",
  "Técnicos municipais e urbanistas",
  "Moradores da Barra de São Miguel",
  "Investidores, empresários e setor turístico",
  "Organizações da sociedade civil",
];
const extendedAudienceList = [...audienceList, ...audienceList];

export function AudienceSection() {
  return (
    <section id="audience" className={styles.audienceSection}>
      <div className={styles.introContainer}>
        <h2 className={styles.sectionTitle}>Para quem é?</h2>
        <p className={styles.sectionParagraph}>
          O PPUrb é voltado para:
        </p>
      </div>

      
      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          {extendedAudienceList.map((item, index) => (
            <div key={index} className={styles.marqueeItem}>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}