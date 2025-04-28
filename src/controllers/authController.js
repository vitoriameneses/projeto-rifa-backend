const bcrypt = require('bcryptjs');

const { generateToken } = require('../services/authService');

const User = require('../services/usuarioService');
const Role = require('../services/papelService');

const cadastro = (req, res) => {
    const { username, password, roleId } = req.body;
    if (!username || !password || !roleId) {
        return res.status(400).send({ message: 'Nome de usuário, senha, e id do papel são obrigatórios.' });
    }
    const role = Role.getRoleById(roleId);
    if (!role) {
        return res.status(404).send({ message: 'Papel não encontrado.' });
    }
    const newUser = { username, password, roleId };
    const user = User.addUser(newUser);
    const token = generateToken(user);
    res.status(201).send({ auth: true, token });
};

const login = (req, res) => {
    const { username, password } = req.body;
    const user = User.getAllUsers().find(u => u.username === username);
    if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
    }
    const token = generateToken(user);
    res.status(200).send({ auth: true, token});
};

module.exports = { cadastro, login };