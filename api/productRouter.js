const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const authorize = require("../middlewares/authorize");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.send(products);
  } catch (err) {
    return res.status(500).send({ err: "internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    return res.send(product);
  } catch (err) {
    return res.status(500).send({ err: "internal server error" });
  }
});

router.post("/", authorize,async(req, res) => {
    try{
  let user = req.user;
  if (!user.isAdmin) return res.status(401).send({ err: "Unauthorized" });
  let {image , name , description , price} = req.body;
  if(!image ||!name ||!description ||!price) return res.status(400).send("Please fill all fields");
  const foundByname = await Product.findOne({name: name});
  if(foundByname) return res.status(400).send({ err: "Product already exists" });
 
  
  const newProduct = new Product({name, image, description, price});
    const product = await newProduct.save()
    return res.send(product);
    }catch(err){
        return res.status(500).send({ err: "internal server error" });
    }
});


router.put("/:id", authorize,async(req, res) => {
    try{
    let user = req.user;
    if (!user.isAdmin) return res.status(401).send({ err: "Unauthorized"});
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new : true})
    if(!updatedProduct) return res.status(404).send({ err: "Product not found"});
    return res.send(updatedProduct);
    }catch(err){
        return res.status(500).send({ err: "internal server error" });
    }
})


router.delete("/:id", authorize,async(req, res) => {
    try {
        let user = req.user;
        if (!user.isAdmin) return res.status(401).send({ err: "Unauthorized" });
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
       
        if (!deletedProduct) return res.status(404).send({ err: "Product not found" });
        return res.send({deleted: true});
    } catch (err) {
        return res.status(500).send({ err: "internal server error" });
    }
});


module.exports = router;
