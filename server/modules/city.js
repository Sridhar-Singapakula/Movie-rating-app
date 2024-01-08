const mongoose = require("mongoose");
const Joi = require("joi");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
 houses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'house'
  }],
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
});
const City= mongoose.model("City", citySchema);
const validate = (city) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
});
  return schema.validate(city);
};

module.exports = { City, validate };