// CREATE A NEW EXPRESS ROUTE
const router = require("express").Router();

const { Router } = require("express");
//IMPORT OUR MODEL
const Place = require("../models/Place");

// SEED DATA FOR SEED ROUTE
const placeSeed = [
  {
    name: "Mt. Everest",
    img: "https://media.gq.com/photos/5dcaf2db81b355000904c757/master/pass/mount-everest-gq-men-of-the-year-2019-lede.jpg",
    description: "This is a Mountain",
  },
  {
    name: "Lake Eola",
    img: "https://a.cdn-hotels.com/gdcs/production142/d1678/02312c78-cd46-4e43-b6c6-d174700968a8.jpg",
    description: "This is a Lake",
  },
  {
    name: "Mall Of America",
    img: "https://www.visittheusa.com/sites/default/files/styles/hero_l_x2/public/images/hero_media_image/2016-11/IMG_7491_0.jpg?itok=lrDxDud3",
    description: "This is a Mall",
  },
];

// ROUTES (async, since database actions are asynchronous)

// SEED Route for Seeding Database
router.get("/seed", async (req, res) => {
  // try block for catching errors
  try {
    // remove all places from database
    await Place.remove({});
    // add the seed data to the database
    await Place.create(placeSeed);
    // get full list of places to confirm seeding worked
    const places = await Place.find({});
    // return full list of places as JSON
    res.json(places);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// INDEX
router.get("/", async (Req, res) => {
  try {
    // query database for places
    const places = await Place.find({});
    // send places as json
    res.json(places);
  } catch (error) {
    // return error as JSON with an error
    res.status(400).json(error);
  }
});

//CREATE
router.post("/", async (req, res) => {
  try {
    //pass the request to create a new place in db
    const newPlace = await Place.create(req.body);
    //send newly created place back as json
    res.json(newPlace);
  } catch (error) {
    //return error as json with an error
    res.status(400).json(error);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    // pass the request to update an existing place in db
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPlace);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndRemove(req.params.id);
    res.json(deletedPlace);
  } catch (error) {
    res.status(400).json(error);
  }
});

// export the router which has all our routes registered to it
module.exports = router;
