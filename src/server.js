const express = require('express');
const cors = require('cors');
require('dotenv').config();
const setupSwagger = require('./config/swagger');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const groupPositionRoutes = require('./routes/groupPositionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Configura o Swagger
setupSwagger(app);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/grouppositions', groupPositionRoutes);

// Rota principal
app.get('/', (req, res) => res.send('Comunica-EB API funcionando 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
