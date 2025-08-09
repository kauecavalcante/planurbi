'use client';

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, Timestamp, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import withAuth from '@/components/auth/withAuth';
import styles from './Bolsistas.module.css';
import { FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation'; // Importa o useRouter

// A tipagem continua a mesma, completa e correta
export interface Bolsista {
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

function BolsistasPage() {
  const [bolsistas, setBolsistas] = useState<Bolsista[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Inicializa o router

  useEffect(() => {
    const q = query(collection(db, 'selecao_campo'), orderBy('created_at', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bolsistasData: Bolsista[] = [];
      querySnapshot.forEach((doc) => {
        bolsistasData.push({
          id: doc.id,
          ...doc.data()
        } as Bolsista);
      });
      setBolsistas(bolsistasData);
      setLoading(false);
    }, (error) => {
        console.error("ERRO AO BUSCAR DADOS DO FIREBASE: ", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  // Função para navegar para a página de detalhes
  const handleRowClick = (id: string) => {
    router.push(`/admin/bolsistas/${id}`);
  };
  
  // Função de exportação atualizada para incluir a data e hora
  const handleExportToExcel = () => {
    const dataToExport = bolsistas.map(b => ({
      'Nome Completo': b.nome,
      'Email': b.email,
      'RG': b.rg,
      'Data de Nascimento': b.data_nascimento,
      'Tipo de Instituição': b.tipo_instituicao,
      'Nome da Instituição': b.instituicao,
      'Série/Ano': b.serie_ano,
      'Rua': b.endereco.rua,
      'Número': b.endereco.numero,
      'Complemento': b.endereco.complemento || '',
      'CEP': b.endereco.cep,
      'Cidade': b.endereco.cidade,
      'Estado': b.endereco.estado,
      'Data e Hora da Inscrição': b.created_at.toDate().toLocaleString('pt-BR'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidatos Bolsistas');
    
    worksheet['!cols'] = [
        { wch: 30 }, { wch: 30 }, { wch: 15 }, { wch: 20 }, { wch: 20 },
        { wch: 30 }, { wch: 15 }, { wch: 30 }, { wch: 10 }, { wch: 20 },
        { wch: 12 }, { wch: 25 }, { wch: 10 }, { wch: 20 }
    ];

    XLSX.writeFile(workbook, 'inscricoes_bolsistas_planurbi.xlsx');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Inscrições de Bolsistas</h1>
          <p className={styles.subtitle}>
            {bolsistas.length} candidatos inscritos até o momento.
          </p>
        </div>
        <button className={styles.exportButton} onClick={handleExportToExcel} disabled={bolsistas.length === 0}>
          <FaFileExcel />
          Baixar Planilha
        </button>
      </div>

      {loading ? (
        <p>Carregando inscrições...</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome Completo</th>
                <th>Email</th>
                <th>Instituição</th>
                <th>Série/Ano</th>
                <th>Data de Inscrição</th>
              </tr>
            </thead>
            <tbody>
              {bolsistas.length > 0 ? (
                bolsistas.map((bolsista) => (
                  // Adiciona o evento de clique na linha
                  <tr key={bolsista.id} onClick={() => handleRowClick(bolsista.id)} className={styles.clickableRow}>
                    <td>{bolsista.nome}</td>
                    <td>{bolsista.email}</td>
                    <td>{bolsista.instituicao}</td>
                    <td>{bolsista.serie_ano}</td>
                    {/* Mostra data e hora */}
                    <td>{bolsista.created_at.toDate().toLocaleString('pt-BR')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                    Nenhuma inscrição encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default withAuth(BolsistasPage);