import express from 'express';
import cors from 'cors';
import './config/database.js';
import Route from './src/routes/routes.js';

const app = express();

app.use(express.json());
const port = 3000;
app.use(cors());

app.use('/dados', Route);
app.use(Route);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
