const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testPrisma() {
  try {
    console.log('Conectando ao banco...');
    const users = await prisma.user.findMany();
    console.log('Usuários encontrados:', users);
  } catch (error) {
    console.error('Erro ao consultar o banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
