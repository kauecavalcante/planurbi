// Arquivo: src/app/admin/dashboard/page.tsx (ATUALIZADO)

'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, query, onSnapshot, orderBy, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import withAuth from '@/components/auth/withAuth';
import QuestionCard from '@/components/QuestionCard';
import styles from './Dashboard.module.css';

// Tipagem para a pergunta
export interface Question {
  id: string;
  name: string;
  email: string;
  question: string;
  status: 'recebida' | 'respondida'; // Status possíveis
  createdAt: Timestamp;
}

type FilterStatus = 'todas' | 'recebida' | 'respondida';

function AdminDashboard() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('recebida'); // 1. Começa mostrando as não respondidas

  useEffect(() => {
    const q = query(collection(db, 'perguntas-seminario'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const questionsData: Question[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        questionsData.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          question: data.question,
          status: data.status || 'recebida', // Garante um status padrão
          createdAt: data.createdAt,
        });
      });
      setQuestions(questionsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Filtra as perguntas com base no estado do filtro
  const filteredQuestions = useMemo(() => {
    if (filter === 'todas') {
      return questions;
    }
    return questions.filter((q) => q.status === filter);
  }, [questions, filter]);

  // 3. Função para atualizar o status no Firebase
  const handleUpdateStatus = async (id: string, newStatus: Question['status']) => {
    const questionRef = doc(db, 'perguntas-seminario', id);
    try {
      await updateDoc(questionRef, {
        status: newStatus
      });
    } catch (error) {
      console.error("Erro ao atualizar status: ", error);
    }
  };

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.title}>Perguntas do Seminário</h1>
        <p className={styles.subtitle}>
          {filteredQuestions.length} perguntas correspondentes ao filtro selecionado.
        </p>
      </div>

      {/* 4. Botões de filtro */}
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
        <p>Carregando perguntas...</p>
      ) : (
        <div className={styles.questionsGrid}>
          {filteredQuestions.map((q, index) => (
            <QuestionCard 
              key={q.id} 
              question={q} 
              number={questions.length - index} 
              onUpdateStatus={handleUpdateStatus} // Passa a função para o card
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(AdminDashboard);