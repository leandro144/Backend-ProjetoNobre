import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema({
    nome: String,
    email: String,
    password: String,
    matters: String,
}, {collection: 'registro-teachers'})

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;