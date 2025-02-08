const groupPositionService = require('../services/groupPositionService');

exports.createGroupPosition = async (req, res) => {
  try {
    const { position } = req.body;
    const newGroupPosition = await groupPositionService.createGroupPosition(position);
    res.status(201).json({ message: 'Grupo de cargos criado com sucesso', data: newGroupPosition });
  } catch (error) {
    console.error('Erro ao criar GroupPosition:', error);
    res.status(500).json({ message: 'Erro interno ao criar o grupo de cargos. Tente novamente mais tarde.' });
  }
};

exports.getAllGroupPositions = async (req, res) => {
  try {
    const groupPositions = await groupPositionService.getAllGroupPositions();
    res.status(200).json({ message: 'Grupos de cargos recuperados com sucesso', data: groupPositions });
  } catch (error) {
    console.error('Erro ao buscar GroupPositions:', error);
    res.status(500).json({ message: 'Erro interno ao buscar os grupos de cargos. Tente novamente mais tarde.' });
  }
};

exports.getGroupPositionById = async (req, res) => {
  try {
    const { id } = req.params;
    const groupPosition = await groupPositionService.getGroupPositionById(parseInt(id));

    if (!groupPosition) {
      return res.status(404).json({ message: `Grupo de cargos com ID ${id} não encontrado.` });
    }
    res.status(200).json({ message: 'Grupo de cargos encontrado com sucesso', data: groupPosition });
  } catch (error) {
    console.error('Erro ao buscar GroupPosition:', error);
    res.status(500).json({ message: 'Erro interno ao buscar o grupo de cargos. Tente novamente mais tarde.' });
  }
};

exports.updateGroupPosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { position } = req.body;
    const updatedGroupPosition = await groupPositionService.updateGroupPosition(parseInt(id), position);

    if (!updatedGroupPosition) {
      return res.status(404).json({ message: `Grupo de cargos com ID ${id} não encontrado para atualização.` });
    }
    res.status(200).json({ message: 'Grupo de cargos atualizado com sucesso', data: updatedGroupPosition });
  } catch (error) {
    console.error('Erro ao atualizar GroupPosition:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar o grupo de cargos. Tente novamente mais tarde.' });
  }
};

exports.deleteGroupPosition = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await groupPositionService.deleteGroupPosition(parseInt(id));

    if (!result) {
      return res.status(404).json({ message: `Grupo de cargos com ID ${id} não encontrado para exclusão.` });
    }
    res.status(204).json({ message: 'Grupo de cargos excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar GroupPosition:', error);
    res.status(500).json({ message: 'Erro interno ao excluir o grupo de cargos. Tente novamente mais tarde.' });
  }
};
