import { Router } from 'express';

const router = Router;
const authController = require('../controllers/authController');

router.post('/cadastro', authController.cadastro);
router.post('/login', authController.login);

module.exports = router;