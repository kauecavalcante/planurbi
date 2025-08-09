'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import withAuth from '@/components/auth/withAuth';
import styles from './DetalhesBolsista.module.css';
// 1. Importar `useRouter` e `useParams`
import { useRouter, useParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

// A tipagem continua a mesma
interface Bolsista {
  id: string;
  nome: string;
  email: string;
  rg: string;
  data_nascimento: string;
  instituicao: string;
  serie_ano: string;
  tipo_instituicao: string;
  endereco: {
    rua: string;
    numero: string;
    complemento?: string;
    cep: string;
    cidade: string;
    estado: string;
  };
  created_at: Timestamp;
}

// 2. Remover `params` da assinatura da função
function DetalhesBolsistaPage() {
  const [bolsista, setBolsista] = useState<Bolsista | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // 3. Usar o hook `useParams` para obter o ID
  const params = useParams();
  const id = params.id as string; // O ID virá daqui

  useEffect(() => {
    if (id) {
      const getBolsista = async () => {
        const docRef = doc(db, 'selecao_campo', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBolsista({ id: docSnap.id, ...docSnap.data() } as Bolsista);
        } else {
          console.error("Nenhum documento encontrado com este ID!");
        }
        setLoading(false);
      };

      getBolsista();
    }
  }, [id]);

  if (loading) {
    return <p className={styles.loading}>A carregar dados do candidato...</p>;
  }

  if (!bolsista) {
    return <p className={styles.loading}>Candidato não encontrado.</p>;
  }

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        <FaArrowLeft /> Voltar para a lista
      </button>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>{bolsista.nome}</h2>
          <p>Inscrição realizada em: {bolsista.created_at.toDate().toLocaleString('pt-BR')}</p>
        </div>

        <div className={styles.cardBody}>
          {/* Secção de Dados Pessoais */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Dados Pessoais</h3>
            <div className={styles.grid}>
              <div className={styles.detailItem}><span>Email:</span> {bolsista.email}</div>
              <div className={styles.detailItem}><span>RG:</span> {bolsista.rg}</div>
              <div className={styles.detailItem}><span>Data de Nascimento:</span> {bolsista.data_nascimento}</div>
            </div>
          </div>

          {/* Secção de Endereço */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Endereço</h3>
            <div className={styles.grid}>
              <div className={styles.detailItem}><span>Rua:</span> {bolsista.endereco.rua}, {bolsista.endereco.numero}</div>
              <div className={styles.detailItem}><span>Cidade:</span> {bolsista.endereco.cidade}</div>
              <div className={styles.detailItem}><span>Estado:</span> {bolsista.endereco.estado}</div>
              <div className={styles.detailItem}><span>CEP:</span> {bolsista.endereco.cep}</div>
              {bolsista.endereco.complemento && <div className={styles.detailItem}><span>Complemento:</span> {bolsista.endereco.complemento}</div>}
            </div>
          </div>

          {/* Secção de Formação Académica */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Formação Académica</h3>
            <div className={styles.grid}>
              <div className={styles.detailItem}><span>Tipo:</span> {bolsista.tipo_instituicao}</div>
              <div className={styles.detailItem}><span>Instituição:</span> {bolsista.instituicao}</div>
              <div className={styles.detailItem}><span>Série/Ano:</span> {bolsista.serie_ano}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(DetalhesBolsistaPage);