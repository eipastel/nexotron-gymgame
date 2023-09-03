const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

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
app.post('/register', (req, res) => {
    const user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    console.log(user)

    const sql = 'INSERT INTO usuarios SET ?';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Usuário cadastrado');
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});