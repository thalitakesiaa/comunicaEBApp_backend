const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { validateEmployeeAndGetGroupPosition } = require('../validators/userValidator');

const prisma = new PrismaClient();

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id: parseInt(id) } });
};

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  userData.password = hashedPassword;

  const userGroupPosition = await validateEmployeeAndGetGroupPosition(userData.employee_id)
  console.log(userGroupPosition)

  return await prisma.user.create({
    data: {
      email: userData.email, 
      password: userData.password,
      profile: userGroupPosition.position,
      employee_id: userData.employee_id,
      created_at: userData.created_at,
      updated_at: userData.update_at
    },
  });
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
