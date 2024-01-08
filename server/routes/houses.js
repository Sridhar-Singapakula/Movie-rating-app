const router = require("express").Router();
const { City } = require("../modules/city");
const House = require("../modules/house");

// Create a new patient
router.post("/", async (req, res) => {
    const city = await City.findById(req.body.city);
    const house = new House({ ...req.body });
    await house.save();
    city.houses.push(house._id);
    await city.save();
    res.status(200).send({ data: house, message: "City registered successfully" });
});


router.get("/", async (req, res) => {
    try {
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
        const noOfBathrooms = req.query.noOfBathrooms || [];

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

        const filters = {
            name: { $regex: search, $options: "i" },
            propertyType: { $in: propertyType.length > 0 ? propertyType : propertyTypeOptions },
            bedrooms: { $in: bedrooms.length > 0 ? bedrooms : bedroomsOptions },
            amenities: { $in: amenities.length > 0 ? amenities : amenitiesOptions },
            age: { $in: age.length > 0 ? age : ageOptions },
            price: { $gte: priceMin, $lte: priceMax },
            NoOfBathrooms: { $in: noOfBathrooms.length > 0 ? noOfBathrooms : [] },
        };

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
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;
