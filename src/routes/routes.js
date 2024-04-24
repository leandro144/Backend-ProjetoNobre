import express from 'express'
import Data from  '../models/data.js'
import Users from '../models/sigup.js'
import bcrypt from 'bcrypt'
import jwt from  'jsonwebtoken'
import multer from 'multer'

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

// ROTAS PARA O LOGIN //

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({storage: storage});

router.post('/register', upload.single("file"),  async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  try {

    const { nome, email, password } = req.body;
    const Filename  = req.file.filename;
    console.log(Filename)

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new Users({
      nome: nome,
      email: email,
      password: hashedPassword,
      filePath: Filename
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
  
    const token = jwt.sign({ userId: user._id }, 'seuSegredo');


    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/usuarios', async (req, res) => {
  try {
      const data = await Users.find();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao buscar cursos' });
    }
})


export default router;