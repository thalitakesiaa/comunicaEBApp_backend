// src/validators/UserValidate.js

const { body, param, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

const validateEmail = () => {
  return body('email')
    .isEmail()
    .withMessage('O e-mail fornecido não é válido.')
    .custom(async (email, { req }) => {
      const user = await prisma.users.findFirst({ where: { email: email } });
      if (user && req.method === 'POST') {
        throw new Error('E-mail já está em uso.');
      }
    });
};

const validateEmailNotInUse = async (emailUser, req) => {
  console.log('Verificando se o e-mail já está em uso:', emailUser);
  const user = await prisma.users.findFirst({
    where: { email: emailUser },
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
    .trim()
    .isInt({ min: 1 })
    .withMessage('O ID do usuário deve ser um número inteiro positivo.')
    .custom(async (id) => {
      console.log(`Validando usuário com ID: ${id}`);

      try {
        const user = await prisma.users.findUnique({
          where: { id: parseInt(id) },
        });

        if (!user) {
          console.warn(`Usuário não encontrado com ID: ${id}`);
          return Promise.reject(new Error('Usuário não encontrado.'));
        }

        console.log(`Usuário validado com sucesso: ${id}`);
        return true;
      } catch (error) {
        console.error(`Erro ao buscar usuário no banco: ${error.message}`);
        throw new Error('Erro ao validar o usuário.');
      }
    });
};

// Verifica se o usuário já existe
const validateUserEmailExists = async (email) => {
  console.log('Validando email do usuário...')
  const user = await prisma.users.findFirst({
    where: {
      email: email.trim().toLowerCase()
    }
  });
    
  console.log(user);
  
  if (user) {
    throw new Error('Usuário já existe com este e-mail.');
  }
  console.log('Validação concluída')
  return user;
};

const validateExistingUserById = async (userId) => {
  const existingUser = await prisma.users.findUnique({
    where: { user_id: userId },
  });

  if (existingUser) {
    throw new Error(`Já existe um usuário associado ao funcionário com ID ${employeeId}.`);
  }
};


const validateEmployeeAndGetPosition = async (employee_id) => {
  console.log('Validando funcionário com ID: ', employee_id)

  const employee = await prisma.employees.findUnique({
    where: { id: employee_id },
    include: { position: true },
  });
  if (!employee) {
    throw new Error('Funcionário não encontrado.');
  }

  return employee.position;
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
  validateUserEmailExists,
  validateEmployeeAndGetPosition,
  validateExistingUserById,
  handleValidationErrors,
};
