import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './Noticia.module.css';

// Conteúdo da notícia
const noticia = {
  titulo: "Barra de São Miguel inicia revisão do Plano Diretor com audiência pública participativa",
  subtitulo: "Evento marcou o lançamento oficial do PlanUrbi e reuniu autoridades, técnicos e moradores para debater o futuro da cidade",
  dataPublicacao: "22 de Julho de 2025",
  texto: [
    `Foi com casa cheia e muita participação popular que a Fepesa e Prefeitura de Barra de São Miguel realizaram, nesta terça-feira (22), no Village Barra Hotel, a Primeira Audiência Pública do Processo de Revisão do Plano Diretor Participativo, no âmbito do Programa de Planejamento Urbano Inteligente (PlanUrbi). A audiência foi o pontapé inicial de um processo que pretende redesenhar o futuro do município com foco na inclusão social, desenvolvimento sustentável e uso estratégico da tecnologia.`,
    `O encontro contou com a presença do prefeito Henrique Alves, do diretor-presidente da FEPESA, Ricardo Wanderley, da coordenadora técnica do PlanUrbi, Melissa Mota, além do presidente da Câmara Municipal, Diney Torres, vereadores, secretários, servidores públicos, empresários, representantes de associações e moradores da cidade.`,
    `Durante a abertura, o prefeito da Barra de São Miguel destacou a importância de a gestão municipal estar comprometida com a construção de um plano sólido e de longo prazo. “A nossa gestão um dia vai terminar, mas o legado deixado por esse projeto vai permanecer por décadas. Nossa preocupação é construir uma cidade melhor, mais organizada, com mais qualidade de vida para todos os moradores”, afirmou Henrique Alves.`,
    `O Plano Diretor é o principal instrumento legal de planejamento urbano dos municípios. Com ele, são definidas as regras de ocupação do solo, mobilidade, infraestrutura, preservação ambiental, crescimento urbano e organização das atividades econômicas. A revisão atual será realizada ao longo de 12 meses, com execução coordenada pela FEPESA, Fundação de Apoio ao Ensino, Pesquisa e Extensão de Alagoas, envolvendo mais de 20 profissionais com experiência em planejamento urbano, geoprocessamento, mobilização social, legislação urbanística e pesquisa científica."`,
    `Segundo Ricardo Wanderley, diretor-presidente da FEPESA e coordenador geral do PlanUrbi esse é um momento histórico para o município. “Barra de São Miguel está passando por um processo de reinvenção. Estamos discutindo hoje um projeto que pensa a cidade para os próximos 10 anos, com participação efetiva da população. É um passo estratégico para transformar a Barra em um lugar ainda melhor para viver.”`,
    `A coordenadora técnica do projeto, Melissa Mota, apresentou o cronograma, as etapas e a equipe técnica do PlanUrbi. Ela destacou que o grande diferencial da proposta está no uso de tecnologias inovadoras, como drones para mapeamento georreferenciado, inteligência artificial para tirar dúvidas da população e canais digitais com elementos de gamificação, para facilitar o engajamento da sociedade com o conteúdo do plano. “Vamos ouvir as dores da população e buscar soluções reais. Teremos oficinas participativas, escutas públicas, seminários temáticos e uma escuta ativa ao longo de todo o processo. O plano precisa refletir o que o povo vive e deseja para a cidade.”`,
    `A audiência também abriu espaço para os moradores expressarem seus anseios e preocupações. Foram levantadas questões sobre mobilidade urbana, saneamento básico, conservação dos mangues e do Rio Niquim, limpeza urbana, turismo sustentável e coleta seletiva, entre outros temas fundamentais para o cotidiano da cidade.`,
    `O PlanUrbi – Programa de Planejamento Urbano Inteligente é uma iniciativa inovadora voltada à revisão participativa do Plano Diretor dos municípios alagoanos, com uso de tecnologias digitais, metodologias colaborativas e produção científica aplicada. Além de ser um instrumento legal, o plano será fruto de um processo educativo e de escuta ativa da população, envolvendo pesquisa, extensão universitária e soluções técnicas modernas. O objetivo é construir uma cidade mais justa, eficiente e preparada para o futuro, com decisões sustentadas por dados, participação popular e visão estratégica.`,
  ],
  imagens: [
    "/audiencia.jpg", 
    "/noticia-revisao-2.jpg",
    "/noticia-revisao-3.jpg",
    "/noticia-revisao-4.jpg",
  ],
  maisInfo: {
    titulo: "Mais Informações",
    links: ["www.planurbi.org", "@planurbi_"],
  },
};

export default function NoticiaRevisaoPage() {
  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <Link href="/noticias" className={styles.topBackButton}>
            <i className='bx bx-left-arrow-alt'></i> Voltar para Notícias
          </Link>

          <article>
            <header className={styles.articleHeader}>
              <span className={styles.date}>{noticia.dataPublicacao}</span>
              <h1 className={styles.title}>{noticia.titulo}</h1>
              <p className={styles.subtitle}>{noticia.subtitulo}</p>
            </header>

            <div className={styles.articleBody}>
              {noticia.texto.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.gallery}>
              {noticia.imagens.map((src, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <Image src={src} alt={`Imagem ${index + 1} da notícia`} layout="fill" objectFit="cover" />
                </div>
              ))}
            </div>

            <div className={styles.infoBlock}>
              <h3>{noticia.maisInfo.titulo}</h3>
              {noticia.maisInfo.links.map((link, index) => (
                <a key={index} href={link.startsWith('@') ? `https://instagram.com/${link.substring(1)}` : `http://${link}`} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              ))}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}