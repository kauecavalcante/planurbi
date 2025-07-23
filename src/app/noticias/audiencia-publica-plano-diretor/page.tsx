import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './Noticia.module.css';

// Conteúdo da notícia
const noticia = {
  titulo: "Fepesa e Prefeitura de Barra de São Miguel promovem audiência pública sobre o futuro urbano do município",
  subtitulo: "Primeira audiência do PlanUrbi marca início da revisão do Plano Diretor com uso de tecnologia e participação popular",
  imagemUrl: "/barra.jpg",
  dataPublicacao: "18 de Julho de 2025",
  texto: `A Fepesa (Fundação de Estudos, Pesquisas e Projetos para o Desenvolvimento Sustentável) e a Prefeitura de Barra de São Miguel realizam no dia 22 de julho, das 8h às 12h, no Village Barra Hotel, a primeira audiência pública do processo de revisão do Plano Diretor Participativo. A iniciativa integra o Programa de Planejamento Urbano (PPUrb) – também chamado de PlanUrbi – e inaugura um novo ciclo de debates sobre o desenvolvimento do município, com base em tecnologia, inteligência artificial e escuta qualificada da população.\n\nSob a coordenação técnica da FEPESA, o processo de revisão do Plano Diretor será conduzido com foco na modernização da política urbana do município e na valorização da participação cidadã. Com duração de 12 meses, o programa inclui o levantamento detalhado da cidade, o estudo das condições ambientais e sociais, a atualização de leis importantes — como o Plano Diretor, o Código de Obras e o Código de Tributos — e a criação de um plano para melhorar o transporte e a mobilidade urbana.\n\nA audiência pública será o marco inicial dessa construção coletiva. Durante o evento, será apresentado o cronograma de atividades, a metodologia de trabalho, a equipe técnica responsável e, principalmente, será aberta a escuta da população sobre os desafios e potenciais da cidade. Segundo o diretor-presidente da FEPESA, Ricardo Wanderley, o evento é um marco significativo para o planejamento urbano da cidade, pois a Barra de São Miguel está se repensando como município, reavaliando suas áreas rurais e urbanas e se preparando para um cenário de expansão planejada. “Estamos construindo, com ampla participação da população, as bases para um uso mais inteligente do solo e uma gestão mais eficiente das políticas públicas nos próximos 10 anos. Com a mediação da Fepesa, o município olha para o presente e projeta o futuro dentro da janela legal de planejamento, discutindo temas como mobilidade, saneamento, turismo, habitação e crescimento imobiliário. O resultado será um novo Plano Diretor, fundamentado em diagnóstico técnico, participação social e uso estratégico da tecnologia. Uma Barra pensada para o cidadão barrense.”\n\nAinda de acordo com Ricardo Wanderley, o diferencial do PlanUrbi está no uso de soluções tecnológicas como georreferenciamento e inteligência artificial para coleta, análise e projeção de dados. “Isso garante uma maior precisão no planejamento e mais transparência no processo. Além disso, o PlanUrbi também prevê a mobilização social em todas as fases, promovendo oficinas, escutas públicas e mecanismos digitais de participação”, explica.\n\nA proposta desenvolvida pela Fepesa prevê que, ao final do processo, o município disponha de um novo marco legal para orientar seu crescimento com sustentabilidade, integração e justiça espacial. A última versão do Plano Diretor do município foi instituída em 2008, e a nova proposta atenderá à exigência de revisão decenal prevista no Estatuto da Cidade (Lei Federal nº 10.257/2001).`,
  servico: {
    titulo: "SERVIÇO",
    itens: [
      "Primeira Audiência Pública – Plano Diretor Participativo (PlanUrbi)",
      "Data: 22 de julho de 2025",
      "Horário: 8h às 12h",
      "Local: Village Barra Hotel, Barra de São Miguel (AL)",
      "Informações: (82) 99837-7705"
    ]
  }
};

export default function NoticiaAudienciaPage() {
  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <Link href="/noticias" className={styles.topBackButton}>
            <i className='bx bx-left-arrow-alt'></i> Voltar para Notícias
          </Link>

          <article className={styles.articleContainer}>
            <header className={styles.articleHeader}>
              <span className={styles.date}>{noticia.dataPublicacao}</span>
              <h1 className={styles.title}>{noticia.titulo}</h1>
              <p className={styles.subtitle}>{noticia.subtitulo}</p>
            </header>

            <div className={styles.imageWrapper}>
              <Image
                src={noticia.imagemUrl}
                alt={`Imagem da notícia: ${noticia.titulo}`}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>

            <div className={styles.articleBody}>
              {noticia.texto.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.serviceBlock}>
              <h3>{noticia.servico.titulo}</h3>
              <ul>
                {noticia.servico.itens.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
