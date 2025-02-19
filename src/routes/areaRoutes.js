const express = require('express');
const areaController = require('../controllers/areaController');
const { validateArea } = require('../validators/areaValidator');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Áreas
 *   description: Operações para gerenciar áreas no sistema
 */

/**
 * @swagger
 * /areas:
 *   post:
 *     summary: Criar uma nova área
 *     tags: [Áreas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da área
 *                 example: Assistencial
 *               description:
 *                 type: string
 *                 description: Descrição da área
 *                 example: Responsável por toda a assistencial de enfermagem
 *     responses:
 *       201:
 *         description: Área criada com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', async (req, res) => {
  try {
    validateArea(req.body);
    await areaController.createArea(req, res);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /areas:
 *   get:
 *     summary: Obter todas as áreas
 *     tags: [Áreas]
 *     responses:
 *       200:
 *         description: Lista de todas as áreas
 *       400:
 *         description: Áreas não encontradas
 *       500:
 *         description: Erro ao buscar áreas
 */
router.get('/', areaController.getAllAreas);

/**
 * @swagger
 * /areas/{id}:
 *   get:
 *     summary: Obter uma área específica pelo ID
 *     tags: [Áreas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da área a ser buscada
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalhes da área
 *       404:
 *         description: Área não encontrada
 *       500:
 *         description: Erro ao buscar a área
 */
router.get('/:id', areaController.getAreaById);

/**
 * @swagger
 * /areas/{id}:
 *   put:
 *     summary: Atualizar uma área existente
 *     tags: [Áreas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da área a ser atualizada
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da área
 *                 example: Assistencial
 *               description:
 *                 type: string
 *                 description: Descrição da área
 *                 example: Responsável por todas a assistencia de enfermagem
 *     responses:
 *       200:
 *         description: Área atualizada com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Área não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', async (req, res) => {
  try {
    validateArea(req.body);
    await areaController.updateArea(req, res);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /areas/{id}:
 *   delete:
 *     summary: Excluir uma área existente
 *     tags: [Áreas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da área a ser excluída
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Área excluída com sucesso
 *       404:
 *         description: Área não encontrada
 *       500:
 *         description: Erro ao excluir a área
 */
router.delete('/:id', areaController.deleteArea);

module.exports = router;
