"use client";
import { useState, useEffect } from 'react';
import styles from './Relatorios.module.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Tipagem para os dados dos participantes
interface Participante {
  nome: string;
  telefone: string;
  email: string;
  created_at: string;
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export default function RelatoriosPage() {
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        const response = await fetch('/api/participantes');
        if (!response.ok) throw new Error('Falha ao carregar os dados.');
        const data = await response.json();
        setParticipantes(data);
      } catch (err) { 
        setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado.');
      } finally {
        setLoading(false);
      }
    };
    fetchParticipantes();
  }, []);

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Credenciados - PlanUrbi", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Total de Participantes: ${participantes.length}`, 14, 30);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 36);
    
    autoTable(doc, {
      startY: 45,
      head: [['Nº', 'Nome Completo', 'Telefone', 'Email', 'Data de Credenciamento']],
      body: participantes.map((p, index) => [index + 1, p.nome, p.telefone, p.email, p.created_at]),
      theme: 'striped',
      headStyles: { fillColor: [0, 54, 45] },
    });
    doc.save('relatorio-credenciados-planurbi.pdf');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentCard}>
        <h1 className={styles.title}>Relatório de Credenciados</h1>
        <p className={styles.description}>
          Aqui está a lista de todos os participantes credenciados.
        </p>
        {loading && <p>A carregar participantes...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && (
          <>
            <div className={styles.summaryCard}>
              <h3>Total de Inscritos</h3>
              <span>{participantes.length}</span>
            </div>

            <button onClick={gerarPDF} className={styles.pdfButton} disabled={participantes.length === 0}>
              <i className='bx bxs-file-pdf'></i>
              {participantes.length > 0 ? 'Gerar Relatório em PDF' : 'Nenhum participante'}
            </button>
            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th>Nome Completo</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Data de Credenciamento</th>
                  </tr>
                </thead>
                <tbody>
                  {participantes.map((p, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{p.nome}</td>
                      <td>{p.telefone}</td>
                      <td>{p.email}</td>
                      <td>{p.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}