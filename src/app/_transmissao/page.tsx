// src/app/seminario/page.tsx
import Link from 'next/link'; // Importe o Link do Next.js
import TwitchEmbed from "@/components/TwitchEmbed";
import styles from './Transmissao.module.css';

export const metadata = {
  title: "Seminário Ao Vivo | Planurbi",
  description: "Acompanhe a transmissão ao vivo do nosso seminário.",
};

export default function SeminarioPage() {
  const NOME_DO_CANAL_DA_TWITCH = "gaules";

  return (
    <div className={styles.page}>
      <main className={styles.contentWrapper}>
        <div className={styles.header}>
          <h1>Seminário Ao Vivo</h1>
          <p>Acompanhe a nossa transmissão em tempo real.</p>
        </div>

        <div className={styles.videoWrapper}>
          <TwitchEmbed channelName={NOME_DO_CANAL_DA_TWITCH} />
        </div>

        {/* Botão que leva para a página de perguntas */}
        <div className={styles.callToAction}>
          <h2>Quer participar?</h2>
          <p>Clique no botão abaixo para enviar sua pergunta diretamente para nossa equipe.</p>
          <Link href="/seminario/perguntas" className={styles.actionButton}>
            Enviar Pergunta Agora
          </Link>
        </div>
      </main>
    </div>
  );
}