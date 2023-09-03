const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

// Sirva arquivos estáticos da pasta public
app.use(express.static('public'));

// Conecte-se ao banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'olamundopastel23!',
    database: 'usuarios'
});

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

  db.query(sql, (err, result) => {
      if (err) throw err;
      console.log('Tabela de usuários criada');
  });
});

// Crie uma rota para receber os dados do front-end
app.post('/register', async (req, res) => {
    const { name, username, email, password } = req.body;

    // primeiro, verifique se o usuário já existe
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE username = ? OR email = ?', [username, email]);

    if (rows.length) {
        return res.status(400).json({ error: 'Usuário já existente' });
    }

    // em seguida, crie o novo usuário
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        name,
        username,
        email,
        password: hashedPassword,
    };

    const [result] = await db.promise().query('INSERT INTO usuarios SET ?', user);

    console.log(result);
    res.json({ message: 'Usuário cadastrado' });
});


app.post('/login', async (req, res) => {
    // primeiro, recupere o usuário do banco de dados
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE username = ?', [req.body.username]);
    const user = rows[0];

    if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    // em seguida, verifique se a senha está correta
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(400).json({ error: 'Senha inválida' });
    }

    res.json({ message: 'Login bem-sucedido' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});