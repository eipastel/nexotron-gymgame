const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta public
app.use(express.static('public'));

// Conectar ao banco de dados
const db = mysql.createConnection({
    host: 'containers-us-west-195.railway.app',
    user: 'root',
    password: '4jRtMH7nnFg7aEg8kWDY',
    database: 'railway',
    port: 5474
});

// Lidar com a conexão ao banco de dados
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados');

  const sql = `
      CREATE TABLE IF NOT EXISTS usuarios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          username VARCHAR(255),
          email VARCHAR(255),
          password VARCHAR(255)
      )
  `;

  // Criar tabela de usuários, se não existir
  db.query(sql, (err, result) => {
      if (err) throw err;
      console.log('Tabela de usuários criada');
  });
});

// Lidar com o registro de usuário
app.post('/register', async (req, res) => {
    const { name, username, email, password } = req.body;

    // Primeiro, verifique se o usuário já existe
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE username = ? OR email = ?', [username, email]);

    if (rows.length) {
        return res.status(400).json({ error: 'Usuário já existente' });
    }

    // Em seguida, crie o novo usuário
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { name, username, email, password: hashedPassword };

    const [result] = await db.promise().query('INSERT INTO usuarios SET ?', user);

    console.log(result);
    res.json({ message: 'Usuário cadastrado' });
});

// Lidar com o login do usuário
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Primeiro, recupere o usuário do banco de dados
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE username = ?', [username]);
    const user = rows[0];

    if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    // Em seguida, verifique se a senha está correta
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({ error: 'Senha inválida' });
    }

    res.json({ message: 'Login bem-sucedido' });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});