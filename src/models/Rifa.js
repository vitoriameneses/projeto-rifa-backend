import mongoose from 'mongoose';

const CotaSchema = new mongoose.Schema({
  numero: Number,
  disponivel: { type: Boolean, default: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  status: { type: String, enum: ['livre', 'reservada', 'paga'], default: 'livre' }
}, { _id: false });

const PremiacoesSchema = new mongoose.Schema({
  posicao: Number,
  titulo: String,
  descricao: String
}, { _id: false });

const RifaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  imagem: String,
  preco: { type: Number, required: true },
  dataSorteio: Date,
  metodoSorteio: { type: String, enum: ['automático', 'loteria_federal'] },
  cotas: [CotaSchema],
  premiacoes: [PremiacoesSchema],
  finalizada: { type: Boolean, default: false },
  ganhadorCota: Number
}, {
  timestamps: true
});

export default mongoose.model('Rifa', RifaSchema);