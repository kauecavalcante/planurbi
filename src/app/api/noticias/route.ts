import { NextResponse } from 'next/server';


const mockNoticias = [
  {
    id: '1',
    titulo: "Barra de São Miguel inicia revisão do Plano Diretor com audiência pública participativa",
    resumo: "Evento marcou o lançamento oficial do PlanUrbi e reuniu autoridades, técnicos e moradores para debater o futuro da cidade",
    imagemUrl: "/audiencia.jpg",
    slug: "barra-de-sao-miguel-inicia-revisao", 
    dataPublicacao: new Date('2025-07-22T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    titulo: "Fepesa e Prefeitura de Barra de São Miguel promovem audiência pública sobre o futuro urbano do município",
    resumo: "Primeira audiência do PlanUrbi marca início da revisão do Plano Diretor com uso de tecnologia e participação popular",
    imagemUrl: "/barra.jpg",
    slug: "audiencia-publica-plano-diretor", 
    dataPublicacao: new Date('2025-07-18T14:30:00Z').toISOString(),
  },
];

export async function GET() {
  try {
    
    return NextResponse.json(mockNoticias, { status: 200 });

  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    const message = error instanceof Error ? error.message : 'Erro interno do servidor.';
    return NextResponse.json({ message }, { status: 500 });
  }
}