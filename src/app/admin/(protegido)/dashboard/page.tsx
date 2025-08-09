'use client';

import Link from 'next/link';
import withAuth from '@/components/auth/withAuth';
import styles from './Dashboard.module.css';
import { FaQuestionCircle, FaUsers } from 'react-icons/fa';

function DashboardHub() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Painel de Controle</h1>
      <p className={styles.subtitle}>
        Selecione uma área para gerenciar.
      </p>

      <div className={styles.grid}>
        {/* Card para Perguntas do Seminário */}
        <Link href="/admin/seminario-perguntas" className={styles.card}>
          <div className={styles.cardIconWrapper}>
            <FaQuestionCircle className={styles.cardIcon} />
          </div>
          <h2 className={styles.cardTitle}>Perguntas do Seminário</h2>
          <p className={styles.cardDescription}>
            Modere, aprove e gerencie as perguntas enviadas durante o seminário em tempo real.
          </p>
        </Link>

        {/* Card para Gerenciar Bolsistas (AGORA ATIVO) */}
        <Link href="/admin/bolsistas" className={styles.card}>
           <div className={styles.cardIconWrapper}>
            <FaUsers className={styles.cardIcon} />
          </div>
          <h2 className={styles.cardTitle}>Gerenciar Bolsistas</h2>
          <p className={styles.cardDescription}>
            Visualize e gerencie as inscrições dos candidatos a bolsistas.
          </p>
        </Link>
        
        {/* Futuros cards podem ser adicionados aqui */}

      </div>
    </div>
  );
}

export default withAuth(DashboardHub);