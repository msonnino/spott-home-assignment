
// Initially used this as validation for POST input but decided to use mogoose's built-in validation instead.
const validateCogsInput = (req,res,next) => {
    const product = req.body
    for (item in product.cogs) {
      if (product.cogs[item] == null || product.cogs[item] == '') {
        console.log("return 400 - missing data");
        console.log(item);
        return res.status(400).send("Missing data. Input was not saved.");
      }
    }
    if (!(typeof product.cogs.unitManufacturingCost == "number" 
    && typeof product.cogs.shipmentUnitCost == "number"
    && typeof product.cogs.monthlyAdvertismentCost == "number"
    && typeof product.cogs.manufacturingCountry == "string")) {
      console.log("return 400 - Mismatching data types");
      return res.status(400).send("Mismatching data types.");
    }
    next()
  }

  module.exports = {
      validateCogsInput
  }