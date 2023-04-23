const express  = require('express');
const router = express.Router();
const {User} = require("../models/User")
const {Product} = require("../models/Product")

router.get("/add/:id", async (req, res) => {
  
    const user = req.user;
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ err: "Product not found" });
    }
  
        await User.findByIdAndUpdate(user._id, {
         
         
           $push:{
           "cart": {product: product, quantity: 1}

       
         }});
      
  
});






module.exports = router;