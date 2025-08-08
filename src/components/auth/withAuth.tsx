// Arquivo: src/components/auth/withAuth.tsx (CORRIGIDO)

'use client';

import { useEffect, ComponentType } from 'react'; // 1. Importa o ComponentType
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// 2. Adiciona a tipagem para o componente que será "envolvido"
const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  
  // 3. O nome do componente retornado deve começar com letra maiúscula
  const Wrapper = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Se não estiver carregando e não houver usuário, redireciona para o login
      if (!loading && !user) {
        router.replace('/admin/login');
      }
    }, [user, loading, router]);

    // Se estiver carregando ou se não houver usuário, mostra uma mensagem de carregamento
    if (loading || !user) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontFamily: 'var(--font-body)', // Usa a fonte do projeto
          color: 'var(--cor-marrom)' // Usa a cor do projeto
        }}>
          <p>Verificando autenticação...</p>
        </div>
      );
    }

    // Se o usuário estiver logado, renderiza o componente da página com suas props
    return <WrappedComponent {...props} />;
  };

  // Adiciona um nome de exibição para facilitar a depuração no React DevTools
  Wrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return Wrapper;
};

export default withAuth;