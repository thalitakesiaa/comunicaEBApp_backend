const express = require('express');
const cors = require('cors');
require('dotenv').config();
const setupSwagger = require('./config/swagger');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const positionRoutes = require('./routes/positionRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const areaRoutes = require('./routes/areaRoutes');
const serviceStationRoutes = require('./routes/serviceStationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Configura o Swagger
setupSwagger(app);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/servicestation', serviceStationRoutes)

// Rota principal
app.get('/', (req, res) => res.send('Comunica-EB API funcionando 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor rodando na porta ${PORT} e aceitando conexões externas!`));
