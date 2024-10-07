import mongoose from "mongoose";

const FinancialRecordSchema = new mongoose.Schema({
    revenue: {
        type: Number,
        required: true
    },
    expenses: {
        type: Number,
        required: true
    },
    profitMargin: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        unique: true
    }
}, { timestamps: true });

const FinancialRecord = mongoose.model('FinancialRecord', FinancialRecordSchema);

export default FinancialRecord;