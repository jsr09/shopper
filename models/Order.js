const mongoose = require('mongoose');
const ProductOrderSchema = require('./ProductOrder');
const schema = mongoose.Schema({
    products:{
        type: [ProductOrderSchema], 
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    userId :{
        type: mongoose.Schema.Types.ObjectId,
    }
})


module.exports = {Order: mongoose.model('Order', schema)}