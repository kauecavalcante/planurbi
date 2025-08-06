/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adiciona a configuração para permitir imagens externas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Permite qualquer caminho de imagem nesse domínio
      },
    ],
  },
};

export default nextConfig;
