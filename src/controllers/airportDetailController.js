const AiportTransferBooking = require("../models/airportTransferBookingModel");
const mongoose = require("mongoose");

const storeAirportTransferDetails = async (req, res) => {
  // const userId = mongoose.Types.ObjectId("USER_ID"); // Replace with the actual ObjectId value
  // const transactionId = mongoose.Types.ObjectId("TRANSACTION_ID");
   const userId = new mongoose.Types.ObjectId(); // Replace with the actual ObjectId value
   const transactionId = new mongoose.Types.ObjectId();
  try {
    const existingTransfer = await AiportTransferBooking.findOne({
      code: 111, //  transfer code --replacce
    });

    if (!existingTransfer) {
      console.log("[+] Creating new transfer");

      const transfer = new AiportTransferBooking({
        userId: userId, // Replace with the desired user ID
        booking_status_message: "BOOKING_STATUS_MESSAGE", // Replace with the desired booking status message
        modificationPolicies: {
          cancellation: true,
          modification: true,
        },
        cancellationReference: "CANCELLATION_REFERENCE", // Replace with the desired cancellation reference
        code: 1234, // Replace with the desired code
        booking_status: "init", // Replace with the desired booking status
        booking_reference: "BOOKING_REFERENCE", // Replace with the desired booking reference
        email: "EMAIL", // Replace with the desired email
        clientReference: "CLIENT_REFERENCE", // Replace with the desired client reference
        tfBookingRef: "TF_BOOKING_REF", // Replace with the desired TF booking reference
        rateComments: "RATE_COMMENTS", // Replace with the desired rate comments
        payment_method: "AT_WEB", // Replace with the desired payment method
        payment_status: "unpaid", // Replace with the desired payment status
        transaction: transactionId, // Replace with the desired transaction ID
        category: [
          {
            code: "CATEGORY_CODE_1",
            name: "CATEGORY_NAME_1",
          },
          {
            code: "CATEGORY_CODE_2",
            name: "CATEGORY_NAME_2",
          },
          // Add more objects as needed
        ],
        factSheetId: "FACT_SHEET_ID", // Replace with the desired fact sheet ID
        id: "TRANSFER_ID", // Replace with the desired transfer ID
        paxes: [
          {
            email: "EMAIL_1",
            name: "NAME_1",
            phone: "PHONE_1",
            surname: "SURNAME_1",
            type: "ADULT",
          },
          {
            email: "EMAIL_2",
            name: "NAME_2",
            phone: "PHONE_2",
            surname: "SURNAME_2",
            type: "CHILD",
          },
          // Add more objects as needed
        ],
        pickupInformation_schema: [
          {
            date: "DATE_1",
            from: [
              {
                code: "FROM_CODE_1",
                description: "FROM_DESCRIPTION_1",
                type: "GIATA",
              },
              {
                code: "FROM_CODE_2",
                description: "FROM_DESCRIPTION_2",
                type: "ATLAS",
              },
              // Add more objects as needed
            ],
            pickup: [
              {
                address: "ADDRESS_1",
                altitude: 100,
                checkPickup: [
                  {
                    hoursBeforeConsulting: "2",
                    mustCheckPickupTime: true,
                    url: "CHECK_PICKUP_URL_1",
                  },
                  {
                    hoursBeforeConsulting: "3",
                    mustCheckPickupTime: false,
                    url: "CHECK_PICKUP_URL_2",
                  },
                  // Add more objects as needed
                ],
                description: "PICKUP_DESCRIPTION_1",
                image: "IMAGE_URL_1",
                latitude: 123.456,
                longitude: 789.012,
                number: "PICKUP_NUMBER_1",
                pickupId: "PICKUP_ID_1",
                stopName: "STOP_NAME_1",
                town: "TOWN_1",
                zip: "ZIP_1",
              },
              {
                address: "ADDRESS_2",
                altitude: 200,
                checkPickup: [
                  {
                    hoursBeforeConsulting: "4",
                    mustCheckPickupTime: true,
                    url: "CHECK_PICKUP_URL_3",
                  },
                  {
                    hoursBeforeConsulting: "5",
                    mustCheckPickupTime: false,
                    url: "CHECK_PICKUP_URL_4",
                  },
                  // Add more objects as needed
                ],
                description: "PICKUP_DESCRIPTION_2",
                image: "IMAGE_URL_2",
                latitude: 111.222,
                longitude: 333.444,
                number: "PICKUP_NUMBER_2",
                pickupId: "PICKUP_ID_2",
                stopName: "STOP_NAME_2",
                town: "TOWN_2",
                zip: "ZIP_2",
              },
              // Add more objects as needed
            ],
            time: "TIME_1",
            to: [
              {
                code: "TO_CODE_1",
                description: "TO_DESCRIPTION_1",
                type: "GIATA",
              },
              {
                code: "TO_CODE_2",
                description: "TO_DESCRIPTION_2",
                type: "ATLAS",
              },
              // Add more objects as needed
            ],
          },
          // Add more objects as needed
        ],
        price: [
          {
            currencyId: "CURRENCY_ID_1",
            netAmount: 100.5,
            totalAmount: 150.75,
          },
          {
            currencyId: "CURRENCY_ID_2",
            netAmount: 200.75,
            totalAmount: 250.25,
          },
          // Add more objects as needed
        ],
        transferType: "PRIVATE",
        vehicle: [
          {
            code: "VEHICLE_CODE_1",
            name: "VEHICLE_NAME_1",
          },
          {
            code: "VEHICLE_CODE_2",
            name: "VEHICLE_NAME_2",
          },
          // Add more objects as needed
        ],
      });

      const newAirportTransfer = await transfer.save();

      console.log("[+] New transfer created", newAirportTransfer);

      res.status(200).json({ message: "New transfer created" });
    } else {
      console.log("[+] Already existing transfer");
      res.status(200).json({ message: "Transfer already exists" });
    }
  } catch (error) {
    console.log("[+] Error while storing airport transfer details", error);
    res
      .status(500)
      .json({ message: "Error while storing airport transfer details" });
  }
};

module.exports = { storeAirportTransferDetails };

