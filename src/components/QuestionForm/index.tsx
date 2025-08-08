'use client';
import { useState, FormEvent } from 'react';
import styles from './QuestionForm.module.css';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type FormError = string | null;

const QuestionForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<FormError>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('submitting');
    setError(null);

    try {
      const response = await fetch('/api/perguntas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao enviar pergunta.');
      }
      
      setStatus('success');
     
      setName('');
      setEmail('');
      setQuestion('');

    } catch (err) { // A CORREÇÃO ESTÁ AQUI
      setStatus('error');
      // Verificamos se o erro é uma instância de Error para acessar a propriedade 'message' com segurança
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido. Tente novamente mais tarde.');
      }
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successMessage}>
        <h3>Obrigado!</h3>
        <p>Sua pergunta foi enviada com sucesso e será avaliada pela nossa equipe.</p>
        <button onClick={() => setStatus('idle')} className={styles.backButton}>
            Enviar outra pergunta
        </button>
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
            placeholder="Digite seu nome e sobrenome"
            disabled={status === 'submitting'}
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
            disabled={status === 'submitting'}
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
          disabled={status === 'submitting'}
        />
      </div>

      {status === 'error' && (
        <p className={styles.errorMessage}>{error}</p>
      )}

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