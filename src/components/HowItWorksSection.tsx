import styles from './HowItWorksSection.module.css';

const steps = [
  {
    number: "01",
    title: "Mobilização Inicial",
    description: "Articulação com a prefeitura, formação de equipe e definição da metodologia.",
  },
  {
    number: "02",
    title: "Diagnóstico Territorial Inteligente",
    description: "Leitura técnica e comunitária com mapeamento georreferenciado e oficinas públicas.",
  },
  {
    number: "03",
    title: "Mapeamento Cadastral com Plataforma Digital",
    description: "Levantamento completo das edificações, zoneamento, dados tributários e socioeconômicos em ambiente online interativo.",
  },
  {
    number: "04",
    title: "Síntese e Entregas Normativas",
    subItems: [
      "Minuta do novo Plano Diretor Participativo",
      "Código de Edificações",
      "Código Tributário atualizado",
      "Plano Auxiliar de Mobilidade Urbana",
    ],
  },
];


const CheckmarkIcon = () => (
    <svg className={styles.checkmarkIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className={styles.howItWorksSection}>
      <div className={styles.container}>
        <div className={styles.introContainer}>
          <h2 className={styles.sectionTitle}>Como Funciona</h2>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineMarker}>{step.number}</div>
              <div className={styles.timelineContent}>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                {step.description && (
                  <p className={styles.cardDescription}>{step.description}</p>
                )}
                {step.subItems && (
                  <ul className={styles.subList}>
                    {step.subItems.map((item, subIndex) => (
                      <li key={subIndex}>
                        <CheckmarkIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}