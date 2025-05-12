import prisma from './prisma';
import { dashboardQueries } from './queries';

export async function getDashboardData() {

  try {
    const results = {};

    for (const [key, sql] of Object.entries(dashboardQueries)) {
      try {
        // Realiza a chamada das querys sql presentes no arquivo sql
        const rawResult = await prisma.$queryRawUnsafe(sql);
        let finalResult;

        // Verifica se 'rawResult' é um array não vazio e se o primeiro elemento é um objeto
        if (
          Array.isArray(rawResult) &&
          rawResult.length > 0 &&
          typeof rawResult[0] === 'object'
        ) {
          const keys = Object.keys(rawResult[0]);

          if (keys.length === 1) {
            // Somente uma coluna: transforma em array
            const field = keys[0];
            finalResult = { [field]: rawResult.map(row => row[field]) };
          } else {
            // Mais de uma coluna: mantém formato original
            finalResult = rawResult;
          }
        } else {
          // Resultado inesperado (não é array de objetos)
          finalResult = rawResult;
        }

        results[key] = {
          success: true,
          data: finalResult,
        };
      } catch (queryError) {
        console.error(`Falha na query ${key}:`, queryError);
        results[key] = {
          success: false,
          error: queryError.message,
          sql: sql,
        };
      }
    }

    return results;
  } catch (connectionError) {
    console.error('Falha na conexão com o banco:', connectionError);
    return {
      globalError: 'Database connection failed',
      details: connectionError.message,
    };
  } finally {
    await prisma.$disconnect().catch((e) => {
      console.error('Erro ao desconectar:', e);
    });
  }
}