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
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const FinancialRecord = mongoose.model('FinancialRecord', FinancialRecordSchema);

export default FinancialRecord;