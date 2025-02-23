const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { validateEmployeeAndGetPosition } = require('../validators/userValidator');

const prisma = new PrismaClient();

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (id) => {
  return await prisma.users.findUnique({ where: { id: parseInt(id) } });
};

const createUser = async (userData) => {
  try {
    // Verifica se o e-mail já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new Error("E-mail já cadastrado.");
    }

    // Criptografa a senha, caso não tenha sido fornecida
    if (!userData.password) {
      userData.password = await bcrypt.hash("padraoSenhaEb", 10);
      console.log("Senha criptografada");
    }

    console.log(userData)

    // Obtém o cargo do funcionário
    const userPosition = await validateEmployeeAndGetPosition(userData.id);

    if (!userPosition) {
      throw new Error("Funcionário não encontrado ou sem cargo definido.");
    }

    console.log('Posição: ', userPosition)

    // Cria o usuário no banco de dados
    return await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        profile: userPosition.name,
        employee_id: userData.id,
        created_at: userData.created_at || new Date(),
        updated_at: userData.updated_at || new Date(),
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw new Error(error.message || "Erro interno ao criar usuário.");
  }
};

const updateUser = async (id, data) => {
  console.log('Iniciando update no banco para o ID:', id);
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data,
  });
  console.log('Update concluído:', user);
  return user;
};


const deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id: parseInt(id) } });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
