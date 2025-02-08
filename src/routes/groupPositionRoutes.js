const express = require('express');
const router = express.Router();
const groupPositionController = require('../controllers/groupPositionController');
const groupPositionValidator = require('../middlewares/groupPositionValidator');

/**
 * @swagger
 * tags:
 *   name: Cargos
 *   description: Rotas relacionadas aos cargos dos funcionários
 */

/**
 * @swagger
 * /grouppositions:
 *   post:
 *     summary: Cria um novo Group Position
 *     tags: [Cargos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - position
 *             properties:
 *               position:
 *                 type: string
 *     responses:
 *       201:
 *         description: Group Position criado com sucesso.
 *       400:
 *         description: Dados inválidos ou duplicados.
 */
router.post(
 '/',
  groupPositionValidator.validateCreateGroupPosition,
  groupPositionController.createGroupPosition
);

/**
 * @swagger
 * /grouppositions:
 *   get:
 *     summary: Lista todos os Group Positions
 *     tags: [Cargos]
 *     responses:
 *       200:
 *         description: Lista de Group Positions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   position:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get(
  '/',
  groupPositionController.getAllGroupPositions
);

/**
 * @swagger
 * /grouppositions/{id}:
 *   get:
 *     summary: Busca um Group Position por ID
 *     tags: [Cargos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Group Position
 *     responses:
 *       200:
 *         description: Group Position encontrado.
 *       404:
 *         description: Group Position não encontrado.
 */
router.get(
  '/:id',
  groupPositionValidator.validateGroupPositionId,
  groupPositionController.getGroupPositionById
);

/**
 * @swagger
 * /grouppositions/{id}:
 *   put:
 *     summary: Atualiza um Group Position existente
 *     tags: [Cargos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Group Position
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Group Position atualizado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Group Position não encontrado.
 */
router.put(
  '/:id',
  groupPositionValidator.validateUpdateGroupPosition,
  groupPositionController.updateGroupPosition
);

/**
 * @swagger
 * /grouppositions/{id}:
 *   delete:
 *     summary: Exclui um Group Position
 *     tags: [Cargos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Group Position
 *     responses:
 *       204:
 *         description: Group Position excluído com sucesso.
 *       404:
 *         description: Group Position não encontrado.
 */
router.delete(
  '/:id',
  groupPositionValidator.validateGroupPositionId,
  groupPositionController.deleteGroupPosition
);

module.exports = router;
