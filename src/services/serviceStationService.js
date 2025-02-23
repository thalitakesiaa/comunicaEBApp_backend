const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createServiceStation = async (data) => {
  try {
    const areaExistente = await prisma.areas.findUnique({ where: { id: data.area_id } });
    if (!areaExistente) {
      return { error: 'A área informada não existe.' };
    }

    const newServiceStation = await prisma.service_stations.create({ data });
    return newServiceStation;
  } catch (error) {
    throw new Error('Erro ao criar posto de serviço: ' + error.message);
  }
};

const getAllServiceStations = async () => {
  try {
    const serviceStations = await prisma.service_stations.findMany();
    return serviceStations;
  } catch (error) {
    throw new Error('Erro ao buscar postos de serviço.');
  }
};

const getServiceStationById = async (id) => {
  try {
    const serviceStation = await prisma.service_stations.findUnique({ where: { id } });
    return serviceStation || null;
  } catch (error) {
    throw new Error('Erro ao buscar posto de serviço.');
  }
};

const updateServiceStation = async (id, data) => {
  try {
    const serviceStationExistente = await prisma.service_stations.findUnique({ where: { id } });
    if (!serviceStationExistente) {
      return { error: 'Posto de serviço não encontrado.' };
    }

    if (data.area_id) {
      const areaExistente = await prisma.areas.findUnique({ where: { id: data.area_id } });
      if (!areaExistente) {
        return { error: 'A área informada não existe.' };
      }
    }

    const updatedServiceStation = await prisma.service_stations.update({
      where: { id },
      data
    });

    return updatedServiceStation;
  } catch (error) {
    throw new Error('Erro ao atualizar posto de serviço: ' + error.message);
  }
};

const deleteServiceStation = async (id) => {
  try {
    const serviceStationExistente = await prisma.service_stations.findUnique({ where: { id } });

    if (!serviceStationExistente) {
      return { error: 'Posto de serviço não encontrado.' };
    }

    await prisma.service_stations.delete({ where: { id } });

    return { message: 'Posto de serviço deletado com sucesso.' };
  } catch (error) {
    throw new Error('Erro ao deletar posto de serviço: ' + error.message);
  }
};

module.exports = {
  createServiceStation,
  getAllServiceStations,
  getServiceStationById,
  updateServiceStation,
  deleteServiceStation
};
