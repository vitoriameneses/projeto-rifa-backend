import Rifa from '../models/Rifa.js';

export const criarRifa = async (req, res) => {
  try {
    const { titulo, descricao, preco, metodoSorteio, totalCotas } = req.body;

    const cotas = Array.from({ length: totalCotas }, (_, i) => ({
      numero: i + 1
    }));

    const novaRifa = new Rifa({
      titulo,
      descricao,
      preco,
      metodoSorteio,
      cotas
    });

    await novaRifa.save();
    res.status(201).json(novaRifa);
  } catch (error) {
    console.error('Erro ao criar rifa:', error);
    res.status(500).json({ mensagem: 'Erro ao criar rifa' });
  }
};