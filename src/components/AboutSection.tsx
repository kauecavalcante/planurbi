import styles from './AboutSection.module.css';


const diferenciais = [
  {
    iconClass: 'bxs-map-alt',
    title: "Mapeamento de Alta Precisão",
    description: "Georreferenciamento com drones e coleta detalhada em campo.",
  },
  {
    iconClass: 'bxs-file-doc', 
    title: "Legislação Moderna",
    description: "Revisão completa da legislação urbanística.",
  },
  {
    iconClass: 'bxs-user-voice', 
    title: "Participação Comunitária",
    description: "Envolvimento ativo da comunidade em todas as etapas do processo, com a realização de audiências públicas, seminários setoriais e oficinas participativas.",
  },
  {
    iconClass: 'bxs-group',
    title: "Equipe Multidisciplinar",
    description: "Especialistas com vasta experiência nacional em planejamento urbano.",
  },
  {
    iconClass: 'bxs-analyse',
    title: "Diagnóstico Inteligente ",
    description: "Análise dos aspectos  físico-ambientais,  socioespaciais, culturais e econômicos do Município.",
  },
  

];

export function AboutSection() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.introBlock}>
          <h2 className={styles.sectionTitle}>Revisão do Plano Diretor</h2>
          <p className={styles.sectionParagraph}>
            Os Planos Diretores definem estratégias para o ordenamento territorial e para políticas setoriais que precisam ser incorporadas pela gestão pública e nos principais instrumentos do orçamento municipal. 
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