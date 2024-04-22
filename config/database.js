import mongoose from "mongoose";

const url = 'mongodb+srv://Nobre:iMxlx3NppsGPYZ4r@cluster0.3gl5evd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(url)
  .then(() => console.log('Conexão com MongoDB estabelecida com sucesso!'))
  .catch(err => console.error('Erro ao conectar com MongoDB:', err));