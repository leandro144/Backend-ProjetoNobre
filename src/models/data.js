import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema({
    nome: String,
    idade: Number,
    cpf: Number,
    endereco: String,
    cep: Number
})

const Data = mongoose.model('Data', dataSchema);

export default Data