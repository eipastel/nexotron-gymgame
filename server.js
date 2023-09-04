// Variáveis iniciais
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

// Pasta public para arquivos estáticos
app.use(express.static('public'));

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'containers-us-west-195.railway.app',
    user: 'root',
    password: '4jRtMH7nnFg7aEg8kWDY',
    database: 'railway',
    port: 5474
});

// Ainda comunicação com o banco de dados, avisar caso haja um erro, se não tiver erros, criar uma tabela (também caso não exista)
db.connect((err) => {
  if (err) throw err;
  // Conectado com sucesso ao banco de dados.

  const sql = `
      CREATE TABLE IF NOT EXISTS usuarios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          username VARCHAR(255),
          email VARCHAR(255),
          password VARCHAR(255)
      )
  `;

  // Criar tabela de usuários, se não existir.
  db.query(sql, (err, result) => {
      if (err) throw err;
  });
});

// Post para registro do usuário
app.post('/register', async (req, res) => {
    const { name, username, email, password } = req.body;

    // Verificando se o usuário já existe
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE username = ? OR email = ?', [username, email]);
    if (rows.length) {
        // Lançando o erro caso seja usuário já existente
        return res.status(409).json({ error: 'USER_ALREADY_EXISTS' });
    }

    // Criando o novo usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, username, email, password: hashedPassword };
    const [result] = await db.promise().query('INSERT INTO usuarios SET ?', user);

    res.json({ message: 'Usuário cadastrado com sucesso!' });
});

// Post para login do usuário
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Verificando o banco de dados se o usuário existe
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE username = ?', [username]);
    const user = rows[0];

    // Caso não exista, lançando o erro de usuário não encontrado
    if (!user) {
        return res.status(401).json({ error: 'USER_NOT_FOUND' });
    }

    // Comparando a senha criptografada para ver se a senha está correta
    const validPassword = await bcrypt.compare(password, user.password);

    // Caso não esteja, lançando o erro de senha inválida.
    if (!validPassword) {
        return res.status(401).json({ error: 'INVALID_PASSWORD' });
    }

    res.json({ message: 'Login realizado com sucesso!' });
});

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000: http://localhost:3000');
});