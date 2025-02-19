const areaService = require('../services/areaService');

const createArea = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newArea = await areaService.createArea(name, description);
    
    return res.status(201).json({ message: 'Área criada com sucesso', data: newArea });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar a área', error: error.message });
  }
};

const getAllAreas = async (req, res) => {
  try {
    const areas = await areaService.getAllAreas();

    if (!areas || areas.length === 0) {
      return res.status(404).json({ message: 'Nenhuma área encontrada' });
    }

    return res.status(200).json({ message: 'Áreas recuperadas com sucesso', data: areas });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao recuperar as áreas', error: error.message });
  }
};

const getAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await areaService.getAreaById(parseInt(id));
    if (!area) {
      return res.status(404).json({ message: 'Área não encontrada' });
    }
    return res.status(200).json({ message: 'Área encontrada', data: area });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao recuperar a área', error: error.message });
  }
};

const updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedArea = await areaService.updateArea(parseInt(id), name, description);
    if (!updatedArea) {
      return res.status(404).json({ message: 'Área não encontrada' });
    }
    return res.status(200).json({ message: 'Área atualizada com sucesso', data: updatedArea });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar a área', error: error.message });
  }
};

const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID da área é obrigatório.' });
    }
    console.log('Verifica a obrigatoriedade do id');

    const area = await areaService.getAreaById(parseInt(id));
    console.log('busca a area com o id');

    if (!area) {
      return res.status(404).json({ message: 'Área não encontrada' });
    }
    console.log('Não encontrou id')

    await areaService.deleteArea(parseInt(id));

    return res.status(200).json({ message: 'Área deletada com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar a área', error: error.message });
  }
};


module.exports = {
  createArea,
  getAllAreas,
  getAreaById,
  updateArea,
  deleteArea,
};
