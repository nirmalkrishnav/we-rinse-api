const mongoose = require('mongoose');
const geoCoder = require('../utils/geocoder.util');

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

// geo Coder

stroreSchema.pre('save', async function (next) {
    const loc = await geoCoder.geocode(this.address);
    console.log(loc)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }

    this.address = undefined;
    next();
});

module.exports = mongoose.model('Store', stroreSchema);