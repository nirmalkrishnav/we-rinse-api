const mongoose = require('mongoose');
const geoCoder = require('../utils/geocoder.util');
const uuidv5 = require('uuid/v5');
const appUuidNamespace = process.env.APP_UUID;

const stroreSchema = new mongoose.Schema({
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
        coordinates: this.location.coordinates,
        zipcode: loc[0].zipcode
    }
    next();

});

module.exports = mongoose.model('Store', stroreSchema);