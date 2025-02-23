const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createPosition = async (data) => {
  try {
    console.log('Criando cargo:', data);

    const existingServiceStation = await prisma.service_stations.findUnique({
      where: { id: data.service_station_id },
    });

    if (!existingServiceStation) {
      throw new Error('A estação de serviço informada não existe.');
    }
    console.log('verificou o  id', data)
    const position = await prisma.position.create({ data });
    console.log(position)
    return position;
  } catch (error) {
    console.error('Erro ao criar cargo:', error.message);
    throw error;
  }
};

const getAllPositions = async () => {
  try {
    const positions = await prisma.position.findMany();

    if (!positions.length) {
      throw new Error('Nenhuma posição encontrada.');
    }

    return positions;
  } catch (error) {
    console.error('Erro ao buscar todas as posições:', error.message);
    throw new Error('Erro ao buscar todas as posições.');
  }
};

const getPositionById = async (id) => {
  try {
    if (!id) throw new Error('ID do cargo é obrigatório.');

    const position = await prisma.position.findUnique({ where: { id } });

    if (!position) {
      throw new Error(`Cargo com ID ${id} não encontrado.`);
    }

    return position;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const updatePosition = async (id, name) => {
  try {
    if (!id || !name) throw new Error('ID e nome são obrigatórios.');

    const positionExists = await prisma.position.findUnique({ where: { id } });

    if (!positionExists) {
      throw new Error(`Cargo com ID ${id} não encontrado.`);
    }

    const updatedPosition = await prisma.position.update({
      where: { id },
      data: { name },
    });

    return updatedPosition;
  } catch (error) {
    console.error('Erro ao atualizar cargo:', error.message);
    throw new Error('Erro ao atualizar cargo.');
  }
};

const deletePosition = async (id) => {
  try {
    if (!id) throw new Error('ID do cargo é obrigatório.');

    const positionExists = await prisma.position.findUnique({ where: { id } });

    if (!positionExists) {
      throw new Error(`Cargo com ID ${id} não encontrado.`);
    }

    await prisma.position.delete({ where: { id } });

  } catch (error) {
    console.error('Erro ao deletar cargo:', error.message);
    throw new Error('Cargo não encontrado com esse ID');
  }
}

module.exports = {
  createPosition,
  getAllPositions,
  getPositionById,
  updatePosition,
  deletePosition,
};
