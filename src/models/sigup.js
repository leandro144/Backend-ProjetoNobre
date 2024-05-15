import mongoose, { Schema } from "mongoose";

const siginSchema = new Schema({
    nome: String,
    email: String,
    password: String,
    filePath: String,
    materia: String,
    nota: Number,
    totalAttendance: String,
    totalFault: Number,
    Ativ1: Number,
    ativ2: Number,
    Prova: Number,
    media: Number,
    resultFinal: String,
}, {collection: 'registro'})

const Sigin = mongoose.model('Sigin', siginSchema);

export default Sigin;