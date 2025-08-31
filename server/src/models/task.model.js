const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [
            true,
            'Provide a title'
        ]
    },
    description: {
        type: String,
        required: [
            true,
            'Provide a description'
        ]
    },
    status: {
        type: String,
        enum: [
            'pending',
            'in-progress',
            'completed'
        ],
        default: 'pending'
    }
}, { timestamps: true })

TaskSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);