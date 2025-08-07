// src/app/seminario/perguntas/page.tsx
import QuestionForm from "@/components/QuestionForm";
import styles from './Perguntas.module.css';

export const metadata = {
    title: "Envie sua Pergunta | Seminário Planurbi",
    description: "Participe do seminário enviando sua pergunta para a nossa equipe.",
};

export default function PerguntasPage() {
    return (
        <div className={styles.page}>
        <main className={styles.contentWrapper}>
            <div className={styles.header}>
            <h1>Envie sua Pergunta</h1>
            <p>Sua participação é muito importante. Preencha o formulário abaixo e sua dúvida poderá ser respondida ao vivo.</p>
            </div>

            <section className={styles.formSection}>
            <QuestionForm />
            </section>
        </main>
        </div>
    );
}