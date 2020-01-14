const mongoose = require('mongoose');
const geoCoder = require('../utils/geocoder.util');

const stroreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Please add a store id'],
        unique: false,
        trim: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Feature']
        },
        properties: {
            type: Object,
            mag: { type: Number },
        },
        geometry: {
            type: Object,
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
                index: '2dsphere'
            },
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// geo Coder

stroreSchema.pre('save', async function (next) {
    console.log(this.location);
    // const loc = await geoCoder.reverse({
    //     lat: this.location.geometry.coordinates[0], lon: this.location.geometry.coordinates[1]
    // });
    // this.location = {
    //     geometry: this.location.geometry,
    //     properties: this.location.properties
    // }
    next();

});

module.exports = mongoose.model('Store', stroreSchema);