const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");


const app = express();
app.use(express.static("public"));
app.use(cors());

// ********** DB setup ********** //

mongoose.connect("mongodb://localhost:27017/productsEditorDB", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const productSchema = new mongoose.Schema({
  id: String,
  productName: String,
  cogs: {
    unitManufacturingCost: Number,
    shipmentUnitCost: Number,
    monthlyAdvertismentCost: Number,
    manufacturingCountry: String
  }
})

const Product = mongoose.model("Product", productSchema)

// Import the default products list
const productsList = require("./ProductsList.js");

/* We check to see that there's data stored in the DB.
If there isn't any - we iniciate it with the default products */
Product.find ({}, function(err, foundProducts) {
  if (err) {
    console.log(err);
  } else {
    if (foundProducts.length == 0) {
      console.log("DB is empty. Initializing default products");
      productsList.productsList.forEach(product => {
        const newProduct = new Product(product)
        newProduct.save()
      })
    }
  }
})


// ********** API ********** //

app.get("/products", function(req, res) {
    Product.find ({}, function(err, foundProducts) {
      if (err) {
        console.log(err);
      } else {
        console.log("GET '/products' called");
        const allProducts = new Array()
        foundProducts.forEach( foundProduct => {
          allProducts.push({
            id: foundProduct.id,
            productName: foundProduct.productName,
            cogs: foundProduct.cogs
          })
        })
        res.send(allProducts)
      }
    })
    
})

const serverPort = 3000
app.listen(serverPort, function(){
  console.log("Server started on port " + serverPort + ".");
});
