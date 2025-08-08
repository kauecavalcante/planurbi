// Caminho: src/app/editais/001-2025-bolsistas-tutores/page.tsx

import Link from 'next/link';
import styles from './EditalDetalhe.module.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: "Edital 001/2025 - Seleção de Bolsistas e Tutores | Planurbi",
  description: "Detalhes do Processo Seletivo Simplificado para o projeto Planurbi Barra de São Miguel.",
};

export default function EditalDetalhePage() {
  const editalPdfUrl = "/edital-001-2025-bolsistas.pdf"; // Caminho para o PDF na pasta /public

  return (
    <>
      <Header /> 
      <div className={styles.pageWrapper}>
        <main className={styles.page}>
          <div className={styles.breadcrumb}>
            <Link href="/editais">Editais</Link> / <span>Edital Nº 001/2025</span>
          </div>

          <div className={styles.layout}>
            {/* Coluna Principal */}
            <div className={styles.mainContent}>
              <header className={styles.header}>
                <h1>Processo Seletivo Simplificado Nº 001/2025</h1>
                <p className={styles.subtitle}>
                  Este edital torna pública a seleção de bolsistas e tutores para atuação no projeto PlanUrbi Barra de São Miguel, visando a formação de cadastro de reserva e a mobilização de colaboradores para as atividades de campo.
                </p>
              </header>

              <div className={styles.actions}>
                <Link href="/selecao-campo" className={`${styles.button} ${styles.primary}`}>
                  <i className='bx bxs-edit-alt'></i> Inscreva-se
                </Link>
                <a href={editalPdfUrl} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.secondary}`}>
                  <i className='bx bx-show'></i> Ver Edital
                </a>
              </div>
            </div>

            {/* Coluna Lateral */}
            <aside className={styles.sidebar}>
              <div className={styles.infoBox}>
                <h3>Informações Gerais</h3>
                <ul>
                  <li>
                    <i className='bx bx-file'></i>
                    <div>
                      <strong>Tipo:</strong>
                      <span>Simplificado</span>
                    </div>
                  </li>
                  <li>
                    <i className='bx bx-time-five'></i>
                    <div>
                      <strong>Status:</strong>
                      <span className={styles.statusAndamento}>Em andamento</span>
                    </div>
                  </li>
                  <li>
                    <i className='bx bx-calendar-check'></i>
                    <div>
                      <strong>Inscrições:</strong>
                      <span>De 08/08/2025 [12:00h] à 22/08/2025 [17:00h]</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className={styles.infoBox}>
                <h3>Anexos</h3>
                <a href={editalPdfUrl} target="_blank" rel="noopener noreferrer" className={styles.anexoLink}>
                  <i className='bx bxs-file-pdf'></i>
                  <span>Edital Completo em PDF</span>
                </a>
              </div>
            </aside>
          </div>
        </main>
      </div>
      <Footer /> 
    </>
  );
}