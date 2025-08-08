// Ficheiro: src/app/admin/login/page.tsx (CORRIGIDO)

'use client';

import { useState, FormEvent, useEffect } from 'react'; // 1. Importa o useEffect
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import styles from './LoginPage.module.css';
import logoPlanurbi from '../../../../public/logo-planurbi-stagVerde.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useAuth();
  const router = useRouter();

  // 2. Move a lógica de redirecionamento para dentro de um useEffect
  useEffect(() => {
    // Se o utilizador já estiver logado, redireciona para o dashboard
    if (user) {
      router.push('/admin/dashboard');
    }
  }, [user, router]); // O efeito é executado sempre que 'user' ou 'router' mudam

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      // O redirecionamento após o login bem-sucedido já é tratado pelo useEffect acima
    } catch (err) {
      setError('Falha no login. Verifique o seu e-mail e senha.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // 3. Se houver um utilizador, retorna null para evitar renderizar o formulário desnecessariamente
  if (user) {
    return null; // ou um componente de loading
  }

  return (
    <div className={styles.page}>
      <main className={styles.loginBox}>
        <div className={styles.header}>
          <Image src={logoPlanurbi} alt="Logo Planurbi" width={180} />
          <h2>Acesso Restrito</h2>
          <p>Faça login para aceder ao painel de administrador.</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="seu.email@exemplo.com"
              disabled={loading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="Sua senha"
              disabled={loading}
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'A entrar...' : 'Entrar'}
          </button>
        </form>
      </main>
    </div>
  );
}