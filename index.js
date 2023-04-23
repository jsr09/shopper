const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(require("cookie-parser")());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", require("./auth/auth"));
app.use("/api/products", require("./api/productRouter"));
const authorize = require("./middlewares/authorize");
app.use(authorize)
app.use("/api/cart/", require("./api/cartRouter"));
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect(process.env.MONGODB_URI);
app.get("/", (req, res) => {
  res.send("<html><body><h1>Hello World</h1></body></html>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
