import styles from './Termos.module.css';
import Link from 'next/link';

export default function TermosDeUsoPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentCard}>
        <h1 className={styles.title}>Termos de Uso e Política de Privacidade</h1>
        <div className={styles.textContent}>
          <p>Ao se credenciar para a Audiência Pública do Plano Diretor da Barra de São Miguel, você concorda com os seguintes termos:</p>
          
          <h2>1. Recolha e Uso de Dados</h2>
          <p>Os dados pessoais fornecidos (nome, CPF, email, telefone) serão recolhidos e armazenados de forma segura. Estas informações serão utilizadas exclusivamente para fins de registo, controlo de participação e comunicação sobre o processo de revisão do Plano Diretor e outras iniciativas relacionadas ao planeamento urbano do município.</p>

          <h2>2. Armazenamento e Segurança</h2>
          <p>As suas informações serão armazenadas na nossa base de dados segura e serão tratadas com a máxima confidencialidade. O acesso aos dados é restrito à equipa de organização do PlanUrbi e não serão partilhados com terceiros para fins comerciais.</p>

          <h2>3. Finalidade</h2>
          <p>O objetivo do credenciamento é garantir um processo organizado e transparente para a participação popular nas audiências públicas. Os dados ajudam-nos a compreender o perfil dos participantes e a garantir a legitimidade do processo.</p>

          <h2>4. Consentimento</h2>
          <p>Ao marcar a caixa de aceite no formulário de credenciamento, você consente com a recolha e o uso dos seus dados conforme descrito neste documento.</p>
        </div>
        <Link href="/credenciamento" className={styles.backButton}>
          Voltar ao Credenciamento
        </Link>
      </div>
    </div>
  );
}