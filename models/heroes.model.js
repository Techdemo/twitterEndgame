const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HeroesSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    score: { type: Number, required: true }
});


// Export the model
module.exports = mongoose.model('Hero', HeroesSchema);