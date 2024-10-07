import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
      },
      count: {
        type: Number,
        required: true
      }
}, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

export default Enrollment;