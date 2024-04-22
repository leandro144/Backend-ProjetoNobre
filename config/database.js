import mongoose from "mongoose";

const url = 'mongodb+srv://contato:YYO4kYuUyMqTDifW@cluster0.3gl5evd.mongodb.net/';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com MongoDB estabelecida com sucesso!'))
  .catch(err => console.error('Erro ao conectar com MongoDB:', err));