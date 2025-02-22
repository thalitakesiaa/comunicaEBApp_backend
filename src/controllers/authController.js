const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const SECRET_KEY = 'sua_chave_secreta_super_segura'; // Substitua por uma chave segura no ambiente de produção

// Login do usuário
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Recebendo requisição de login:', req.body); // Log da requisição

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }
    console.log('usuario: ', user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    // Gerar Token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: '2h' } // Token expira em 2 horas
    );

    res.json({ 
      message: 'Login bem-sucedido', 
      profile: user.profile, 
      token 
    });    
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = { login };
