const express = require('express');
const router = express.Router();
const serviceStationController = require('../controllers/serviceStationController');

/**
 * @swagger
 * tags:
 *   name: Postos de Serviço
 *   description: Gerenciamento de postos de serviço
 */

/**
 * @swagger
 * /servicestation:
 *   post:
 *     summary: Criar um novo posto de serviço
 *     description: Adiciona um novo posto de serviço ao sistema.
 *     tags: [Postos de Serviço]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Posto Central"
 *               description:
 *                 type: string
 *                 example: "Posto de serviço responsável pela logística"
 *               area_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Posto de serviço criado com sucesso.
 *       400:
 *         description: Erro na validação dos dados.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', serviceStationController.createServiceStation);

/**
 * @swagger
 * /servicestation:
 *   get:
 *     summary: Listar todos os postos de serviço
 *     description: Retorna uma lista de todos os postos de serviço cadastrados.
 *     tags: [Postos de Serviço]
 *     responses:
 *       200:
 *         description: Lista de postos de serviço retornada com sucesso.
 *       404:
 *         description: Nenhum posto de serviço encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', serviceStationController.getAllServiceStations);

/**
 * @swagger
 * /servicestation/{id}:
 *   get:
 *     summary: Obter um posto de serviço por ID
 *     description: Retorna os detalhes de um posto de serviço específico pelo ID.
 *     tags: [Postos de Serviço]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do posto de serviço
 *     responses:
 *       200:
 *         description: Dados do posto de serviço retornados com sucesso.
 *       404:
 *         description: Posto de serviço não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/:id', serviceStationController.getServiceStationById);

/**
 * @swagger
 * /servicestation/{id}:
 *   put:
 *     summary: Atualizar um posto de serviço
 *     description: Atualiza as informações de um posto de serviço existente.
 *     tags: [Postos de Serviço]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do posto de serviço a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Posto Central Atualizado"
 *               description:
 *                 type: string
 *                 example: "Posto atualizado com novas funções"
 *               area_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Posto de serviço atualizado com sucesso.
 *       400:
 *         description: Erro na validação dos dados.
 *       404:
 *         description: Posto de serviço não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.put('/:id', serviceStationController.updateServiceStation);

/**
 * @swagger
 * /servicestation/{id}:
 *   delete:
 *     summary: Excluir um posto de serviço
 *     description: Remove um posto de serviço pelo ID.
 *     tags: [Postos de Serviço]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do posto de serviço a ser deletado.
 *     responses:
 *       200:
 *         description: Posto de serviço deletado com sucesso.
 *       404:
 *         description: Posto de serviço não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete('/:id', serviceStationController.deleteServiceStation);

module.exports = router;
