const express = require('express');
const router = express.Router();
const { validateCreateEmployee } = require('../validators/employeeValidator');
const employeeMiddleware = require('../middlewares/employeeMiddleware');
const {
  createEmployeeController,
  getAllEmployeesController,
  getEmployeeByIdController,
  updateEmployeeController,
  deleteEmployeeController,
} = require('../controllers/employeeController');

/**
 * @swagger
 * tags:
 *   name: Funcionários
 *   description: Operações relacionadas aos funcionários
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Criar um novo funcionário
 *     tags: [Funcionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Marcos santos
 *               email:
 *                 type: string
 *                 example: marcossantos@gmail.com
 *               council_registration:
 *                 type: integer
 *                 example: 12345
 *               working_hours:
 *                 type: integer
 *                 example: 40
 *               affiliation:
 *                 type: string
 *                 example: EBSERH
 *               service_station_id:
 *                 type: integer
 *                 example: 1
 *               position_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *       400:
 *         description: Dados de entrada inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', validateCreateEmployee, employeeMiddleware, createEmployeeController);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Obter todos os funcionários
 *     tags: [Funcionários]
 *     responses:
 *       200:
 *         description: Lista de funcionários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   council_registration:
 *                     type: integer
 *                   working_hours:
 *                     type: integer
 *                   affiliation:
 *                     type: string
 *                   location:
 *                     type: string
 *                   group_position_id:
 *                     type: integer
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', getAllEmployeesController); // Nova rota para buscar todos os funcionários

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Obter um funcionário pelo ID
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 council_registration:
 *                   type: integer
 *                 working_hours:
 *                   type: integer
 *                 affiliation:
 *                   type: string
 *                 location:
 *                   type: string
 *                 group_position_id:
 *                   type: integer
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', getEmployeeByIdController);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Atualizar as informações de um funcionário
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               council_registration:
 *                 type: integer
 *               working_hours:
 *                 type: integer
 *               affiliation:
 *                 type: string
 *               service_station_id:
 *                 type: integer
 *               position_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *       400:
 *         description: Dados de entrada inválidos
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', employeeMiddleware, updateEmployeeController);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Excluir um funcionário pelo ID
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionário excluído com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', deleteEmployeeController);

module.exports = router;
