// src/components/QuestionForm/index.tsx
'use client';
import { useState, FormEvent } from 'react';
import styles from './QuestionForm.module.css';

type FormStatus = 'idle' | 'submitting' | 'success';

const QuestionForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!name || !email || !question) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setStatus('submitting');
    console.log('Enviando pergunta:', { name, email, question });
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');

    setTimeout(() => {
        setStatus('idle');
        setName('');
        setEmail('');
        setQuestion('');
    }, 4000);
  };

  if (status === 'success') {
    return (
        <div className={styles.successMessage}>
            <h3>Obrigado!</h3>
            <p>Sua pergunta foi enviada com sucesso e será avaliada pela nossa equipe.</p>
        </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.userInfoGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Seu Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
            placeholder="Digite seu nome completo"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Seu Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            placeholder="seu.email@exemplo.com"
          />
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="question" className={styles.label}>
          Sua Pergunta
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          rows={5}
          className={styles.textarea}
          placeholder="Escreva sua pergunta para os palestrantes aqui..."
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={styles.submitButton}
        >
          {status === 'submitting' ? 'Enviando...' : 'Enviar Pergunta'}
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;