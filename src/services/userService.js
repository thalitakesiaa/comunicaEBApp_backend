const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { validateEmployeeAndGetPosition } = require('../validators/userValidator');

const prisma = new PrismaClient();

const getAllUsers = async () => {
  try {
    console.log('Buscando todos os usuários...');

    const users = await prisma.users.findMany();

    if (!users || users.length === 0) {
      console.log('Nenhum usuário encontrado.');
      return [];
    }

    console.log(`Foram encontrados ${users.length} usuário(s).`);
    return users;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw new Error('Erro ao buscar usuários no banco de dados.');
  }
};


const getUserById = async (userId) => {
  try {
    console.log(`Buscando usuário com ID: ${userId}`);

    const user = await prisma.users.findUnique({ where: { id: parseInt(userId) } });
    console.log(user);

    if (!user) {
      console.warn(`Nenhum usuário encontrado com ID: ${userId}`);
      return null;
    }

    return user;
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID ${id}:`, error);
    throw new Error('Erro ao buscar usuário no banco de dados.');
  }
};


const createUser = async (userData) => {
  try {
    // Verifica se o e-mail já existe
    const existingUser = await prisma.users.findUnique({
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
    return await prisma.users.create({
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
  console.log('Iniciando update do usuario para o ID:', id);

  return await prisma.$transaction(async (prisma) => {

    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data,
    });

    console.log('Usuário atualizado:', updatedUser);

    console.log('Atualizando funcionário vinculado')
      if (updatedUser.employee_id) {
        const employeeUpdateData = {
          email: data.email,
          updated_at: new Date(),
      };

      const updatedEmployee = await prisma.employees.update({
        where: { id: updatedUser.employee_id },
        data: employeeUpdateData,
      });

      console.log('Funcionário atualizado:', updateUser, updatedEmployee);
      return { updatedUser, updatedEmployee };
    }

    return { updatedUser };
  });
};


const deleteUser = async (id) => {
  console.log(`Validando exclusão do usuário com ID: ${id}`);

  // Validação: Verifica se o ID é válido
  const userId = parseInt(id);
  if (isNaN(userId) || userId < 1) {
    console.error(`ID inválido fornecido: ${id}`);
    throw new Error("ID do usuário deve ser um número inteiro positivo.");
  }

  // Verifica se o usuário existe antes de deletar
  const existingUser = await prisma.users.findUnique({ where: { id: userId } });
  if (!existingUser) {
    console.warn(`Usuário não encontrado com ID: ${id}`);
    throw new Error("Usuário não encontrado.");
  }

  console.log(`Excluindo usuário com ID: ${id}`);
  try {

  await prisma.$transaction(async (prisma) => {
    if (existingUser.employee) {
      console.log(`Funcionário encontrado! ID: ${existingUser.employee.id} → Removendo...`);
      await prisma.employees.delete({ where: { id: existingUser.employee.id } });
    }

    console.log(`Deletando usuário com ID: ${id}`);
    await prisma.users.delete({ where: { id: parseInt(id) } });
  });

    console.log(`Exclusão concluída.`);
    return { message: "Usuário e funcionário (se existia) deletados com sucesso." };
  } catch (error) {
    console.error(`Erro ao excluir usuário com ID ${id}:`, error.message);
    throw new Error("Erro ao excluir usuário.");
  }
};


module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
