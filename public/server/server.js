require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const TOKEN_KEY = process.env.TOKEN_KEY;

const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) throw err;

    const sqlUsers = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            username VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255)
        )
    `;

    db.query(sqlUsers, (err, result) => {
        if (err) throw err;
    });

    const sqlTasks = `
        CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            description VARCHAR(255),
            FOREIGN KEY (user_id) REFERENCES usuarios(id)
        )
    `;

    db.query(sqlTasks, (err, result) => {
        if (err) throw err;
    });
});

app.post('/register', async (req, res) => {
    const { name, username, email, password } = req.body;

    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE username = ? OR email = ?', [username, email]);
    if (rows.length) {
        return res.status(409).json({ error: 'USER_ALREADY_EXISTS' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, username, email, password: hashedPassword };
    const [result] = await db.promise().query('INSERT INTO usuarios SET ?', user);

    res.json({ message: 'Usuário cadastrado com sucesso!' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE username = ?', [username]);
    const user = rows[0];

    if (!user) {
        return res.status(401).json({ error: 'USER_NOT_FOUND' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(401).json({ error: 'INVALID_PASSWORD' });
    }

    const token = jwt.sign({ id: user.id }, TOKEN_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login realizado com sucesso!', token: token });
});

app.post('/tasks', async (req, res) => {
    const token = req.headers['authorization'];
    const { description } = req.body;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        const userId = decoded.id;

        await db.promise().query('INSERT INTO tasks (user_id, description) VALUES (?, ?)', [userId, description]);
        res.json({ message: 'Tarefa adicionada com sucesso!' });
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const token = req.headers['authorization'];
    const taskId = req.params.id;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        const userId = decoded.id;

        await db.promise().query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
        res.json({ message: 'Tarefa excluída com sucesso!' });
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
});

app.get('/tasks', async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        const userId = decoded.id;

        const [rows] = await db.promise().query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
        res.json({ tasks: rows });
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000: http://localhost:3000');
});
