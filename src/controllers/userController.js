const { date } = require('joi');
const { 
  validateEmail,
  validateUserId,
  validatePassword,
  validateEmailNotInUse
} = require('..//validators/userValidator');
const userService = require('../services/userService');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json(user);
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
    const user = await userService.updateUser(req.params.id, req.body);
    console.log('Usuário atualizado com sucesso:', user);

    res.json(user);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};



const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };