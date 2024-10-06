import mongoose from "mongoose";

const CaregiverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    }
}, { timestamps: true });

const Caregiver = mongoose.model('Caregiver', CaregiverSchema);

export default Caregiver;