require("dotenv").config();
const express = require("express");
const dbConnect = require("./db");
const houseRoutes = require("./routes/houses");
const cityRoutes=require("./routes/city")
const cors = require("cors");
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api/cities",cityRoutes);
app.use("/api/houses",houseRoutes);



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
