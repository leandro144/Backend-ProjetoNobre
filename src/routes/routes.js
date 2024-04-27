import express from 'express'
import Admin from  '../models/admin.js'
import Users from '../models/sigup.js'
import bcrypt from 'bcrypt'
import jwt from  'jsonwebtoken'
import multer from 'multer'

const router = express.Router();


// LOGIN PARA ADMIN //

router.post('/register-admin', async (req, res) => {
  
  try {
    
    const { email, password} = req.body

    const existingAdmin = await Admin.findOne({ email })

    if(existingAdmin) {
      return res.status(400).json({message: 'Email já está em uso'})
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = new Admin({
      email: email,
      password: hashedPassword
    })

    await newAdmin.save()
    res.status(201).json({ message: 'Administrador registrado com sucesso' });

  } catch (error) {
    console.error('Erro ao registrar administrador:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

router.post('/login-admin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
  
    const token = jwt.sign({ adminId: admin._id }, 'seuSegredo');

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao fazer login de administrador:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


// ROTAS PARA O LOGIN DO USUÁRIO //

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/register', upload.single("file"), async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const { nome, email, password } = req.body;
    const Filename = req.file.filename;
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

const decodeAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'seuSegredo');
    return decoded.userId;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

router.get('/user-data', async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }

    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Formato inválido do token de autenticação' });
    }

    const authToken = tokenParts[1];

    const userId = decodeAuthToken(authToken);

    const userData = await Users.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: 'Dados do aluno não encontrados' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error('Erro ao buscar dados do aluno:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});
