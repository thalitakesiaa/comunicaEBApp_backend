const express = require('express');
const { login } = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { loginSchema } = require('../validators/authValidator');


/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Rotas relacionadas a autenticação
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: E-mail ou senha inválidos
 */
const router = express.Router();

router.post('/login', validate(loginSchema), login);

module.exports = router;
