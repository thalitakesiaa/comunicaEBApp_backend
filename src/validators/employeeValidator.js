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
  body('location').isString().withMessage('Localização deve ser uma string'),
  body('group_position_id').isInt().withMessage('ID do grupo de cargos é obrigatório'),
  body('user_id').optional().isInt().withMessage('ID do usuário deve ser um número inteiro')
    .custom(async (user_id) => {
      if (user_id) {
        const existingUser = await prisma.user.findUnique({ where: { id: user_id } });
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

module.exports = {
  validateCreateEmployee,
};
