"use client";
import { useState, useEffect } from 'react';
import styles from './RelatorioSeminario.module.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

export default function RelatorioSeminarioPage() {
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
       
        const response = await fetch('/api/seminario-participantes');
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
    doc.text("Relatório de Inscrições - I Seminário PlanUrbi", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Total de Inscritos: ${participantes.length}`, 14, 30);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 36);
    
    autoTable(doc, {
      startY: 45,
      head: [['Nº', 'Nome Completo', 'Telefone', 'Email', 'Data de Inscrição']],
      body: participantes.map((p, index) => [index + 1, p.nome, p.telefone, p.email, p.created_at]),
      theme: 'striped',
      headStyles: { fillColor: [0, 54, 45] },
    });
    doc.save('relatorio-inscricoes-seminario.pdf');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentCard}>
        <h1 className={styles.title}>Relatório de Inscrições do Seminário</h1>
        <p className={styles.description}>
          Aqui está a lista de todos os participantes inscritos no I Seminário PlanUrbi.
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
              {participantes.length > 0 ? 'Gerar Relatório em PDF' : 'Nenhum participante inscrito'}
            </button>
            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th>Nome Completo</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Data de Inscrição</th>
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