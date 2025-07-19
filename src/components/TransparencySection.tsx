import styles from './TransparencySection.module.css';

export function TransparencySection() {
  return (
    <section id="transparency" className={styles.transparencySection}>
      <div className={styles.container}>
        <div className={styles.introContainer}>
          <h2 className={styles.sectionTitle}>Acesse a Documentação Produzida</h2>
          <p className={styles.sectionParagraph}>
            Aqui serão disponibilizados arquivos e planilhas para download.
          </p>
        </div>

        <div className={styles.placeholderCard}>
          <div className={styles.placeholderIcon}>
            <i className='bx bx-folder-open'></i>
          </div>
          <p className={styles.placeholderText}>
            Em breve: Documentos, relatórios e dados do projeto estarão disponíveis para consulta pública neste espaço.
          </p>
        </div>
      </div>
    </section>
  );
}