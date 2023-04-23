const mongoose = require('mongoose');
const { productSchema} = require('./Product');
const schema = mongoose.Schema({
    product:{
        type: productSchema,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
});



module.exports ={productOrderSchema: schema}