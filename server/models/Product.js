const mongoose = require("mongoose");

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

module.exports = Product