"use client";
import { useState, FormEvent, ChangeEvent } from 'react';
import styles from './Credenciamento.module.css';
import Image from 'next/image';
import { validaCPF } from '../utils/validators';

interface FormErrors {
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
}

export default function CredenciamentoPage() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (fieldName: keyof FormErrors) => {
    if (errors[fieldName]) {
      const newErrors = { ...errors };
      delete newErrors[fieldName];
      setErrors(newErrors);
    }
  };

  const handleNomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
    clearError('nome');
  };

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const maskedValue = value
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(maskedValue.slice(0, 14));
    clearError('cpf');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    clearError('email');
  };

  const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const maskedValue = value
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
    setTelefone(maskedValue.slice(0, 15));
    clearError('telefone');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!nome) newErrors.nome = "Nome completo é obrigatório.";
    if (!cpf) newErrors.cpf = "CPF é obrigatório.";
    else if (!validaCPF(cpf)) newErrors.cpf = "CPF inválido.";
    if (!email) newErrors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido.";
    if (!telefone) newErrors.telefone = "Telefone é obrigatório.";
    else if (telefone.replace(/\D/g, '').length < 10) newErrors.telefone = "Telefone inválido.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      setMessage("Por favor, corrija os erros antes de enviar.");
      setStatus('error');
      return;
    }
    
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/credenciamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, email, telefone }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Ocorreu um erro.');

      setStatus('success');
      setNome(''); setCpf(''); setEmail(''); setTelefone(''); setErrors({});
    } catch (error) { 
      setStatus('error');
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Ocorreu um erro inesperado.');
      }
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.successMessage}>
          <i className='bx bxs-check-circle'></i>
          <h2>Credenciado com Sucesso!</h2>
          <p>Obrigado por se juntar a nós.</p>
          <button onClick={() => setStatus('idle')} className={styles.formButton}>
            Novo Credenciamento
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formCard}>
        <div className={styles.brandingColumn}>
          <div className={styles.logoWrapper}>
            <Image src="/logo-planurbi.png" alt="Logo PlanUrbi" width={180} height={55} />
          </div>
          <h2>Plataforma de Planejamento Urbano</h2>
          <p>Faça parte da construção de uma cidade mais inteligente e sustentável.</p>
        </div>
        <div className={styles.formColumn}>
          <div className={styles.header}>
            <h3>Credenciamento PPUrb</h3>
            <p>Preencha os campos para participar.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <i className='bx bxs-user'></i>
                <input type="text" id="nome" value={nome} onChange={handleNomeChange} placeholder="Nome Completo" required className={errors.nome ? styles.inputError : ''} />
              </div>
              {errors.nome && <span className={styles.fieldErrorMessage}>{errors.nome}</span>}
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <i className='bx bxs-id-card'></i>
                <input type="text" id="cpf" value={cpf} onChange={handleCpfChange} placeholder="CPF" required className={errors.cpf ? styles.inputError : ''} />
              </div>
              {errors.cpf && <span className={styles.fieldErrorMessage}>{errors.cpf}</span>}
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <i className='bx bxs-envelope'></i>
                <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Email" required className={errors.email ? styles.inputError : ''} />
              </div>
              {errors.email && <span className={styles.fieldErrorMessage}>{errors.email}</span>}
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <i className='bx bxs-phone'></i>
                <input type="tel" id="telefone" value={telefone} onChange={handleTelefoneChange} placeholder="Telefone" required className={errors.telefone ? styles.inputError : ''} />
              </div>
              {errors.telefone && <span className={styles.fieldErrorMessage}>{errors.telefone}</span>}
            </div>
            
            <button type="submit" disabled={status === 'loading'} className={styles.formButton}>
              {status === 'loading' ? 'Enviando...' : 'Realizar Credenciamento'}
            </button>

            {status === 'error' && message && <p className={styles.formErrorMessage}>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}