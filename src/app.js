const express = require("express");
const app = express();
const axios = require("axios");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rakesh:pass1234@cluster0.mybulqq.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err));

const locationTreeSchema = new mongoose.Schema({
  locationid: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  urlTag: {
    type: String,
    required: true,
  },
  parentLocationId: {
    type: String,
  },
  isDomestic: {
    type: Boolean,
    default: true,
  },
  isBeach: {
    type: Boolean,
  },
  isAttraction: {
    type: Boolean,
  },
  isPopularCity: {
    type: Boolean,
  },
  imageUrl: {
    type: String,
  },
  isStation: {
    type: Boolean,
  },
  serviceType: {
    type: String,
    enum: ["hotels", "flights", "vacationPackages", "carRentals", "topPlaces"],
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: Number,
    min: 1,
    max: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  locationCode: {
    type: String,
    required: true,
  },
  imageUrl:{
    type: String,
    required: true,
  }
});

const LocationTree = mongoose.model("LocationDesc", locationTreeSchema);

const serviceType = "hotels";

const locationIds = [
  "US01P20",
  "US01N07",
  "US01N08",
  "US01N09",
  "US01N10",
  "US01N11",
  "US01N12",
  "US01N13",
  "US01N14",
  "US01N15",
  "US01N16",
  "US01N17",
  "US01N18",
  "US01N19",
];


const imageUrls = [
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/hells-kitchen-us01p20.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/empire-state-building-us01n07.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/one-world-trade-center-us01n08.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/newyork-university-us01n09.jpeg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/5th-avenue-us01n10.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/barclays-center-us01n11.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/brooklyn-bridge-us01n12.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/metropolian-art-museum-us01n13.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/manhatten-cruise-terminal-us01n14.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/rockefeller-center-us01n15.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/yankee-stadium-us01n16.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/columbia-university-us01n17.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/bronx-zoo-us01n18.jpg",
    "https://s3.amazonaws.com/assets.travelfika.com/location-linktree/USA/newyork/newyork/battery-park-us01n19.jpg",
];

const locationCodes = [
    "Hell's Kitchen",
    "Empire State Building",
    "One World Trade Center",
    "New York University",
    "5th Avenue",
    "Barclays Center Brooklyn",
    "Brooklyn Bridge",
    "Metropolitan Museum of Art",
    "Manhattan Cruise Terminal",
    "Rockefeller Center",
    "Yankee Stadium",
    "Columbia University",
    "Bronx Zoo",
    "Battery Park",
];

const locationNames = [
    "Hell's Kitchen",
    "Empire State Building",
    "One World Trade Center",
    "New York University",
    "5th Avenue",
    "Barclays Center Brooklyn",
    "Brooklyn Bridge",
    "Metropolitan Museum of Art",
    "Manhattan Cruise Terminal",
    "Rockefeller Center",
    "Yankee Stadium",
    "Columbia University",
    "Bronx Zoo",
    "Battery Park",
];

const API_URL =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";
const API_KEY = "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";

const generateDescription = async (prompt) => {
  let prompts = `Write a short description for ${prompt}, highlighting its key features, attractions, and transportation options.`;
  console.log("prompt: " + prompts);
  try {
    const requestBody = {
      prompt: prompts,
      max_tokens: 4000,
    };

    const response = await axios.post(API_URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const { data } = response;
    const description = data.choices[0].text.trim();
    return description;
  } catch (error) {
    console.error("Error generating description:", error);
    throw new Error("Failed to generate description");
  }
};

let descriptions = []; // Initialize the descriptions array outside the loop

async function generateDescriptionsForCities() {
  for (let i = 0; i < locationNames.length; i++) {
    const prompt = locationNames[i];
    const description = await generateDescription(prompt);
    console.log(`Description for ${prompt}: ${description}`);
    descriptions.push(description);
  }
  return descriptions;
}

generateDescriptionsForCities()
  .then((descriptions) => {
    console.log("Generated descriptions:", descriptions);
    const title = "Hotel deals on top domestic destinations";

    async function createLocations(
      locationIds,
      locationNames,
      serviceType,
      title,
      descriptions,
      imageUrls,
      locationCodes
    ) {
      for (let i = 0; i < locationIds.length; i++) {
        const locationId = locationIds[i];
        const locationName = locationNames[i];

        const description = descriptions[i];
        console.log("Creating location:", description);
        const parentLocationId =
          locationId.length === 7
            ? locationId.substring(0, locationId.length - 3)
            : locationId.substring(0, locationId.length - 2);
        const imageUrl = imageUrls[i];
        const isDomestic = locationId.startsWith("US");
        const isBeach = locationId.charAt(4) === "B";
        const isPopularCity = locationId.charAt(4) === "P";
        const isAttraction = locationId.charAt(4) === "N";
        const isStation = locationId.charAt(4) === "S";
        const priority = locationId.length === 7 ? 2 : 1;
        const locationCode = locationCodes[i];
        console.log("Creating proof:", priority);

        try {
          const existingLocation = await LocationTree.findOne({
            locationid: locationId,
          });
          if (existingLocation) {
            console.log(`Location ${locationId} already exists. Skipping...`);
            continue;
          }

          const location = new LocationTree({
            locationid: locationId,
            locationName: locationName,
            title: title,
            description: description,
            urlTag: `${locationName}-${serviceType}`,
            parentLocationId: parentLocationId,
            isDomestic: isDomestic,
            isBeach: isBeach,
            isPopularCity: isPopularCity,
            isAttraction: isAttraction,
            isStation: isStation,
            serviceType: serviceType,
            status: true,
            priority: priority,
            imageUrl: imageUrl,
            createdBy: new mongoose.Types.ObjectId(),
            updatedBy: new mongoose.Types.ObjectId(),
            locationCode: locationCode,
          });

          await location.save();
          console.log(`Location ${locationId} saved successfully!`);
        } catch (err) {
          console.error(err);
        }
      }
    }

    createLocations(
      locationIds,
      locationNames,
      serviceType,
      title,
      descriptions,
      imageUrls,
      locationCodes
    );
  })
  .catch((error) => {
    console.error("Error generating descriptions:", error);
  });

// ...

async function updateLocations(locationIds, locationCodes, imageUrls) {
  for (let i = 0; i < locationIds.length; i++) {
    const locationId = locationIds[i];
    const locationCode = locationCodes[i];
    const imageUrl = imageUrls[i];
    console.log("Updating location:", locationId);
    try {
      const updatedLocation = await LocationTree.updateOne(
        { locationid: locationId },
        { $set: { locationCode: locationCode, imageUrl: imageUrl } }
      );
      console.log(`Location ${locationId} updated successfully!`);
    } catch (err) {
      console.error(err);
    }
  }
}


updateLocations(locationIds, locationCodes, imageUrls);


app.listen(3020, () => {
  console.log("Server is running");
});

