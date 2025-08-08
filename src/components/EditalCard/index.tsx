// Caminho: src/components/EditalCard/index.tsx

import Link from 'next/link';
import styles from './EditalCard.module.css';

interface EditalCardProps {
  numero: string;
  titulo: string;
  tipo: string;
  status: 'em andamento' | 'concluído' | 'encerrado';
  link: string;
}

const statusClasses = {
  'em andamento': styles.statusAndamento,
  'concluído': styles.statusConcluido,
  'encerrado': styles.statusEncerrado,
};

export default function EditalCard({ numero, titulo, tipo, status, link }: EditalCardProps) {
  return (
    <Link href={link} className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.numeroEdital}>Processo Seletivo Simplificado {numero}</h2>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <div className={styles.metadata}>
          <div className={styles.metaItem}>
            <i className='bx bx-file'></i>
            <span><strong>Tipo:</strong> {tipo}</span>
          </div>
          <div className={styles.metaItem}>
            <i className='bx bx-time-five'></i>
            <span className={`${styles.status} ${statusClasses[status]}`}>
              <strong>Status:</strong> {status}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <span>Ver Detalhes</span>
        <i className='bx bx-right-arrow-alt'></i>
      </div>
    </Link>
  );
}