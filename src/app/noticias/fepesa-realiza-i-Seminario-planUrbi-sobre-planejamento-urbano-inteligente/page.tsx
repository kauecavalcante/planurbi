import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './Noticia.module.css';


const noticia = {
  titulo: "FEPESA realiza I Seminário PlanUrbi sobre planejamento urbano inteligente",
  subtitulo: "Evento gratuito em Maceió reúne especialistas, gestores e acadêmicos para debater soluções inovadoras para as cidades",
  imagemUrl: "/seminario.jpg", 
  dataPublicacao: "05 de Agosto de 2025",
  texto: `A Fundação de Apoio ao Ensino, Pesquisa e Extensão de Alagoas (FEPESA) realiza no dia 13 de agosto, a partir das 14h, no auditório do CREA/AL, o I Seminário PlanUrbi – Planejamento Urbano Inteligente, com o objetivo de promover o diálogo técnico e interdisciplinar sobre os desafios e caminhos possíveis para a construção de cidades mais inteligentes, sustentáveis e inclusivas. Gratuito e aberto ao público e com certificação digital para os participantes, o evento é voltado a profissionais e estudantes das áreas de arquitetura, urbanismo, engenharia, direito, gestão pública e outras afins, além de representantes da sociedade civil interessados em discutir o futuro das cidades. A iniciativa é parte das ações do PlanUrbi, projeto coordenado pela FEPESA com foco na inovação da gestão urbana a partir de tecnologias, evidências técnicas e participação social. As vagas são limitadas e as inscrições estão disponíveis pelo portal planurbi.com.br ou pelo perfil do Instagram @Planurbi_.

Para o diretor-presidente da FEPESA e coordenador geral do PlanUrbi, Ricardo Wanderley, que fará a palestra de abertura, o seminário representa mais que um evento técnico: “É um espaço de troca e construção coletiva que contribui diretamente para a execução do próprio PlanUrbi. Acreditamos que pensar cidades inteligentes passa por escuta qualificada, rigor técnico e envolvimento social. Nossa missão é apoiar projetos que tornem isso possível.”

A programação do seminário vai reunir pesquisadores e especialistas de diversas áreas em torno de comunicações técnicas e debates, divididos em três blocos temáticos. A principal atração será a palestra de encerramento com o arquiteto e urbanista Dr. Mário Beznos, uma das maiores referências nacionais em planejamento regional e urbano, com mais de 50 anos de experiência na área.

O evento também conta com participações como a da arquiteta e urbanista Melissa Mota, coordenadora técnica do PlanUrbi, com uma exposição sobre os conceitos que norteiam o projeto e sua aplicação prática no estado; da coordenadora tecnológica do Planurbi, a cientista da computação e pesquisadora Raquel Cabral, que vai discutir cidades inteligentes; da arqueóloga Rute Barbosa, com o tema do uso de mapas e dados georreferenciados na gestão do território; da advogada Andressa Targino, com uma análise sobre os impactos tributários do planejamento urbano; da advogada Karoline Mafra, que vai tratar dos desafios legais na regularização de áreas urbanas consolidadas; e da também advogada Paloma Tojal, que vai abordar a parceria entre planejamento urbano e gestão municipal como chave para o futuro das cidades.

Para Melissa Mota, a presença do Dr. Mário Beznos será um dos pontos altos do evento. “São mais de 50 anos de experiência em políticas públicas urbanas, e a gente fica muito feliz em tê-lo aqui para compartilhar esse conhecimento com a equipe do PlanUrbi e com todos os presentes. É sempre muito valiosa essa troca entre gerações e trajetórias diversas, principalmente quando falamos de planejamento urbano”, destaca.

O seminário integra a agenda estratégica do PlanUrbi, projeto que já atua na cidade de Barra de São Miguel, com aplicação de tecnologias como drones, georreferenciamento, dashboards participativos e revisão da legislação urbanística.`,
  servico: {
    titulo: "Serviço",
    itens: [
      "Evento: I Seminário PlanUrbi sobre planejamento urbano inteligente",
      "Local: Auditório do CREA, Rua Osvaldo Sarmento, 22 - Farol",
      "Data: 13 de Agosto de 2025",
      "Horário: 14h às 18h",
      "Entrada Gratuita",
      "Inscrições e informações: www.planurbi.com.br | @planurbi_."
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
                objectFit="contain" 
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