import mongoose, { Schema } from "mongoose";

const signSchema = new Schema({
    nome: String,
    email: String,
    password: String
}, {collection: 'registros'})

const Sigin = mongoose.model('Sigin', signSchema);

export default Sigin;