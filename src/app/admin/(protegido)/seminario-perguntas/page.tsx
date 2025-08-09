'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, query, onSnapshot, orderBy, Timestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import withAuth from '@/components/auth/withAuth';
import QuestionCard from '@/components/QuestionCard';
// A única mudança é aqui, importando o novo arquivo de estilo
import styles from './Perguntas.module.css';

// A tipagem dos dados que vêm do Firebase
export interface FirebaseQuestion {
  id: string;
  name: string;
  email: string;
  question: string;
  status: 'recebida' | 'respondida';
  createdAt: Timestamp;
}

type FilterStatus = 'todas' | 'recebida' | 'respondida';

function SeminarioPerguntasPage() {
  const [questions, setQuestions] = useState<FirebaseQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('recebida');

  useEffect(() => {
    const q = query(collection(db, 'perguntas-seminario'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const questionsData: FirebaseQuestion[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        questionsData.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          question: data.question,
          status: data.status || 'recebida',
          createdAt: data.createdAt,
        });
      });
      setQuestions(questionsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredQuestions = useMemo(() => {
    if (filter === 'todas') {
      return questions;
    }
    return questions.filter((q) => q.status === filter);
  }, [questions, filter]);

  const handleUpdateStatus = async (id: string, newStatus: FirebaseQuestion['status']) => {
    const questionRef = doc(db, 'perguntas-seminario', id);
    try {
      await updateDoc(questionRef, { status: newStatus });
    } catch (error) {
      console.error("Erro ao atualizar status: ", error);
      alert('Ocorreu um erro ao atualizar o status da pergunta.');
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta pergunta? Esta ação não pode ser desfeita.")) {
      const questionRef = doc(db, 'perguntas-seminario', id);
      try {
        await deleteDoc(questionRef);
      } catch (error) {
        console.error("Erro ao excluir pergunta: ", error);
        alert("Ocorreu um erro ao excluir a pergunta.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.title}>Perguntas do Seminário</h1>
        <p className={styles.subtitle}>
          {filteredQuestions.length} perguntas para o filtro: <span className={styles.filterName}>{filter}</span>
        </p>
      </div>

      <div className={styles.filterContainer}>
        <button onClick={() => setFilter('recebida')} className={`${styles.filterButton} ${filter === 'recebida' ? styles.active : ''}`}>
          Não Respondidas
        </button>
        <button onClick={() => setFilter('respondida')} className={`${styles.filterButton} ${filter === 'respondida' ? styles.active : ''}`}>
          Respondidas
        </button>
        <button onClick={() => setFilter('todas')} className={`${styles.filterButton} ${filter === 'todas' ? styles.active : ''}`}>
          Todas
        </button>
      </div>

      {loading ? (
        <p className={styles.loadingText}>Carregando perguntas...</p>
      ) : (
        <div className={styles.questionsGrid}>
          {filteredQuestions.map((q) => (
            <QuestionCard 
              key={q.id} 
              question={{
                id: q.id,
                name: q.name,
                email: q.email,
                question: q.question,
                approved: q.status === 'respondida',
                timestamp: q.createdAt,
              }}
              onApprove={() => handleUpdateStatus(q.id, 'respondida')}
              onDelete={() => handleDeleteQuestion(q.id)}
              onUndo={() => handleUpdateStatus(q.id, 'recebida')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// O HOC withAuth continua protegendo a rota
export default withAuth(SeminarioPerguntasPage);