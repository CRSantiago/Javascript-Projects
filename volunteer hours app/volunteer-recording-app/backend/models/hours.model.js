const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hoursSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    hoursCompleted: { type: String, required: true },
    date: { type: Date, required: true }
}, {
        timestamps: true
    });

const Hours = mongoose.model('Hours', hoursSchema);

module.exports = Hours;