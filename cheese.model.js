var { Schema, model, SchemaTypes } = require("mongoose");

var Cheese = new Schema({
  name: SchemaTypes.String,
  price: SchemaTypes.Decimal128,
  weight: SchemaTypes.Number,
  strength: SchemaTypes.String,
  brand: SchemaTypes.String
});

module.exports = model("Cheese", Cheese);