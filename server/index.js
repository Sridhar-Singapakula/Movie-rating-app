require("dotenv").config();
const express = require("express");
const dbConnect = require("./db");
const movieRoutes = require("./routes/movies");
const userRoutes= require("./routes/user");
const authRoutes= require("./routes/auth")
const cors = require("cors");
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/movies",movieRoutes);



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
