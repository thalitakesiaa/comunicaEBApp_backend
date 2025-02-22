const positionService = require('../services/positionService');

exports.createPosition = async (req, res) => {
  try {
    const newPosition = await positionService.createPosition(req.body);

    if (newPosition.error) {
      return res.status(400).json({ message: newPosition.error });
    }

    return res.status(201).json({ message: 'Cargo criado com sucesso', data: newPosition });
  } catch (error) {
    console.error('Erro ao criar cargo:', error);
    return res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
  }
};


exports.getAllPositions = async (req, res) => {
  try {
    const positions = await positionService.getAllPositions();
    res.status(200).json({ message: 'Grupos de cargos recuperados com sucesso', data: positions });
  } catch (error) {
    console.error('Erro ao buscar Positions:', error);
    res.status(500).json({ message: 'Erro interno ao buscar os grupos de cargos. Tente novamente mais tarde.' });
  }
};

exports.getPositionById = async (req, res) => {
  try {
    const { id } = req.params;
    const position = await positionService.getPositionById(parseInt(id));

    res.status(200).json({ message: 'Cargo encontrado com sucesso.', data: position });
  } catch (error) {
    console.error('Erro ao buscar cargo:', error);
    res.status(404).json({ message: error.message });
  }
};

exports.createPosition = async (req, res) => {
  try {
    const position = await positionService.createPosition(req.body);
    res.status(201).json({ message: 'Cargo criado com sucesso.', data: position });
  } catch (error) {
    console.error('Erro ao criar cargo:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedPosition = await positionService.updatePosition(parseInt(id), name);
    res.status(200).json({ message: 'Cargo atualizado com sucesso.', data: updatedPosition });
  } catch (error) {
    console.error('Erro ao atualizar cargo:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    await positionService.deletePosition(parseInt(id));

    return res.status(200).json({ message: "Cargo deletado com sucesso" }); 
  } catch (error) {
    console.error('Erro ao deletar cargo:', error);
    res.status(404).json({ message: error.message });
  }
};

