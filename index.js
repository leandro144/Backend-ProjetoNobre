import express from 'express'
const app = express();
import cors from 'cors'
import './config/database.js'
import Route from './src/routes/routes.js'

app.use(cors({
    origin: 'https://frontend-projeto-nobre.vercel.app/'
}));
app.use(express.json());
const port = 3000

app.use('/dados', Route)
app.use(Route)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})