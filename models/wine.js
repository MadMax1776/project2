const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
    name: { type: String, required:true },
    color: { type: String, required:true },
    country: { type: String, required:true }
});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;
