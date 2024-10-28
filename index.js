import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});