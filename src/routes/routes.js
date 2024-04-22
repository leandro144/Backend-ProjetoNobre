import express from 'express'
import Data from  '../models/data.js'

const router = express.Router();

router.post('/', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    const { nome, idade, cpf, endereco, cep } = req.body

    const newData = new Data({
        nome: nome,
        idade: idade,
        cpf: cpf,
        endereco: endereco,
        cep: cep
    })

    newData.save()
    .then(() => res.status(201).json({message: 'Dados enviados com sucesso!'}))
    .catch(() => res.status(500).json({error: "Erro ao enviar dados"}))
    
});

router.get('/', async (req, res) => {
    try {
        const data = await Data.find();
        return res.status(200).json(data);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        return res.status(500).json({ error: 'Erro interno do servidor ao buscar cursos' });
      }
})

export default router;