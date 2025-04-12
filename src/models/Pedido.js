import mongoose from 'mongoose';

const PedidoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  rifaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rifa',
    required: true
  },
  cotas: [{ type: Number, required: true }],
  valorTotal: { type: Number, required: true },
  formaPagamento: {
    type: String,
    enum: ['pix', 'cartao'],
    required: true
  },
  status: {
    type: String,
    enum: ['pendente', 'pago', 'cancelado'],
    default: 'pendente'
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Pedido', PedidoSchema);