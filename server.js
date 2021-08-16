// GET ENVIRONMENTAL VARIABLES
require("dotenv").config();

//GET PORT FROM ENV VARIABLES
const PORT = process.env.PORT;

// IMPORT DEPENDENCIES
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// IMPORT DATABASE CONNECTION
const mongoose = require("./db/connection");

// CREATE EXPRESS APPLICATION OBJECT
const app = express();

// Setup Middleware
app.use(cors()); // <----- add cors headers
app.use(express.json()); // <---- parses JSON bodies and adds them to req.body
app.use(morgan("tiny")); // <----- logging for debugging

//import router
const peopleRouter = require("./controllers/Place");

// ROUTES AND ROUTES
app.get("/", (req, res) => res.send("Server is Working")); // <--- Route to test server
app.use("/places", peopleRouter); // send all "/places" requires to the peopleRouter

// Server Listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
