const { date } = require('joi');
const { 
  validateEmail,
  validateUserId,
  validatePassword,
  validateEmailNotInUse
} = require('..//validators/userValidator');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(500).json({ message: 'Erro interno do servidor ao buscar usuários.' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

const createUser = async (req, res) => {
  try {

    await validateEmail()(req, res, () => {});
    await validatePassword()(req, res, () => {});

    const { email, password, profile, employee_id } = req.body;

    const user = await userService.createUser({
      email,
      password,
      //profile,
      employee_id,
      created_at: new Date(),
      update_at: new Date(),
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
};

const updateUser = async (req, res) => {
  try {
    let updateData = { ...req.boby };
    console.log('Iniciando validação do ID do usuário...');
    await validateUserId()(req, res, () => {});
    console.log('Validação do ID concluída.');

    if (req.body.email) {
      console.log('Validando e-mail...');
      await validateEmail()(req, res, () => {});
      await validateEmailNotInUse(req.body.email, req);
      console.log('Validação do e-mail concluída.');
    }

    if (req.body.password) {
      console.log('Validando senha...');
      await validatePassword()(req, res, () => {});
      console.log('Validação da senha concluída.');
    }

    console.log('Verificando erros de validação...');
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('Erros de validação encontrados:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    console.log('Atualizando usuário no banco de dados...');
     // 🔹 Se a senha estiver sendo alterada, criptografa antes de salvar
    if (req.body.password) {
      console.log('Criptografando a nova senha...');
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(req.body.password, salt);
      console.log('Senha criptografada com sucesso.');
    }
    const user = await userService.updateUser(req.params.id, updateData);
    console.log('Usuário atualizado com sucesso:', user);

    res.json(user);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};



const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(`Recebida solicitação para excluir usuário com ID: ${id}`);

  try {
    const deletedUser = await userService.deleteUser(id);

    console.log(`Usuário deletado com sucesso:`, deletedUser);
    res.status(200).json({ message: "Usuário deletado com sucesso.", user: deletedUser });
  } catch (error) {
    console.error(`Erro ao deletar usuário com ID ${id}:`, error.message);

    // Tratamento específico para erro de "usuário não encontrado"
    if (error.message.includes("Usuário não encontrado")) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(500).json({ message: "Erro ao deletar usuário." });
  }
};


module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };