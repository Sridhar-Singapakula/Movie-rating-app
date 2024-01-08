const router = require("express").Router();
const Joi = require("joi");
const { City,validate} = require("../modules/city");
const House=require("../modules/house");
const validateObjectId = require("../middleware/validateObjectId");


router.post("/", async (req, res) => {
  try {
      const city = new City({ ...req.body });
      await city.save();
      res.status(200).send({ data: city, message: "City registered successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Get all cities
router.get("/", async (req, res) => {
  try {
      const cities = await City.find();
      res.status(200).json(cities);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Get houses for a specific city with optional filtering
router.get("/:id/houses", async (req, res) => {
  try {
      const cityId = req.params.id;

      const city = await City.findById(cityId);
      if (!city) {
          return res.status(404).json({ error: true, message: "City not found" });
      }

      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search || "";
      const sort = req.query.sort || "rating";
      const propertyType = req.query.propertyType || [];
      const bedrooms = req.query.bedrooms || [];
      const amenities = req.query.amenities || [];
      const age = req.query.age || [];
      const priceMin = req.query.priceMin || 0;
      const priceMax = req.query.priceMax || Number.MAX_SAFE_INTEGER;
   

      const propertyTypeOptions = [
          "Flat/Apartment",
          "Independent/Builder Floor",
          "Independent House/Villa",
          "Residential Land",
          "1 RK/Studio Apartment",
          "Farm House",
          "Serviced Apartments",
          "Other"
      ];

      const bedroomsOptions = [
          "1-RK/1-BHK",
          "2-BHK",
          "3-BHK",
          "4-BHK",
          "4+-BHK"
      ];
      const noOfBathroomsOptions = [
        "1",
        "2",
        "3",
        "4",
        "4+"
    ];

      const amenitiesOptions = [
          "Parking",
          "Power Backup",
          "Park",
          "Gymnasium",
          "Club house"
      ];

      const ageOptions = [
          "0-1 years old",
          "1-5 years old",
          "5-10 years old",
          "10+ years old",
          "20+ years old"
      ];
      const availableOptions = [
        "Family",
        "Solo Men",
        "Solo Women"
    ];


      const houseIds = city.houses; // Get the house IDs from the city document
      console.log(houseIds)
       // Check if any query parameter is provided
       const hasQueries = Object.values(req.query).some(Boolean);

       // If no queries are provided, return all houses for that city
      //  const filters = hasQueries
      //      ? {
      //          _id: { $in: city.houses },
      //          name: { $regex: search, $options: "i" },
      //          propertyType: { $in: propertyType.length > 0 ? propertyType : propertyTypeOptions },
      //          bedrooms: { $in: bedrooms.length > 0 ? bedrooms : bedroomsOptions },
      //          amenities: { $in: amenities.length > 0 ? amenities : amenitiesOptions },
      //          age: { $in: age.length > 0 ? age : ageOptions },
      //          price: { $gte: priceMin, $lte: priceMax },
      //          NoOfBathrooms: { $in: noOfBathrooms.length > 0 ? noOfBathrooms : [] },
      //      }
      //      : { _id: { $in: city.houses } };
      const filters = hasQueries ? {
            _id: { $in: city.houses },
            name: { $regex: search, $options: "i" },
            propertyType: {
              $in: req.query.propertyType ? req.query.propertyType.split(",") : propertyTypeOptions
            },
            bedrooms: { $in: req.query.bedrooms ? req.query.bedrooms.split(",") : bedroomsOptions },
            price: { $gte: priceMin, $lte: priceMax },
            amenities: { $in: req.query.amenities ? req.query.amenities.split(",") : amenitiesOptions },
            age: {
              $in: req.query.age ? req.query.age.split(",") : ageOptions
            },
            availableFor: {
              $in: req.query.available ? req.query.available.split(",") : availableOptions
            },
            NoOfBathrooms: {
              $in: req.query.noOfBathrooms ? req.query.noOfBathrooms.split(",") : noOfBathroomsOptions
            },
          } : { _id: { $in: city.houses } };
      const houses = await House.find(filters)
          .sort({ [sort]: 1 })
          .skip(page * limit)
          .limit(limit);

      const total = await House.countDocuments(filters);

      const response = {
          error: false,
          total,
          page: page + 1,
          limit,
          propertyTypeOptions,
          bedroomsOptions,
          amenitiesOptions,
          ageOptions,
          houses,
      };

      res.status(200).json(response);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

module.exports = router;
