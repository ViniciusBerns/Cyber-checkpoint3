const express = require('express');
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Página simples
app.get('/', (req, res) => {
  res.send(`
    <h1>ClickSeguro</h1>
    <form method="POST" action="/login">
      <input name="username" placeholder="user" />
      <input name="password" placeholder="pass" />
      <button type="submit">Login</button>
    </form>
  `);
});

// Vulnerabilidade proposital: refletir entrada sem sanitização (XSS)
app.get('/search', (req, res) => {
  const q = req.query.q || '';
  res.send(`<p>Resultados para: ${q}</p>`); // intencionalmente inseguro
});

// Vulnerabilidade proposital: SQLi-like (simulada)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Simula checagem insegura (não é SQL real, mas permite padrões que ZAP tenta explorar)
  if (username && password) {
    res.send(`Bem-vindo, ${username}`);
  } else {
    res.status(400).send('Credenciais ausentes');
  }
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
