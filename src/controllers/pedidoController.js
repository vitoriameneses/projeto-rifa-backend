import Pedido from '../models/Pedido.js';
import Rifa from '../models/Rifa.js';

export const criarPedido = async (req, res) => {
  try {
    const { rifaId, cotas, formaPagamento, usuarioId } = req.body;

    const rifa = await Rifa.findById(rifaId);
    if (!rifa) return res.status(404).json({ mensagem: 'Rifa não encontrada' });

    // Verifica se as cotas estão disponíveis
    const indisponiveis = cotas.filter((numero) => {
      const cota = rifa.cotas.find((c) => c.numero === numero);
      return !cota || cota.status !== 'livre';
    });

    if (indisponiveis.length > 0) {
      return res.status(400).json({ mensagem: 'Algumas cotas estão indisponíveis', cotas: indisponiveis });
    }

    // Marca as cotas como reservadas
    rifa.cotas = rifa.cotas.map((cota) => {
      if (cotas.includes(cota.numero)) {
        return {
          ...cota.toObject(),
          status: 'reservada',
          usuarioId
        };
      }
      return cota;
    });

    await rifa.save();

    const valorTotal = cotas.length * rifa.preco;

    const pedido = new Pedido({
      usuarioId,
      rifaId,
      cotas,
      valorTotal,
      formaPagamento,
      status: 'pendente'
    });

    await pedido.save();

    res.status(201).json({ mensagem: 'Pedido criado com sucesso', pedido });

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ mensagem: 'Erro ao criar pedido' });
  }
};