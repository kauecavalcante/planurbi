// src/components/TwitchEmbed/index.tsx

interface TwitchEmbedProps {
  /**
   * O nome de usuário do canal da Twitch que será transmitido.
   * Ex: "seu_canal_da_twitch"
   */
  channelName: string;
}

/**
 * Componente para incorporar uma transmissão ao vivo da Twitch de forma responsiva.
 * Ele determina automaticamente o domínio pai (localhost para desenvolvimento, domínio de produção para o site no ar)
 * para cumprir as políticas de embed da Twitch.
 */
const TwitchEmbed = ({ channelName }: TwitchEmbedProps) => {
  // A Vercel disponibiliza a variável de ambiente NEXT_PUBLIC_VERCEL_URL com a URL do deploy.
  // Em ambiente local, essa variável não existe, então usamos 'localhost'.
  // Esta é uma forma robusta de lidar com o parâmetro `parent` da Twitch.
  const parentDomain = process.env.NEXT_PUBLIC_VERCEL_URL || "localhost";

  const twitchSrc = `https://player.twitch.tv/?channel=${channelName}&parent=${parentDomain}&muted=true`;

  return (
    <div className="aspect-ratio-16-9">
      <iframe
        src={twitchSrc}
        allowFullScreen={true}
        title={`Transmissão ao vivo do canal ${channelName} no Twitch`}
      ></iframe>
    </div>
  );
};

export default TwitchEmbed;