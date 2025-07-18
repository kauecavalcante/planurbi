import styles from './AboutSection.module.css';


const diferenciais = [
  {
    iconClass: 'bxs-map-alt',
    title: "Mapeamento de Alta Precisão",
    description: "Georreferenciamento com drones e coleta detalhada em campo.",
  },
  {
    iconClass: 'bxs-layer',
    title: "Plataforma Digital de Gestão",
    description: "Ferramenta interativa para consulta e gestão territorial.",
  },
  {
    iconClass: 'bxs-file-doc', 
    title: "Legislação Moderna",
    description: "Revisão completa do Plano Diretor e das leis urbanística e tributária.",
  },
  {
    iconClass: 'bxs-direction-right',
    title: "Mobilidade Inteligente",
    description: "Plano alinhado à realidade da cidade e ao turismo sustentável.",
  },
  {
    iconClass: 'bxs-user-voice', 
    title: "Participação Comunitária",
    description: "Envolvimento ativo da comunidade em todas as etapas do processo.",
  },
  {
    iconClass: 'bxs-group',
    title: "Equipe Multidisciplinar",
    description: "Especialistas com vasta experiência nacional em planejamento urbano.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.introBlock}>
          <h2 className={styles.sectionTitle}>O que é o PPUrb?</h2>
          <p className={styles.sectionParagraph}>
            O PPUrb - Programa de Planejamento Urbano da Barra de São Miguel é uma iniciativa da FEPESA que reúne tecnologia, inteligência territorial e participação social para modernizar a gestão da cidade e torná-la referência em desenvolvimento urbano sustentável.
          </p>
          <p className={styles.sectionParagraph}>
            O projeto vai atualizar os principais instrumentos urbanísticos e criar ferramentas digitais para apoiar decisões estratégicas, com foco na justiça fiscal, mobilidade eficiente, uso racional do solo e valorização do patrimônio local.
          </p>
        </div>

        <div className={styles.diferenciaisBlock}>
          <h3 className={styles.subTitle}>Nossos Diferenciais</h3>
          <div className={styles.cardsGrid}>
            {diferenciais.map((item, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardIcon}>
                  
                  <i className={`bx ${item.iconClass}`}></i>
                </div>
                <h4 className={styles.cardTitle}>{item.title}</h4>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}