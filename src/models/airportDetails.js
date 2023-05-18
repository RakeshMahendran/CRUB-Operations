const mongoose = require("mongoose");

const airport_transfer_details = mongoose.Schema({
  id: {
    type: String,
  },
  factSheetId: {
    type: String,
  },
  direction: {
    type: String,
  },
  description: {
    type: String,
  },
  transferType: {
    type: String,
  },
  vehicleName: {
    type: String,
  },
  vehicleCategory: {
    type: String,
  },
  passangerCount: {
    type: Number,
  },
  images: {
    type: Object,
  },
  generalInfo: {
    type: String,
  },
  genericGuideLines: {
    type: String,
  },
  currencyId: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("AirportDetails", airport_transfer_details);
