import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pedidoRoutes from './routes/pedido.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/pedidos', pedidoRoutes);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('🟢 Conectado ao MongoDB'))
.catch((err) => console.error('🔴 Erro ao conectar MongoDB:', err));

// Rota teste
app.get('/api/ping', (req, res) => {
  res.send('Backend funcionando ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));