import mongoose from 'mongoose';

const RifaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  preco: Number,
  dataSorteio: Date,
  metodoSorteio: { type: String, enum: ['automático', 'loteria_federal'] },
  cotas: [
    {
      numero: Number,
      disponivel: { type: Boolean, default: true },
      usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
    }
  ]
});

export default mongoose.model('Rifa', RifaSchema);