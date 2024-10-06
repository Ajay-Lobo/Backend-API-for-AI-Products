import mongoose from 'mongoose';

const ChildrenSchema = new mongoose.Schema({
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

const Children = mongoose.model('Child', ChildrenSchema);

export default Children;