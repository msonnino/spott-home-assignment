const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ********** DB setup ********** //

const mongoDB = "mongodb://localhost:27017/productsEditorDB"
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Import countriesCodes to use in our schema
const countries = require('./countries.json')
const countriesCodes =  countries.map(a => a.code)

// Our "Product" schema. Includes validation to all properties. 
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  cogs: {
    unitManufacturingCost: {
      type: Number,
      min: 0,
      required: true,
    },
    shipmentUnitCost: {
      type: Number,
      min: 0,
      required: true,
    },
    monthlyAdvertismentCost: {
      type: Number,
      min: 0,
      required: true,
    },
    manufacturingCountry: {
      type: String,
      enum: countriesCodes
    }
  }
})

const Product = mongoose.model("Product", productSchema)

/* We check to see that there's data stored in the DB.
If there isn't any - we initiate it with the default products */

Product.find ({}, function(err, foundProducts) {
  if (err) {
    console.log(err);
  } else {
    if (foundProducts.length == 0) {
      console.log("DB is empty. Initializing default products");

      // Import the default products list
      const productsList = require("./ProductsList.js");

      productsList.productsList.forEach(product => {
        const newProduct = new Product(product)
        newProduct.save()
      })
    }
  }
})

// ********** API ********** //

// import middleware - eventually didn't use middleware
// const mw = require('./middleware.js')

// GET to '/products' returns all existing products
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
        res.status(200).send(allProducts)
      }
    })
})

// POST to '/cogs' updates the relevant product's information
app.post("/cogs", function(req, res) {
  Product.findOne({id: req.body.id}, function(err, product) {
    if (!err) {
      console.log("POST '/cogs' called");
      product.cogs = req.body.cogs
      product.save(function (err) {
        if (err) {
          console.log(err.message)
          return res.status(400).send(err.message)
        }
     })
    } else {
      console.log(err);
    }
  })
}) 


const serverPort = 3000
app.listen(serverPort, function(){
  console.log("Server started on port " + serverPort + ".");
});
