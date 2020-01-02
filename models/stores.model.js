const mongoose = require('mongoose');
const stroreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Please add a store id'],
        unique: true,
        trim: true,
        maxlength: [20, 'store id must be less than 20 characters'],
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Store', stroreSchema);