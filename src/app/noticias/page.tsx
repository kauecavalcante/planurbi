"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './Noticias.module.css';

// Tipagem para os dados das notícias
interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  imagemUrl: string;
  slug: string;
  dataPublicacao: string;
}

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch('/api/noticias');
        if (!response.ok) throw new Error('Falha ao carregar as notícias.');
        const data = await response.json();
        setNoticias(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
      } finally {
        setLoading(false);
      }
    };
    fetchNoticias();
  }, []);

  // Função para determinar o URL correto para cada notícia
  const getNoticiaUrl = (slug: string) => {
    if (slug === "fepesa-prefeitura-audiencia-publica") {
      return "/noticias/audiencia-publica-plano-diretor";
    }
    // Para outras notícias, você pode usar um padrão
    return `/noticias/${slug}`;
  };

  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Notícias</h1>
            <p>Fique por dentro de todas as novidades e atualizações do PlanUrbi.</p>
          </div>

          {loading && <p>A carregar notícias...</p>}
          {error && <p className={styles.error}>{error}</p>}
          
          {!loading && !error && (
            <div className={styles.newsGrid}>
              {noticias.map((noticia) => (
                <Link href={getNoticiaUrl(noticia.slug)} key={noticia.id} className={styles.newsCard}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={noticia.imagemUrl}
                      alt={`Imagem da notícia: ${noticia.titulo}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className={styles.content}>
                    <span className={styles.date}>
                      {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                    <h2 className={styles.title}>{noticia.titulo}</h2>
                    <p className={styles.summary}>{noticia.resumo}</p>
                    <span className={styles.readMore}>
                      Ler Mais <i className='bx bx-right-arrow-alt'></i>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}