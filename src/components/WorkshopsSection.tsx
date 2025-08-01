"use client";
import { useEffect, useState } from 'react';
import styles from './WorkshopsSection.module.css';

interface Oficina {
  dataCompleta: string;
  data: string;
  titulo: string;
  local: string;
  bairro: string;
  horario: string;
  status: {
    text: string;
    className: string;
  } | null;
}

const oficinasData = [
  {
    dataCompleta: "2025-08-19T16:00:00",
    data: "19/08",
    titulo: "Oficina 1",
    local: "CMEI Leonor Wenderborg Iafelice",
    bairro: "Palateia",
    horario: "16h",
  },
  {
    dataCompleta: "2025-08-20T18:00:00",
    data: "20/08",
    titulo: "Oficina 2",
    local: "Escola de Ensino Fundamental Marinalva G Ferreira da Silva",
    bairro: "Barra Mar",
    horario: "18h",
  },
  {
    dataCompleta: "2025-08-21T18:00:00",
    data: "21/08",
    titulo: "Oficina 03",
    local: "Escola Municipal de Educação Básica Francelina Maria da Conceição Lira",
    bairro: "Alto da Barra",
    horario: "18h",
  },
  {
    dataCompleta: "2025-08-22T16:00:00",
    data: "22/08",
    titulo: "Oficina 4",
    local: "Centro Municipal de Educação Infantil Leonita Vieira Cavalcante Mello",
    bairro: "Centro",
    horario: "16h",
  },
];

const getOficinaStatus = (oficinaDate: Date, proximaOficinaDate: Date | null) => {
  const agora = new Date();
  if (oficinaDate < agora) {
    return { text: 'Encerrada', className: styles.encerrada };
  }
  if (proximaOficinaDate && oficinaDate.getTime() === proximaOficinaDate.getTime()) {
    return { text: 'Próxima', className: styles.proxima };
  }
  return null;
};

export function WorkshopsSection() {

  const [oficinasComStatus, setOficinasComStatus] = useState<Oficina[]>([]);

  useEffect(() => {
    const agora = new Date();
    const oficinasFuturas = oficinasData
      .map(o => new Date(o.dataCompleta))
      .filter(d => d > agora)
      .sort((a, b) => a.getTime() - b.getTime());

    const proximaOficinaDate = oficinasFuturas.length > 0 ? oficinasFuturas[0] : null;

    const oficinasProcessadas = oficinasData.map(oficina => {
      const status = getOficinaStatus(new Date(oficina.dataCompleta), proximaOficinaDate);
      return { ...oficina, status };
    });

    setOficinasComStatus(oficinasProcessadas);
  }, []);

  return (
    <section id="workshops" className={styles.workshopsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Agenda de Oficinas</h2>
        </div>

        <div className={styles.workshopsGrid}>
          {oficinasComStatus.map((oficina, index) => (
            <div key={index} className={`${styles.workshopCard} ${oficina.status?.className || ''}`}>
              {oficina.status && (
                <div className={`${styles.statusTag} ${oficina.status.className}`}>
                  {oficina.status.text}
                </div>
              )}
              <div className={styles.cardHeader}>
                <span className={styles.date}>{oficina.data}</span>
                <h3 className={styles.cardTitle}>{oficina.titulo}</h3>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.detailItem}>
                  <i className='bx bxs-map-pin'></i>
                  <span><strong>Local:</strong> {oficina.local}</span>
                </div>
                <div className={styles.detailItem}>
                  <i className='bx bxs-map'></i>
                  <span><strong>Bairro:</strong> {oficina.bairro}</span>
                </div>
                <div className={styles.detailItem}>
                  <i className='bx bxs-time-five'></i>
                  <span><strong>Horário:</strong> {oficina.horario}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}