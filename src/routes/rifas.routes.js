import express from 'express';
import Rifa from '../models/Rifa.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const rifas = await Rifa.find();
  res.json(rifas);
});

export default router;