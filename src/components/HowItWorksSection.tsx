import styles from './HowItWorksSection.module.css';

export function HowItWorksSection() {
  return (
    <section id="public-hearing" className={styles.howItWorksSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Revisão do Plano Diretor</h2>
        
        <p className={styles.announcementText}>
          A Prefeitura Municipal de Barra de São Miguel – AL, por meio da Secretaria Municipal de Administração e Planejamento, no uso de suas atribuições legais e em conformidade com os princípios da gestão democrática, da transparência e da participação social, torna público e convida toda a população, representantes da sociedade civil, instituições públicas, privadas, organizações não governamentais, conselhos municipais, entidades de classe e demais interessados a participarem da Primeira Audiência Pública para a elaboração do Plano Diretor Participativo do Município de Barra de São Miguel – AL.
        </p>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <strong>Data:</strong> 22 de julho
          </div>
          <div className={styles.detailItem}>
            <strong>Horário:</strong> 8h às 12h
          </div>
          <div className={styles.detailItem}>
            <strong>Local:</strong> Village Barra Hotel
          </div>
        </div>
      </div>
    </section>
  );
}