import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senhaHash: { type: String, required: true },
  rifasCompradas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rifa' }],
  cotasReservadas: [{ type: Number }],
  papel: { type: String, enum: ['admin', 'cliente'], default: 'cliente' }
}, {
  timestamps: true
});

export default mongoose.model('Usuario', UsuarioSchema);