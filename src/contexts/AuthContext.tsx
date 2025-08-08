// Arquivo: src/contexts/AuthContext.tsx (CORRIGIDO)

'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
// 1. Importações do Firebase Auth atualizadas
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User, getAuth } from 'firebase/auth';
// 2. Importamos 'app' em vez de 'auth'
import { app } from '@/lib/firebaseClient'; 

// 3. Inicializamos o 'auth' aqui
const auth = getAuth(app);

// Define o tipo do que será compartilhado pelo contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  // 4. Adiciona a tipagem para email e password
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 5. Adiciona a tipagem aqui também
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};