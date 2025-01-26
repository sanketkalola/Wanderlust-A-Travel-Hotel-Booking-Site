const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync.js");
const Listing = require("../model/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const { deserializeUser } = require("passport");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
.route("/")
.get( warpAsync(listingController.index))
.post( isLoggedIn,upload.single('listing[image]'), warpAsync(listingController.createListing));

//new route
router.get("/new", isLoggedIn,listingController.renderNewForm);

//update route
router
.route("/:id")
.get( warpAsync(listingController.showListing))
.put( isLoggedIn, isOwner,upload.single('listing[image]'), warpAsync(listingController.updateListing))
.delete( isLoggedIn, isOwner, warpAsync(listingController.destroyListing));

//index route
router.get("/", warpAsync(listingController.index));

//creat route
router.post("/", isLoggedIn, validateListing, warpAsync(listingController.createListing));

//show route
router.get("/:id", warpAsync(listingController.showListing));


//edit route
router.get("/:id/edit", isLoggedIn, isOwner, warpAsync(listingController.renderEditFrom));

//update route
router.put("/:id", isLoggedIn, isOwner, validateListing, warpAsync(listingController.updateListing));

//delete route
router.delete("/:id", isLoggedIn, isOwner, warpAsync(listingController.destroyListing));

module.exports = router;