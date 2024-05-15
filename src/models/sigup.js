import mongoose, { Schema } from "mongoose";

const siginSchema = new Schema({
    nome: String,
    email: String,
    password: String,
    filePath: String,
<<<<<<< HEAD
    materia: String,
    nota: Number
=======
    totalAttendance: String,
    totalFault: Number,
    Ativ1: Number,
    ativ2: Number,
    Prova: Number,
    media: Number,
    resultFinal: String
>>>>>>> feeb2d9cab7c73565154900a5e6eb5bcecc0888b
}, {collection: 'registro'})

const Sigin = mongoose.model('Sigin', siginSchema);

export default Sigin;