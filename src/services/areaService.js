const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Criar uma nova área
const createArea = async (name, description) => {
  try {
    console.log('Criando área:', { name, description });

    if (!name || !description) {
      throw new Error('Nome e descrição são obrigatórios.');
    }

    const area = await prisma.areas.create({
      data: { name, description },
    });

    return { data: area };
  } catch (error) {
    console.error('Erro ao criar área:', error);

    throw new Error('Erro ao criar área: ' + error.message);
  }
};

// Buscar todas as áreas
const getAllAreas = async () => {
  try {
    const areas = await prisma.areas.findMany();

    if (areas.length === 0) {
      return null
    }

    return { data: areas };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Buscar uma área por ID
const getAreaById = async (id) => {
  try {
    if (!id) {
      throw new Error('ID da área é obrigatório.');
    }

    const area = await prisma.areas.findUnique({ where: { id } });

    if (!area) {
      return null;
    }

    return { data: area };
  } catch (error) {
    throw new Error( error.message);
  }
};

// Atualizar uma área por ID
const updateArea = async (id, name, description) => {
  try {
    if (!id || !name || !description) {
      throw new Error('ID, nome e descrição são obrigatórios.');
    }

    const areaExistente = await prisma.areas.findUnique({ where: { id } });

    if (!areaExistente) {
      return null;
    }

    const areaAtualizada = await prisma.areas.update({
      where: { id },
      data: { name, description },
    });

    return { data: areaAtualizada };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Deletar uma área por ID
const deleteArea = async (id) => {
  try {
    if (!id) {
      return null; // Retorna null caso o ID não seja fornecido
    }
    console.log('ID enviado é nulo')
    const areaExistente = await prisma.areas.findUnique({ where: { id } });
    console.log('Area buscada:', areaExistente);

    if (!areaExistente) {
      return null; // Retorna null para o controller lidar com o 404
    }
    console.log('retorno nulo de are')

    await prisma.areas.delete({ where: { id } });

    return { message: 'Área deletada com sucesso.' };
  } catch (error) {
    throw new Error('Erro ao deletar área: ' + error.message);
  }
};


module.exports = {
  createArea,
  getAllAreas,
  getAreaById,
  updateArea,
  deleteArea,
};
