// src/validators/UserValidate.js

const { body, param, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const validateEmail = () => {
  return body('email')
    .isEmail()
    .withMessage('O e-mail fornecido não é válido.')
    .custom(async (email, { req }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user && req.method === 'POST') {
        throw new Error('E-mail já está em uso.');
      }
    });
};

const validateEmailNotInUse = async (email, req) => {
  console.log('Verificando se o e-mail já está em uso:', email);
  const user = await prisma.user.findUnique({
    where: { email },
  });
  console.log('Resultado da busca do e-mail:', user);

  if (user && user.id !== parseInt(req.params.id)) {
    throw new Error('Este e-mail já está em uso por outro usuário.');
  }
};



const validatePassword = () => {
  return body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('A senha deve ter pelo menos 6 caracteres.');
};

const validateUserId = () => {
  return param('id')
    .isInt({ min: 1 })
    .withMessage('O ID do usuário deve ser um número inteiro positivo.')
    .custom(async (id) => {
      const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
      if (!user) {
        throw new Error('Usuário não encontrado.');
      }
    });
};

// Verifica se o usuário já existe
const validateUserEmailExists = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    throw new Error('Usuário já existe com este e-mail.');
  }
};

const validateEmployeeAndGetGroupPosition = async (employee_id) => {
  const employee = await prisma.employees.findUnique({
    where: { id: employee_id },
    include: { group_position: true },
  });
  if (!employee) {
    throw new Error('Funcionário não encontrado.');
  }

  return employee.group_position;
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateEmail,
  validateEmailNotInUse,
  validatePassword,
  validateUserId,
  validateUserExists: validateUserEmailExists,
  validateEmployeeAndGetGroupPosition,
  handleValidationErrors,
};
