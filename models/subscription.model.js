import mongoose from "mongoose";

// Subscription Schema

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la suscripción es requerido'],
        trim: true,
        minLenght: [2, 'El nombre de la suscripción debe tener al menos 2 caracteres'],
        maxLenght: [100, 'El nombre de la suscripción debe tener como máximo 100 caracteres']
    },
    price: {
        type: Number,
        required: [true, 'El precio de la suscripción es requerido'],
        min: [0, 'El precio de la suscripción debe ser positivo']
    },
    currency: {
        type: String,
        trim: true,
        enum: ['USD', 'EUR', 'GBP', 'COP'],
        default: 'USD'
    },
    frecuency: {
        type: String,
        trim: true,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly'
    },
    categoty: {
        type: String,
        trim: true,
        required: [true, 'La categoría de la suscripción es requerida'],
        enum: ['sports', 'technology', 'fashion', 'music', 'cooking', 'gaming', 'other'],
        default: 'other'
    },
    paymentMethod: {
        type: String,
        trim: true,
        required: [true, 'El método de pago es requerido']
    },
    status: {
        type: String,
        trim: true,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'La fecha de inicio es requerida'],
        validate: {
            validator: (value) => value <= new Date(),
            message: 'La fecha de inicio debe ser en el pasado'
        }
    },
    renewalDate: {
        type: Date,

        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'La fecha de renovacion debe ser mayor que la fecha de inicio'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es requerido'],
        index: true
    }

}, { timestamps: true });

// Auto calculate renewalDate if its missing
subscriptionSchema.pre('save', function (next) {

    if (!this.renewalDate) {
        // Calculate renewalDate
        // Add one day, week, month, or year based on the frequency


        // Set renewalDate to the start date plus one day, week, month, or year, based on the frequency
        // The renewalDate will be the start date plus one day, week, month, or year, based on the frequency

        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 1,
            yearly: 1
        };

        // Se coloca la fecha de renovacion como la fecha de inicio para que sea calculada luego con base en la frecuencia de renewal
        this.renewalDate = new Date(this.startDate);

        //Se suma la cantidad de días, semanas, meses o años según la frecuencia y se setea la fecha de renovación
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frecuency]);
    }

    //Auto-update status
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});


// Subscription Model

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;