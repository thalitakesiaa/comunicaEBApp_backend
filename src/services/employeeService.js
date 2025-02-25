const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const {
  validateEmployeeExistsById,
  validateEmployeeExistsEmail
} = require('../validators/employeeValidator');

const {
  validateUserId,
  validateUserEmailExists,
  validateExistingUserById,
 } = require('../validators/userValidator');
const { getUserById } = require('./userService');

const prisma = new PrismaClient();

const createEmployee = async (employeeData) => {
  try {
    const newEmployee = await prisma.employees.create({
      data: employeeData,
    });
    return newEmployee;
  } catch (error) {
    throw new Error('Error creating employee');
  }
};

const createEmployeeAndUser = async (employeeData) => {
  return await prisma.$transaction(async (tx) => {

    console.log('Dados: ', employeeData)

    console.log('Verificando se foi passada o user_id')
    if (employeeData.user_id) {
      console.log('Validando se existe usuário com o id: ', employeeData.user_id)
      await validateExistingUserById(employeeData.user_id);
      await validateExistingUserByEmail(employeeData.email);
    }


    console.log('Buscando posto de serviço')
    const serviceStation = await tx.service_stations.findUnique({
      where: { id: employeeData.service_station_id },
    });
    if (!serviceStation) {
      throw new Error(`Posto de serviço com ID ${employeeData.service_station_id} não encontrado.`);
    }

    console.log('Buscando cargo')
    const position = await tx.positions.findUnique({
      where: { id: employeeData.position_id },
    });
    console.log('Cargo do usuário: ', position)

    if (!position) {
      throw new Error(`Cargo com ID ${employeeData.position_id} não encontrado.`);
    }

    console.log('Criando Funcionário...');
    const newEmployee = await tx.employees.create({
      data: employeeData,
    });

    try {
      console.log('Criando Usuário...');

      const hashedPassword = await bcrypt.hash("padraoSenhaEb", 10);
      console.log('Senha Criptografada')

      console.log('Verificando email se email já está em uso por usuário')
      const existingUser = await tx.users.findUnique({
        where: { email: employeeData.email },
      });

      if (existingUser) {
        throw new Error(`O email ${employeeData.email} já está em uso para algum usuário.`);
      }

      console.log('Verificando registro se já está em uso por usuário')
      const existingRegister = await tx.employees.findFirst({
        where: { council_registration: employeeData.council_registration },
      });

      if (existingRegister) {
        throw new Error(`O Registro ${employeeData.council_registration} já está em uso para algum usuário.`);
      }

      console.log('Criando Usuário...')
      const newUser = await tx.users.create({
        data: {
          email: employeeData.email,
          password: hashedPassword,
          profile: position.name,
          employee_id: newEmployee.id,
          created_at: newEmployee.created_at || new Date(),
          updated_at: newEmployee.updated_at || new Date(),
        },
      });
      console.log('Usuário crado com sucesso')

      console.log('Atualizando Funcionario com o usuário criado')
      // Atualizando o funcionário com o ID do usuário criado
      const updatedEmployee = await tx.employees.update({
        where: { id: newEmployee.id },
        data: { user_id: newUser.id }, // Atualiza o funcionário com o ID do usuário
      });
      console.log(updatedEmployee)

      console.log('Funcionário criado com sucesso: ', updatedEmployee, newUser);

      return { updatedEmployee, newUser };
    } catch (error) {
      console.error("Erro ao criar usuário, desfazendo criação do funcionário:", error);
      throw error; 
    }
  });
};

const getEmployeeById = async (id) => {
  try {
    console.log('Buscando Funcionário com ID:', id)

    const employee = await prisma.employees.findUnique({
      where: {
        id: parseInt(id)
      },
    });

    if (!employee) {
      throw new Error(`Funcionário com ID ${id} não encontrado`);
    }

    console.log('Funcionario encontrado: ', employee)

    return employee;
  } catch (error) {
    throw new Error('Funcionário não encontrado');
  }
};

const updateEmployee = async (id, updatedData) => {

  console.log('Requisição: ', updatedData)

  try {
    console.log('Validando se o Funcionário existe com o ID: ', id)
    await validateEmployeeExistsById(id);
    console.log('Validação concluida')

    console.log('Buscando funcionário com o id:', id)
    const employee = await getEmployeeById(id);
    console.log('Funcionario encontrado: ', employee)

    console.log('Validando se o Usuário existe com o ID: ', employee.user_id)
    await validateUserId(employee.user_id);
    console.log('Validação concluida')

    console.log('Buscando usuario com o id:', employee.user_id);
    const userEmployee = await getUserById(employee.user_id);7
    console.log('Usuário encontrado: ', userEmployee)


    console.log('Iniciando validações de novo email')
    if (updatedData.email) {

      console.log('Validando se existe usuário com novo email: ', updatedData.email);
      await validateUserEmailExists(updatedData.email);

      console.log('Validando se existe funcionario com novo email: ', updatedData.email);
      await validateEmployeeExistsEmail(updatedData.email);
    }
    console.log('Validações finalizadas!')

    console.log('Atualizando Funcionário...')
    const updatedEmployee = await prisma.employees.update({
      where: { 
        id: parseInt(id)
      },
      data: updatedData,
    });
    console.log('Funcionário Atualizado!')

    console.log('Atualizando Usuário...')
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(employee.user_id) },
      data: { email:  updatedEmployee.email }
    });
    console.log('Usuário Atualizado!')

    console.log("Atualização de funcionário concluída: ", updatedEmployee, updatedUser)
    return updatedEmployee, updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteEmployee = async (id) => {

  try {
    console.log('Iniciando deleção...');

    await prisma.$transaction(async (prisma) => {
      
      console.log('Deletando usuário associado ao funcionário');
      await prisma.users.deleteMany({
        where: { employee_id: parseInt(id) }
      });
      console.log('Usuário deletado');

      console.log('Deletando funcionário');
      await prisma.employees.delete({
        where: { id: parseInt(id) }
      });
      console.log('Funcionário deletado');
    });

    console.log('Deleção finalizada');
  } catch (error) {
    console.error('Erro ao deletar funcionário:', error.message);
    throw new Error('Erro ao deletar funcionário');
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  createEmployee,
  createEmployeeAndUser,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
