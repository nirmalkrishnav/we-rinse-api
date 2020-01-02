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
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        zipcode: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// geo Coder

stroreSchema.pre('save', async function (next) {
    const loc = await geoCoder.reverse({
        lat: this.location.coordinates[0], lon: this.location.coordinates[1]
    });
    console.log(loc);
    this.location = {
        formattedAddress: loc[0].formattedAddress,
        coordinates: [loc[0].longitude, loc[0].longitude],
        zipcode: loc[0].zipcode
    }
    next();

});

module.exports = mongoose.model('Store', stroreSchema);