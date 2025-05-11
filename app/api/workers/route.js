import { NextResponse } from 'next/server';
import { getDashboardData } from '../../../lib/db.js'

// Função auxiliar para lidar com BigInt na serialização
function serializeBigInt(data) {
  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      if (typeof value === 'bigint') {
        return value.toString();
      }
      return value;
    })
  );
}

// GET /api/workers
export async function GET() {
  try {
    // Busca os dados a serem apresentados
    const rawData = await getDashboardData();

    // Realizar tratamento com BigInt
    const serializedProducts = serializeBigInt(rawData);

    // Retorna os dados formatados
    return NextResponse.json({
      status: 'success',
      data: serializedProducts,
    });
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Falha ao buscar dados',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}