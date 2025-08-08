// Arquivo: src/components/QuestionCard/index.tsx (ATUALIZADO)

import { Question } from "@/app/admin/(protegido)/dashboard/page";
import styles from "./QuestionCard.module.css";
import { Timestamp } from "firebase/firestore";

interface QuestionCardProps {
  question: Question;
  number: number;
  onUpdateStatus: (id: string, newStatus: Question["status"]) => void; // 1. Prop para a função de update
}

const formatDate = (timestamp: Timestamp) => {
  if (!timestamp) return "Data indisponível";
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export default function QuestionCard({
  question,
  number,
  onUpdateStatus,
}: QuestionCardProps) {
  const isAnswered = question.status === "respondida";

  return (
    // 2. Adiciona uma classe condicional se a pergunta foi respondida
    <div className={`${styles.card} ${isAnswered ? styles.answered : ""}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.questionNumber}>Pergunta #{number}</h3>
        <span className={styles.timestamp}>
          {formatDate(question.createdAt)}
        </span>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.questionText}>{question.question}</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.authorInfo}>
          <p className={styles.author}>
            <strong>Enviado por:</strong> {question.name}
          </p>
          <p className={styles.email}>
            <strong>Email:</strong> {question.email}
          </p>
        </div>
        {/* 3. Botão para alterar o status */}
        <button
          onClick={() =>
            onUpdateStatus(question.id, isAnswered ? "recebida" : "respondida")
          }
          className={styles.statusButton}
        >
          {isAnswered ? "Marcar como Não Respondida" : "Marcar como Respondida"}
        </button>
      </div>
    </div>
  );
}
