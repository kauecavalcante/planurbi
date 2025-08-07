"use client";

import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ModernTimeline, TimelineEvent, Talk } from '@/components/ui/ModernTimeline';
import styles from './Programacao.module.css';
import { useState, useEffect } from 'react';

// Dados dos palestrantes com biografia completa
const speakers = [
  {
    name: "Ricardo Antônio de Barros Wanderley",
    title: "Diretor-Presidente da FEPESA e Coordenador Geral do PlanUrbi",
    avatar: "/palestrantes/ricardo.jpeg",
    bio: "Advogado, mestrando em Administração Pública pela Escola Brasileira de Administração Pública e de Empresas da Fundação Getúlio Vargas e especialista em Direito Constitucional pela Universidade Federal de Alagoas, com vasta experiência em Direito do Trabalho, Direito Administrativo e Direito Eleitoral. Assumiu os cargos de Procurador Geral, Secretário de Governo, Diretor Presidente da Agência Reguladora de Serviços Delegados e Interventor na Concessão Pública de Transporte Público Urbano do Município de Maceió. Foi presidente da Fundação Universitária de Desenvolvimento de Extensão e Pesquisa (Fundepes) no quadriênio 2021/2024. Atualmente preside a Fundação de Apoio ao Ensino, Extensão e Pesquisa de Alagoas."
  },
  {
    name: "Melissa Mota Alcides",
    title: "Coordenadora Técnica Geral do Projeto PlanUrbi",
    avatar: "/palestrantes/melissa.jpg",
    bio: "Graduação em Arquitetura e Urbanismo, mestrado em Desenvolvimento e Meio Ambiente pelo PRODEMA e doutorado em Cidades pelo Programa de Pós-Graduação da Faculdade de Arquitetura e Urbanismo – FAU/UFAL. Atuou na docência superior em programas de Graduação e Pós-graduação e em pesquisas científicas voltadas prioritariamente para as áreas de urbanismo, planejamento territorial, patrimônio cultural e patrimônio socioambiental. Possui experiência em planejamento territorial e urbano, tendo atuado em processos de elaboração de Planos Diretores municipais e Planos de Desenvolvimento Integrado do Turismo Sustentável (PDITS)."
  },
  {
    name: "Raquel da Silva Cabral",
    title: "Coordenadora de Tecnologia do Projeto PlanUrbi",
    avatar: "/palestrantes/raquel.jpeg",
    bio: "Cientista da Computação, com pós-doutorado pela UNICAMP e doutorado pela Universidade Federal de Minas Gerais (UFMG). Possui ampla experiência no desenvolvimento de tecnologias baseadas em inteligência computacional, com atuação voltada à inovação na gestão pública e na área da saúde. Atualmente coordena a frente tecnológica do Programa de Planejamento Urbano Inteligente (PlanUrbi), liderando o desenvolvimento de ferramentas digitais e dashboards para diagnóstico territorial participativo."
  },
  {
    name: "Rute Ferreira Barbosa",
    title: "Arqueóloga do IPHAN/AL",
    avatar: "/palestrantes/rute.jpeg",
    bio: "Doutoranda em Arqueologia pela UFPE, Rute Ferreira Barbosa é arqueóloga do IPHAN/AL. Atua na gestão de bens culturais, com ênfase na criação e aplicação de bancos de dados para organização, monitoramento e análise de informações. Desenvolve projetos voltados à espacialização de dados como ferramenta de apoio à gestão territorial e à tomada de decisão. Possui experiência em iniciativas que articulam patrimônio cultural, planejamento territorial e turismo sustentável, com produção científica e institucional voltada à integração do patrimônio aos territórios e às comunidades locais. Também possui experiência em planejamento territorial, tendo participado da elaboração de Planos Diretores municipais e Planos de Desenvolvimento Integrado do Turismo (PDITS)."
  },
  {
    name: "Andressa Targino Carvalho",
    title: "Vice-Presidente da ATRIAL",
    avatar: "/palestrantes/andressa.jpeg",
    bio: "Advogada, graduada pela Universidade Federal de Alagoas. Especialista em Direito Tributário pelo IBET. MBA em Gestão Empresarial Executiva pela FGV. MBA em Contabilidade Tributária e Compliance pela BSSP. Vice-Presidente da ATRIAL – Associação dos Tributaristas de Alagoas."
  },
  {
    name: "Karoline Mafra Sarmento Beserra",
    title: "Registradora Civil e Tabeliã de Notas de Coqueiro Seco/AL",
    avatar: "/palestrantes/karol.jpeg",
    bio: "Doutoranda pela Universidade do Minho, Braga/PT, mestra em Direito pela Universidade Federal de Alagoas - UFAL. Pós-Graduada em Direito Processual, CESMAC. Pós-Graduada em Direito Notarial e Registral pela LEGALE. Membro da Associação Brasileira de Direito Processual Civil - ABDPro. Membro da Associação Brasileira Elas no Processo - ABEP. Membro da Associação Norte Nordeste de Professores de Processo - ANNEP. Professora de Processo Civil da Uninassau e do PROESP da UNEAL. Mediadora e Conciliadora cadastrada no NUPEMEC/AL. Ex-Tabeliã do 2º Cartório de Protesto de Maceió. Registradora Civil e Tabeliã de Notas de Coqueiro Seco/AL."
  },
  {
    name: "Paloma Tojal",
    title: "Controladora Geral do Município de Penedo",
    avatar: "/palestrantes/paloma.webp",
    bio: "Advogada, especialista em Gestão Pública. Atualmente é Controladora Geral do Município de Penedo e membro do Conselho Gestor do Plano Diretor do Município de Penedo. Iniciou sua carreira na Gestão Pública há 12 anos na Administração Pública Estadual, tendo passado por cargos como Secretária Executiva de Gestão Interna na Secretaria de Estado da Fazenda e como Secretária de Estado de Prevenção à Violência em Alagoas."
  },
  {
    name: "Mário Beznos",
    title: "Pesquisador da FIPE",
    avatar: "/palestrantes/mario.jpeg",
    bio: "Arquiteto e urbanista formado pela Faculdade de Arquitetura da Universidade Mackenzie (1974), com mestrado (MPhil) em Urbanismo e Planejamento Regional (“Urban Design and Regional Planning”) pela Universidade de Edinburgh, Escócia (1981) e pós-graduações na PUC-SP e no exterior (Universidades de York e Exeter, Reino Unido). De 1975 a 1991 exerceu funções técnicas e diretivas em diversos órgãos do setor público, incluindo o cargo de Secretário da Secretaria Especial de Ciência e Tecnologia da Presidência da República e de Diretor Geral do Departamento de Ciência e Tecnologia do Governo do Estado de São Paulo. Desde 1991 atua em consultoria e desenvolvimento de projetos para empresas e instituições como MZB Consultoria e Projetos, GV Consult, FGV Projetos, FIPE e FESPSP, além de organismos internacionais (BID, Deloitte, British Council). Foi professor em instituições como FACENS e CEPAM. Atualmente é pesquisador da FIPE, com mais de 50 anos de experiência em políticas públicas, urbanismo, mobilidade, concessões públicas e desenvolvimento regional."
  }
];

// ATUALIZADO: Tipo para um item da programação, agora pode conter palestras (talks)
type ScheduleItem = Omit<TimelineEvent, 'status'>;

// --- ATUALIZADO: Nova programação do evento estruturada em blocos ---
const programSchedule: ScheduleItem[] = [
  { 
    title: "Abertura", 
    speaker: "Ricardo Antônio de Barros Wanderley", 
    image: "/palestrantes/ricardo.jpeg", 
    category: 'Abertura', 
    startTime: "14:00", 
    endTime: "14:20" 
  },
  {
    title: "Bloco 1",
    category: 'Bloco',
    startTime: "14:20",
    endTime: "15:30",
    talks: [
      { title: "Planejamento Urbano Inteligente (PlanUrbi)", speaker: "Melissa Mota Alcides", image: "/palestrantes/melissa.jpg" },
      { title: "Cidades Inteligentes: O Futuro do Planejamento Urbano", speaker: "Raquel da Silva Cabral", image: "/palestrantes/raquel.jpeg" },
      { title: "Bancos de dados e mapeamento georreferenciado: ferramentas estratégicas para a gestão integrada do território", speaker: "Rute Ferreira Barbosa", image: "/palestrantes/rute.jpeg" },
    ]
  },
  { 
    title: "Coffee Break", 
    category: 'Coffee Break', 
    startTime: "15:30", 
    endTime: "15:45" 
  },
  {
    title: "Bloco 2",
    category: 'Bloco',
    startTime: "15:45",
    endTime: "16:50",
    talks: [
      { title: "Reflexos Tributários do Planejamento Urbano", speaker: "Andressa Targino Carvalho", image: "/palestrantes/andressa.jpeg" },
      { title: "Gestão Pública: Desafios e Possibilidades na Regularização de Núcleos Urbanos Informais Consolidados", speaker: "Karoline Mafra Sarmento Beserra", image: "/palestrantes/karol.jpeg" },
      { title: "Planejamento Urbano e Municipal: Uma parceria essencial para o futuro das cidades", speaker: "Paloma Tojal", image: "/palestrantes/paloma.webp" },
    ]
  },
  { 
    title: "Coffee Break", 
    category: 'Coffee Break', 
    startTime: "16:50", 
    endTime: "17:05" 
  },
  {
    title: "Bloco 3 ",
    category: 'Palestra Magna',
    startTime: "17:05",
    endTime: "18:00",
    talks: [
       { title: "Planejamento regional e urbano: desafios e perspectivas nas regiões metropolitanas à luz de 50 anos de experiência", speaker: "Mário Beznos", image: "/palestrantes/mario.jpeg" },
    ]
  },
  { 
    title: "Encerramento", 
    category: 'Debate', 
    startTime: "18:00", 
    endTime: "18:15" 
  },
  { 
    title: "Happy Hour do Seminário PlanUrbi", 
    speaker: "Local: Toca do Calango, Jaraguá", 
    category: 'Confraternização', 
    startTime: "19:00", 
    endTime: "22:00" 
  }
];

const getEventStatus = (startTime: string, endTime: string): "completed" | "current" | "upcoming" => {
  const now = new Date(); 
  const eventDate = "2025-08-13T"; // Data do evento
  const startDateTime = new Date(eventDate + startTime + ":00");
  const endDateTime = new Date(eventDate + endTime + ":00");

  if (now > endDateTime) return "completed";
  if (now >= startDateTime && now <= endDateTime) return "current";
  return "upcoming";
};

// Componente para o Card de Perfil do Palestrante
const SpeakerProfileCard = ({ name, title, avatar, bio }: { name: string, title: string, avatar: string, bio: string }) => (
  <div className={styles.speakerProfileCard}>
    <div className={styles.speakerTextContainer}>
      <h3 className={styles.speakerProfileName}>{name}</h3>
      <p className={styles.speakerProfileTitle}>{title}</p>
      <div className={styles.divider}></div>
      <p className={styles.speakerProfileBio}>{bio}</p>
    </div>
    <div className={styles.speakerImageContainer}>
      <Image 
        src={avatar}
        alt={`Foto de ${name}`}
        width={350}
        height={350}
        className={styles.speakerImage}
      />
    </div>
  </div>
);

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
           <div className={styles.speakersHeader}>
            <h2 className={styles.sectionTitle}>Conheça Nossos Palestrantes</h2>
            <p className={styles.sectionSubtitle}>Especialistas renomados que irão compartilhar conhecimento e insights valiosos sobre o futuro do planejamento urbano.</p>
           </div>
           <div className={styles.speakersGrid}>
            {speakers.map((speaker, index) => (
              <SpeakerProfileCard key={index} {...speaker} />
            ))}
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