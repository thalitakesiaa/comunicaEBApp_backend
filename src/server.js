const express = require('express');
const cors = require('cors');
require('dotenv').config();
const setupSwagger = require('./config/swagger');

const app = express();
app.use(cors());
app.use(express.json());

// Configura o Swagger
setupSwagger(app);

// Rota principal
app.get('/', (req, res) => res.send('Comunica-EB API funcionando 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
