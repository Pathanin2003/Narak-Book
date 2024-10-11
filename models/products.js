//use mongoose
const mongoose = require("mongoose");

//connect to MongoDB
const dbUrl = "mongodb://localhost:27017/DCMStore";
mongoose.connect(dbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

//create schema
let DCMProductSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});

//create model
let Products = mongoose.model("DCMStore", DCMProductSchema);

//export model
module.exports = Products;

