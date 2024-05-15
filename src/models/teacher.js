import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({

    name: {
        type : String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },

    matter: {
        type: String,
    }
});

const Teacher = mongoose.model('Register-Teacher', TeacherSchema);

export default Teacher;
