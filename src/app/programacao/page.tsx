"use client";

import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ModernTimeline, TimelineEvent } from '@/components/ui/ModernTimeline';
import styles from './Programacao.module.css';
import { useState, useEffect } from 'react';

// Dados dos palestrantes para o carrossel
const speakers = [
  {
    name: "Ricardo Antônio de Barros Wanderley",
    handle: "Abertura do Seminário",
    avatar: "/palestrantes/ricardo.jpeg",
    bio: "Advogado, mestrando em Administração Pública (FGV) e especialista em Direito Constitucional (UFAL). Ex-presidente da Fundepes e atual presidente da Fepesa."
  },
  {
    name: "Dra. Melissa Mota Alcides",
    handle: "Planejamento Urbano Inteligente",
    avatar: "/palestrantes/melissa.jpg",
    bio: "Coordenadora Técnica do PlanUrbi. Doutora em Cidades (FAU/UFAL), com experiência em Planos Diretores e desenvolvimento territorial."
  },
  {
    name: "Dra. Raquel da Silva Cabral",
    handle: "Cidades Inteligentes",
    avatar: "/palestrantes/raquel.jpeg",
    bio: "Coordenadora de Tecnologia do PlanUrbi. Cientista da Computação com pós-doutorado pela UNICAMP, especialista em inovação na gestão pública."
  },
  {
    name: "Ms. Rute Ferreira Barbosa",
    handle: "Bancos de dados e georreferenciamento",
    avatar: "/palestrantes/rute.jpeg",
    bio: "Arqueóloga do IPHAN/AL e doutoranda em Arqueologia (UFPE). Especialista em gestão de bens culturais e aplicação de bancos de dados."
  },
  {
    name: "Andressa Targino Carvalho",
    handle: "Reflexos Tributários do Planejamento",
    avatar: "/palestrantes/andressa.jpeg",
    bio: "Advogada especialista em Direito Tributário (IBET), com MBA em Gestão Empresarial (FGV). Vice-Presidente da ATRIAL."
  },
  {
    name: "Ms. Karoline Mafra Sarmento Beserra",
    handle: "Regularização de Núcleos Urbanos",
    avatar: "/palestrantes/karol.jpeg",
    bio: "Doutoranda (Universidade do Minho, PT) e mestra em Direito (UFAL). Professora, mediadora e Registradora Civil e Tabeliã de Notas."
  },
  {
    name: "Paloma Tojal",
    handle: "Planejamento Urbano e Municipal",
    avatar: "/palestrantes/paloma.webp",
    bio: "Advogada e especialista em Gestão Pública. Atualmente é Controladora Geral do Município de Penedo e membro do Conselho Gestor do Plano Diretor."
  },
  {
    name: "Dr. Mário Beznos",
    handle: "Planejamento regional e urbano",
    avatar: "/palestrantes/mario.jpeg",
    bio: "Arquiteto e urbanista com mestrado pela Universidade de Edinburgh. Pesquisador da FIPE com mais de 50 anos de experiência em políticas públicas."
  }
];

type ScheduleItem = Omit<TimelineEvent, 'status'>;

const programSchedule: ScheduleItem[] = [
  { title: "Abertura", speaker: "Ricardo Antônio de Barros Wanderley", image: "/palestrantes/ricardo.jpeg", category: 'Abertura', startTime: "14:00", endTime: "14:15" },
  { title: "Planejamento Urbano Inteligente (PlanUrbi)", speaker: "Dra. Melissa Mota Alcides", image: "/palestrantes/melissa.jpg", category: 'Comunicação', startTime: "14:15", endTime: "14:30" },
  { title: "Cidades Inteligentes: O Futuro do Planejamento Urbano", speaker: "Dra. Raquel da Silva Cabral", image: "/palestrantes/raquel.jpeg", category: 'Comunicação', startTime: "14:30", endTime: "14:45" },
  { title: "Bancos de dados e mapeamento georreferenciado", speaker: "Ms. Rute Ferreira Barbosa", image: "/palestrantes/rute.jpeg", category: 'Comunicação', startTime: "14:45", endTime: "15:00" },
  { title: "Debate Bloco 1", category: 'Debate', startTime: "15:00", endTime: "15:30" },
  { title: "Coffee Break", category: 'Coffee Break', startTime: "15:30", endTime: "16:00" },
  { title: "Reflexos Tributários do Planejamento Urbano", speaker: "Andressa Targino Carvalho", image: "/palestrantes/andressa.jpeg", category: 'Comunicação', startTime: "16:00", endTime: "16:15" },
  { title: "Gestão Pública: Desafios e Possibilidades na Regularização", speaker: "Ms. Karoline Mafra Sarmento Beserra", image: "/palestrantes/karol.jpeg", category: 'Comunicação', startTime: "16:15", endTime: "16:30" },
  { title: "Planejamento Urbano e Municipal: Uma parceria essencial", speaker: "Paloma Tojal", image: "/palestrantes/paloma.webp", category: 'Comunicação', startTime: "16:30", endTime: "16:45" },
  { title: "Debate Bloco 2", category: 'Debate', startTime: "16:45", endTime: "17:00" },
  { title: "Planejamento regional e urbano: desafios e perspectivas", speaker: "Dr. Mário Beznos", image: "/palestrantes/mario.jpeg", category: 'Palestra Magna', startTime: "17:00", endTime: "17:30" },
  { title: "Debate Bloco 3", category: 'Debate', startTime: "17:30", endTime: "18:00" },
  { title: "Confraternização com Show da Banda Caetech", speaker: "Local: Toca do Calango, Jaraguá", category: 'Confraternização', startTime: "19:00", endTime: "22:00" }
];

const SpeakerCard = ({ name, handle, avatar, bio }: { name: string, handle: string, avatar: string, bio: string }) => (
  <div className={styles.speakerCard}>
    <div className={styles.speakerCardHeader}>
      <div className={styles.speakerAvatar}>
        <Image src={avatar} alt={name} width={60} height={60} />
      </div>
      <div className={styles.speakerInfo}>
        <h3 className={styles.speakerName}>{name}</h3>
        <p className={styles.speakerHandle}>{handle}</p>
      </div>
    </div>
    <p className={styles.speakerBio}>{bio}</p>
  </div>
);

const getEventStatus = (startTime: string, endTime: string): "completed" | "current" | "upcoming" => {
  const now = new Date(); 
  const eventDate = "2025-08-13T";
  const startDateTime = new Date(eventDate + startTime + ":00");
  const endDateTime = new Date(eventDate + endTime + ":00");

  if (now > endDateTime) return "completed";
  if (now >= startDateTime && now <= endDateTime) return "current";
  return "upcoming";
};

export default function SeminarioPage() {
  const [liveProgram, setLiveProgram] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    const updateProgramStatus = () => {
      const updatedProgram = programSchedule.map(event => ({
        ...event,
        status: getEventStatus(event.startTime, event.endTime),
      }));
      setLiveProgram(updatedProgram);
    };

    updateProgramStatus();
    const interval = setInterval(updateProgramStatus, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>I Seminário PlanUrbi – Planejamento Territorial: suas implicações e correspondências</h1>
            <p className={styles.heroSubtitle}>
              Um espaço de diálogo técnico e interdisciplinar para debater o planejamento urbano como instrumento estratégico para cidades mais inteligentes, sustentáveis e inclusivas.
            </p>
            <div className={styles.eventDetails}>
              <div className={styles.detailItem}>
                <i className='bx bxs-calendar'></i>
                <span>13 de Agosto de 2025</span>
              </div>
              <div className={styles.detailItem}>
                <i className='bx bxs-time-five'></i>
                <span>14h às 18h</span>
              </div>
              <div className={styles.detailItem}>
                <i className='bx bxs-map'></i>
                <span>Auditório do CREA/AL</span>
              </div>
            </div>
            <a href="/seminario" className={styles.heroButton}>
              Inscreva-se Gratuitamente
              <i className='bx bx-right-arrow-alt'></i>
            </a>
          </div>
        </section>

        <section className={styles.speakersSection}>
           <h2 className={styles.sectionTitle}>Nossos Palestrantes</h2>
           <div className={styles.marqueeContainer}>
            <div className={styles.marquee}>
              <div className={styles.marqueeGroup}>
                {speakers.map((speaker, index) => (
                  <SpeakerCard key={index} {...speaker} />
                ))}
              </div>
              <div aria-hidden="true" className={styles.marqueeGroup}>
                {speakers.map((speaker, index) => (
                  <SpeakerCard key={`clone-${index}`} {...speaker} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.programSection}>
          <h2 className={styles.sectionTitle}>Programação Completa</h2>
          <ModernTimeline items={liveProgram} />
        </section>

      </main>
      <Footer />
    </>
  );
}