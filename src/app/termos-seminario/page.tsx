import styles from './TermosSeminario.module.css';
import Link from 'next/link';

export default function TermosSeminarioPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentCard}>
        <h1 className={styles.title}>Termos de Uso e Política de Privacidade do Seminário</h1>
        <div className={styles.textContent}>
          <p>Ao se inscrever no I Seminário PlanUrbi, você concorda com os seguintes termos:</p>
          
          <h2>1. Recolha e Uso de Dados</h2>
          <p>Os dados pessoais fornecidos (nome, CPF, email, telefone) serão recolhidos e armazenados de forma segura. Estas informações serão utilizadas exclusivamente para fins de registo, controlo de participação e comunicação sobre o seminário e outras iniciativas relacionadas ao PlanUrbi.</p>

          <h2>2. Armazenamento e Segurança</h2>
          <p>As suas informações serão armazenadas na nossa base de dados segura e serão tratadas com a máxima confidencialidade. O acesso aos dados é restrito à equipa de organização do evento e não serão partilhados com terceiros para fins comerciais.</p>

          <h2>3. Finalidade</h2>
          <p>O objetivo da inscrição é garantir a sua vaga e permitir uma organização eficiente do seminário. Os dados ajudam-nos a gerir a logística do evento e a comunicar informações importantes aos participantes.</p>

          <h2>4. Consentimento</h2>
          <p>Ao marcar a caixa de aceite no formulário de inscrição, você consente com a recolha e o uso dos seus dados conforme descrito neste documento.</p>
        </div>
        <Link href="/seminario" className={styles.backButton}>
          Voltar à Inscrição
        </Link>
      </div>
    </div>
  );
}