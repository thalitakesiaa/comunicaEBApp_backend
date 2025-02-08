const { body, param, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Middleware para verificar erros de validação
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Verificação de duplicação
const checkDuplicatePosition = async (position, { req }) => {
  const existingGroup = await prisma.groupPosition.findFirst({
    where: { position },
  });

  // Para atualização, ignoramos o próprio registro
  if (existingGroup && req.method === 'PUT' && existingGroup.id !== parseInt(req.params.id)) {
    throw new Error('Já existe um cargo com este nome.');
  }

  // Para criação, qualquer duplicação é inválida
  if (existingGroup && req.method === 'POST') {
    throw new Error('Já existe um cargo com este nome.');
  }
};

// Verificação de existência para exclusão
const checkGroupPositionExists = async (id) => {
  const groupPosition = await prisma.groupPosition.findUnique({
    where: { id: parseInt(id) },
  });

  if (!groupPosition) {
    throw new Error(`Grupo de cargos com ID ${id} não encontrado. Não é possível deletar.`);
  }
};

// Validação para criar um novo cargo
exports.validateCreateGroupPosition = [
  body('position')
    .notEmpty().withMessage('O campo "position" é obrigatório.')
    .isLength({ min: 3 }).withMessage('O campo "position" deve ter pelo menos 3 caracteres.')
    .custom(checkDuplicatePosition), // Verificação de duplicação
  validate,
];

// Validação para atualizar um cargo
exports.validateUpdateGroupPosition = [
  param('id')
    .isInt({ gt: 0 }).withMessage('O ID deve ser um número inteiro positivo.'),
  body('position')
    .notEmpty().withMessage('O campo "position" é obrigatório.')
    .isLength({ min: 3 }).withMessage('O campo "position" deve ter pelo menos 3 caracteres.')
    .custom(checkDuplicatePosition), // Verificação de duplicação
  validate,
];

// Validação para deletar um cargo
exports.validateDeleteGroupPosition = [
  param('id')
    .isInt({ gt: 0 }).withMessage('O ID deve ser um número inteiro positivo.')
    .custom(checkGroupPositionExists), 
  validate,
];

// Validação para buscar um cargo pelo ID
exports.validateGroupPositionId = [
  param('id')
    .isInt({ gt: 0 }).withMessage('O ID deve ser um número inteiro positivo.'),
  validate,
];
