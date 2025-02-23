const serviceStationService = require('../services/serviceStationService');
const { serviceStationSchema } = require('../validators/serviceStationValidator');

const createServiceStation = async (req, res) => {
  try {
    const { error } = serviceStationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newServiceStation = await serviceStationService.createServiceStation(req.body);

    if (newServiceStation.error) {
      return res.status(400).json({ message: newServiceStation.error });
    }

    return res.status(201).json(newServiceStation);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar posto de serviço.', error: error.message });
  }
};

const getAllServiceStations = async (req, res) => {
  try {
    const serviceStations = await serviceStationService.getAllServiceStations();

    if (!serviceStations || serviceStations.length === 0) {
      return res.status(404).json({ message: 'Nenhum posto de serviço encontrado.' });
    }

    return res.status(200).json({ message: 'Postos de serviço recuperados com sucesso.', data: serviceStations });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar postos de serviço.', error: error.message });
  }
};

const getServiceStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceStation = await serviceStationService.getServiceStationById(parseInt(id));

    if (!serviceStation) {
      return res.status(404).json({ message: 'Posto de serviço não encontrado.' });
    }

    return res.status(200).json(serviceStation);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar posto de serviço.', error: error.message });
  }
};

const updateServiceStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = serviceStationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedServiceStation = await serviceStationService.updateServiceStation(parseInt(id), req.body);

    if (updatedServiceStation.error) {
      return res.status(404).json({ message: updatedServiceStation.error });
    }

    return res.status(200).json(updatedServiceStation);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar posto de serviço.', error: error.message });
  }
};

const deleteServiceStation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedServiceStation = await serviceStationService.deleteServiceStation(parseInt(id));

    if (deletedServiceStation.error) {
      return res.status(404).json({ message: deletedServiceStation.error });
    }

    return res.status(200).json({ message: "Estação de serviço deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar posto de serviço.', error: error.message });
  }
};

module.exports = {
  createServiceStation,
  getAllServiceStations,
  getServiceStationById,
  updateServiceStation,
  deleteServiceStation
};
