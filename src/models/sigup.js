import mongoose, { Schema } from "mongoose";

const siginSchema = new Schema({
    nome: String,
    email: String,
    password: String,
    filePath: String,
    materia: String,
    nota: Number
}, {collection: 'registro'})

const Sigin = mongoose.model('Sigin', siginSchema);

export default Sigin;