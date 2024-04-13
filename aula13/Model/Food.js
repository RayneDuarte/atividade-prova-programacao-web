const mongoose = require('mongoose');


const FoodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Food', FoodSchema);

/*
    {
        "name": "Uvas",
        "category": "Frutas",
        "quantity": 1000,
        "expirationDate": "12-12-2024",
        "price": 9
    }
*/