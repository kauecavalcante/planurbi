import React from 'react';
import styles from './QuestionCard.module.css';
// Adicionando o ícone de "desfazer"
import { FaCheck, FaTrashAlt, FaUndo } from 'react-icons/fa';

export interface Question {
  id: string;
  name: string;
  email?: string; // Email agora faz parte da interface
  question: string;
  approved: boolean;
  timestamp: {
    toDate: () => Date;
  };
}

interface QuestionCardProps {
  question: Question;
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
  onUndo: (id: string) => void; // Nova prop para a ação de desfazer
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onApprove, onDelete, onUndo }) => {
  
  const formattedTime = question.timestamp?.toDate().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`${styles.card} ${question.approved ? styles.approved : ''}`}>
      <div className={styles.cardHeader}>
        {/* Agrupando nome e email */}
        <div>
            <h3 className={styles.userName}>{question.name}</h3>
            {question.email && <span className={styles.userEmail}>{question.email}</span>}
        </div>
      </div>
      
      <p className={styles.questionText}>
        {question.question}
      </p>

      <div className={styles.cardFooter}>
         <span className={styles.timestamp}>Enviada às {formattedTime}</span>
        <div className={styles.actions}>
          {question.approved ? (
            // Se estiver aprovada, mostra o botão de desfazer
            <button 
              className={`${styles.actionButton} ${styles.undoButton}`} 
              onClick={() => onUndo(question.id)}
              aria-label="Marcar como não respondida"
              title="Marcar como não respondida"
            >
              <FaUndo size={16} />
            </button>
          ) : (
            // Caso contrário, mostra o botão de aprovar
            <button 
              className={`${styles.actionButton} ${styles.approveButton}`} 
              onClick={() => onApprove(question.id)}
              aria-label="Aprovar pergunta"
              title="Aprovar Pergunta"
            >
              <FaCheck size={18} />
            </button>
          )}
          {/* O botão de deletar está sempre visível */}
          <button 
            className={`${styles.actionButton} ${styles.deleteButton}`} 
            onClick={() => onDelete(question.id)}
            aria-label="Deletar pergunta"
            title="Deletar Pergunta"
          >
            <FaTrashAlt size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;