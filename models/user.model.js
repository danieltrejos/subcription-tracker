import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de Usuario es requerido'],
        trim: true,
        minLenght: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
        maxLenght: [50, 'El nombre de usuario debe tener como máximo 50 caracteres']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [
            (value) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
            'Debe ingresar un email válido'
        ],
        minLenght: [5, 'El email debe tener al menos 6 caracteres'],
        maxLenght: [255, 'El email debe tener como máximo 255 caracteres']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        trim: true
    }
}, { timestamps: true });

// User Model
const User = mongoose.model('User', userSchema);
// Export User Model
export default User;