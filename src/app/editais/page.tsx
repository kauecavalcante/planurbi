// Caminho: src/app/editais/page.tsx

import EditalCard from '@/components/EditalCard';
import styles from './Editais.module.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: "Editais | Planurbi",
  description: "Acompanhe os processos seletivos e editais do Planurbi.",
};

export default function EditaisPage() {
  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
        <main className={styles.page}>
          <div className={styles.header}>
            <h1>Editais e Processos Seletivos</h1>
            <p>Acompanhe os processos seletivos para bolsistas, tutores e outras oportunidades relacionadas aos projetos do Planurbi.</p>
          </div>

          <section className={styles.grid}>
            <EditalCard
              numero="001/2025"
              titulo="Seleção de bolsistas e tutores para o projeto Planurbi Barra de São Miguel"
              tipo="Simplificado"
              status="em andamento"
              link="/editais/001-2025-bolsistas-tutores"
            />
            
            

          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
