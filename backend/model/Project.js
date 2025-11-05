const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['green_spaces', 'energy', 'waste_management', 'transportation', 'water'],
        required: true
    },
    status: {
        type: String,
        enum: ['planning', 'active', 'completed', 'cancelled'],
        default: 'planning'
    },
    budget: {
        type: Number,
        required: true
    },
    timeline: {
        startDate: Date,
        endDate: Date
    },
    location: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    impactMetrics: {
        carbonReduction: { type: Number, default: 0 },
        treesPlanted: { type: Number, default: 0 },
        energySaved: { type: Number, default: 0 },
        wasteDiverted: { type: Number, default: 0 }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);