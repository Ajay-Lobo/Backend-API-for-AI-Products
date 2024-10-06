import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Children',
        required: true
    },
    status: {
        type: String,
        enum: ['on-time', 'late', 'absent', 'day-off'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;

