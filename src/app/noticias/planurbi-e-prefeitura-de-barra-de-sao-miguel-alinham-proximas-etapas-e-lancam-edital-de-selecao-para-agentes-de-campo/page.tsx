import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './Noticia.module.css';

// Conteúdo da notícia
const noticia = {
  titulo: "PlanUrbi e Prefeitura de Barra de São Miguel alinham próximas etapas e lançam edital de seleção para agentes de campo",
  subtitulo: "Reunião de balanço do projeto confirma cronograma de atividades e abre oportunidade de trabalho para jovens da comunidade",
  imagemUrl: "/logo-planurbi.png",
  dataPublicacao: "07 de Agosto de 2025",
  texto: `O projeto PlanUrbi, realizou hoje (07) uma reunião de balanço com o Prefeito da Barra de São Miguel, Henrique Alves e sua equipe para definir as atividades do próximo ciclo do projeto. O encontro, que contou com a presença da coordenadora técnica do PlanUrbi, Melissa Mota, da secretária de Administração e Finanças Bruna Jucá e do secretário adjunto Yuri Balbino, resultou na confirmação do lançamento de um edital para a seleção de agentes de campo.\n\n
A pauta da reunião incluiu a análise de desempenho dos dois primeiros meses do projeto, a definição de uma campanha comunicacional prévia ao levantamento de campo e a metodologia de validação do município para a disponibilização dos produtos e documentação correlata do PlanUrbi. Entre os pontos de destaque, foi reafirmada a realização de quatro oficinas participativas físicas e duas virtuais, uma das prioridades para o próximo mês de agosto.\n\n
A coordenadora técnica Melissa Mota explicou a dinâmica da reunião e a importância da continuidade do projeto. “Essa é mais uma reunião de balanço do projeto que é feita a cada fim de etapa para pactuar as atividades que serão desenvolvidas no próximo ciclo de atividades. Dessa forma conseguimos manter o processo cada vez mais fluido e participativo”. Melissa também anunciou as próximas ações, já com data marcada. “Nas próximas semanas vamos iniciar as oficinas comunitárias participativas, onde vamos nos aproximar mais da população, ouvir seus problemas, descobrir as potencialidades dos locais onde vivem e também vamos explicar sobre a importância do PlanUrbi e os benefícios que ele trará para a cidade”.\n\n
Um dos anúncios mais relevantes para a comunidade foi o do edital para a seleção de agentes de campo, que será disponibilizado nos portais da FEPESA (fepesa.org.br) e da prefeitura (barradesaomiguel.al.gov.br) nos próximos dias. A iniciativa, que abre oportunidades para jovens acima de 16 anos, foi destacada pelo Prefeito Henrique Alves. “O edital é uma excelente notícia para os jovens barrenses que têm acima de 16 anos matriculados na rede pública de ensino. Eles não devem ficar de fora”, incentivou o gestor.\n\n
O Planejamento para o próximo mês inclui, além da seleção dos agentes e das oficinas participativas : a continuação do levantamento de campo e georreferenciamento , a realização de voos de drone e o treinamento da equipe municipal.`,
  servico: {
    titulo: "Sobre o PlanUrbi",
    itens: [
      "O PlanUrbi é um programa de desenvolvimento e organização urbana que busca, através da atualização do Plano Diretor, orientar o crescimento de cidades. O projeto, com vida própria, é aplicado em diferentes municípios, sendo Barra de São Miguel o local de sua aplicação atual. O programa preza pela participação popular, integrando a comunidade ao processo de planejamento de sua cidade.",
      
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
