const mongoose = require("mongoose");

const category_schema = mongoose.Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
  },
});

const paxes_schema = mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  surname: {
    type: String,
  },
  type: {
    type: String,
    enum: ["ADULT", "CHILD", "INFANT"],
  },
});

const from_schema = mongoose.Schema({
  code: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ["GIATA", "ATLAS", "IATA", "PORT", "STATION", "GPS"],
  },
});

const checkPickup_schema = mongoose.Schema({
  hoursBeforeConsulting: {
    type: String,
  },
  mustCheckPickupTime: {
    type: Boolean,
  },
  url: {
    type: String,
  },
});

const pickup_schema = mongoose.Schema({
  address: {
    type: String,
  },
  altitude: {
    type: Number,
  },
  checkPickup: {
    type: [checkPickup_schema],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  number: {
    type: String,
  },
  pickupId: {
    type: String,
  },
  stopName: {
    type: String,
  },
  town: {
    type: String,
  },
  zip: {
    type: String,
  },
});

const to_schema = mongoose.Schema({
  code: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ["GIATA", "ATLAS", "IATA", "PORT", "STATION", "GPS"],
  },
});

const pickupInformation_schema = mongoose.Schema({
  date: {
    type: String,
  },
  from: {
    type: [from_schema],
  },
  pickup: {
    type: [pickup_schema],
  },
  time: {
    type: String,
  },
  to: {
    type: [to_schema],
  },
});

const price_schema = mongoose.Schema({
  currencyId: {
    type: String,
  },
  netAmount: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
});

const vehicle_schema = mongoose.Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
  },
});

const airportTransfer_bookings = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "UserAirportTransfer",
    },
    booking_status_message: {
      type: String,
    },
    modificationPolicies: {
      cancellation: {
        type: Boolean,
      },
      modification: {
        type: Boolean,
      },
    },
    cancellationReference: {
      type: String,
    },
    code: {
      type: Number,
    },
    booking_status: {
      type: String,
      enum: ["init", "canceled", "confirmed", "failed", "pre-booking"],
    },
    booking_reference: {
      type: String,
    },
    email: {
      type: String,
    },
    clientReference: {
      type: String,
    },
    tfBookingRef: {
      type: String,
    },
    rateComments: {
      type: String,
    },
    payment_method: {
      type: String,
      enum: ["AT_THE_CAB", "AT_WEB"],
    },
    payment_status: {
      type: String,
      default: "unpaid",
      enum: [
        "unpaid",
        "paid",
        "partially paid",
        "refunded",
        "refund initiated",
      ],
    },
    transaction: {
      type: mongoose.Schema.ObjectId,
      ref: "Transaction",
    },
    category: {
      type: [category_schema],
    },
    factSheetId: {
      type: String,
    },
    id: {
      type: String,
    },
    paxes: {
      type: [paxes_schema],
    },
    pickupInformation_schema: {
      type: [pickupInformation_schema],
    },
    price: {
      type: [price_schema],
    },
    transferType: {
      type: String,
      enum: ["PRIVATE", "SHARED"],
    },
    vehicle: {
      type: [vehicle_schema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "AiportTransferBooking",
  airportTransfer_bookings
);
