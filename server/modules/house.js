const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
        required: true
    },
    name: {type: String, required: true},
    img:  {type: [String], required: true},
    sub:{type: String, required: true},
    desc:  {type: String, required: true},
    Area:{type: String, required: true},
    AreaSub:{type: String, required: true},
    Highlights:{type: String, required: true},
    Deposit:{type: String, required: true},
    year: {type: Number, required: true},
    propertyType: {type: [String], required: true},
    amenities:{type: [String], required: true},
    price:{type: Number, required: true},
    bedrooms:{type:String, required: true},
    age:{type: [String], required: true},
    availableFor:{type: [String], required: true},
    NoOfBathrooms:{type: String, required: true},
    rating: {type: Number, required: true}
});

module.exports = mongoose.model("house", houseSchema);