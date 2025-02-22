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
  if (!position) {
    throw new Error('O nome do cargo é obrigatório.');
  }

  const existingPosition = await prisma.Position.findFirst({
    where: { position },
  });

  // Para atualização, ignoramos o próprio registro
  if (existingPosition && req.method === 'PUT' && existingPosition.id !== parseInt(req.params.id)) {
    throw new Error('Já existe um cargo com este nome.');
  }

  // Para criação, qualquer duplicação é inválida
  if (existingPosition && req.method === 'POST') {
    throw new Error('Já existe um cargo com este nome.');
  }
};


// Verificação de existência para exclusão
const checkPositionExists = async (id) => {
  const Position = await prisma.Position.findUnique({
    where: { id: parseInt(id) },
  });

  if (!Position) {
    throw new Error(`Grupo de cargos com ID ${id} não encontrado. Não é possível deletar.`);
  }
};

exports.validateCreatePosition = [
  body('name')
    .notEmpty().withMessage('O campo "position" é obrigatório.')
    .isLength({ min: 3 }).withMessage('O campo "position" deve ter pelo menos 3 caracteres.'),
  
  body('service_station_id')
    .isInt().withMessage('O ID do posto de serviço é obrigatório e deve ser um número inteiro.'),

  validate
];


// Validação para atualizar um cargo
exports.validateUpdatePosition = [
  param('id')
    .isInt({ gt: 0 }).withMessage('O ID deve ser um número inteiro positivo.'),
  body('position')
    .notEmpty().withMessage('O campo "position" é obrigatório.')
    .isLength({ min: 3 }).withMessage('O campo "position" deve ter pelo menos 3 caracteres.')
    .custom(checkDuplicatePosition), // Verificação de duplicação
  validate,
];

// Validação para deletar um cargo
exports.validateDeletePosition = [
  param('id')
    .isInt({ gt: 0 }).withMessage('O ID deve ser um número inteiro positivo.')
    .custom(checkPositionExists), 
  validate,
];

// Validação para buscar um cargo pelo ID
exports.validatePositionId = [
  param('id')
    .isInt({ gt: 0 }).withMessage('O ID deve ser um número inteiro positivo.'),
  validate,
];
