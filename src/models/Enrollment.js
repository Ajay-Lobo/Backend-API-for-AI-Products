import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
    newEnrollments: {
        type: Number,
        required: true,
        default:0
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

export default Enrollment;