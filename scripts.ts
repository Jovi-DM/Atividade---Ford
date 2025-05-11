import { PrismaClient } from './generated/prisma'
import workes from './workers.json'

const prisma = new PrismaClient()

async function main() {

    for (const worker of workes){
        const functionary = await prisma.workers.create({
            data: {
              ...worker,
              data_admissao: new Date(worker.data_admissao)
            }
        })
    }
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });