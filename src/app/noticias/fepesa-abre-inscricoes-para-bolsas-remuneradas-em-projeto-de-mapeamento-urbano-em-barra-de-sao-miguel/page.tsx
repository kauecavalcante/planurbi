import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './Noticia.module.css';

// Conteúdo da notícia
const noticia = {
  titulo: "FEPESA abre inscrições para bolsas remuneradas em projeto de mapeamento urbano em Barra de São Miguel",
  subtitulo: "Seleção oferece 15 vagas com atuação até dezembro no PlanUrbi; 12 bolsas são exclusivas para moradores do município. Participantes serão capacitados para coleta de informações territoriais.",
  imagemUrl: "/bannerBolsa.jpeg",
  dataPublicacao: "08 de Agosto de 2025",
  texto: `A FEPESA, Fundação de Apoio ao Ensino, Pesquisa e Externsão de Alagoas, lançou hoje (8), o edital para a seleção de 15 agentes de campo, que atuarão no levantamento de dados de toda a zona urbana do município da Barra de São Miguel até dezembro deste ano. A iniciativa visa selecionar para jovens e profissionais, que vão contribuir com a coleta de informações territoriais para o programa Planurbi.\n\n
  As inscrições já estão abertas e vão até o dia 22 de agosto. Os interessados devem acessar o portais fepesa.org.br ou planurbi.com.br. Lá também é possível ter acesso ao edital completo. Ao todo serão disponibilizadas 12 bolsas de R$ 300,00 para jovens com no mínimo 16 anos de idade, matriculados na rede pública de ensino. Para participar da seleção, os candidatos passarão por uma entrevista presencial e, se aprovados, deverão comprovar residência em Barra de São Miguel por meio de comprovante de matrícula e histórico escolar.\n\n
  A coordenadora técnica do PlanUrbi, Melissa Mota, destaca a importância da participação local. “A gente quer pessoas da própria Barra nesse projeto. É uma forma de, além de remunerar esses jovens, abrir horizontes para eles”, explica. Segundo ela, a capacitação vai além do aspecto tecnológico. “Eles serão treinados para observar a cidade onde vivem, os imóveis, a infraestrutura, a organização urbana. Dessa forma, no futuro, poderão surgir novos arquitetos, urbanistas, pesquisadores e muito mais”.\n\n
  Para coordenar as equipes, o edital também oferece três bolsas no valor de R$ 1.200,00 para pessoas com curso superior ou técnico. Neste caso, a seleção é aberta a profissionais de qualquer parte do estado, que serão responsáveis por guiar o trabalho de campo.\n\n
  Os agentes de campo terão a missão de realizar o levantamento de toda a zona urbana da Barra de São Miguel, uma área que corresponde a mais de 10 mil imóveis, como parte da etapa de mapeamento do PlanUrbi. O trabalho dos selecionados, que passarão por um treinamento prévio, tem previsão de início em setembro e deve ser concluído até o final de dezembro.\n\n
  O coordenador geral do PlanUrbi, Ricardo Wanderley ressalta os benefícios da iniciativa para a gestão municipal. "A partir desse trabalho a gente espera ter um novo panorama geral da Barra de São Miguel, sob a perspectiva territorial. Além de ser aplicado diretamente no nosso trabalho do PlanUrbi, isso vai ajudar o poder público a entender melhor o município, saber onde está a maior densidade populacional, onde são mais necessários investimentos em equipamentos públicos para saúde e educação, por exemplo. São dados importantes que fazem a diferença no dia a dia do município".
`,
  servico: {
    titulo: "Sobre o PlanUrbi",
    itens: [
      "O PlanUrbi é um programa de desenvolvimento e organização urbana que busca, através da atualização de Planos Diretores, orientar o crescimento de cidades. O projeto, com vida própria, é aplicado em diferentes municípios, sendo Barra de São Miguel o local de sua aplicação atual. O programa preza pela participação popular, integrando a comunidade ao processo de planejamento de sua cidade.",
      
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
