const { body } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const validateCreateEmployee = [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Formato de e-mail inválido')
    .custom(async (email) => {
      const existingEmployee = await prisma.employees.findUnique({ where: { email } });
      if (existingEmployee) {
        throw new Error('E-mail já está em uso');
      }
    }),
  body('council_registration').isInt().withMessage('Registro no conselho deve ser um número'),
  body('working_hours').isInt().withMessage('Horas de trabalho devem ser um número inteiro'),
  body('affiliation').isString().withMessage('Afilição deve ser uma string'),
  body('service_station_id').isInt().withMessage('ID do posto de serviço é obrigatório'),
  body('position_id').isInt().withMessage('ID do grupo de cargos é obrigatório'),
  body('user_id').optional().isInt().withMessage('ID do usuário deve ser um número inteiro')
    .custom(async (user_id) => {
      if (user_id) {
        const existingUser = await prisma.users.findUnique({ where: { id: user_id } });
        if (!existingUser) {
          throw new Error('Usuário não encontrado');
        }
      }

      const existingEmployee = await prisma.employees.findUnique({
        where: { user_id }
      });
      
      if (existingEmployee) {
        throw new Error('ID de usuário já está associado a outro funcionário');
      }
    }),
];

const validateEmployeeExistsById = async (id) => {

  console.log('Validando funcionário com o id: ', id)
  const employee = await prisma.employees.findUnique({
    where: {
      id: parseInt(id)
    },
  });

  console.log('Funionário validado')

  if (!employee) {
    throw new Error('Funcionário não encontrado com o ID: ', id);
  }

  return employee;
};

const validateEmployeeExistsEmail= async (emailEmployee) => {
  console.log('Validando funcionário com o email: ', emailEmployee)
  const employee = await prisma.employees.findUnique({
    where: {
      email: emailEmployee.trim().toLowerCase()
    }
  });

  console.log(employee)

  if (employee) {
    throw new Error('Funcionário ja existe com o email ', emailEmployee);
  }

  console.log('Funcionário valdiado')
  return employee;
};

module.exports = {
  validateCreateEmployee,
  validateEmployeeExistsEmail,
  validateEmployeeExistsById
};
