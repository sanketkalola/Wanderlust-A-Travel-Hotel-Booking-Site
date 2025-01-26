const express = require("express");
const router = express.Router({ mergeParams: true });
const warpAsync = require("../utils/warpAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../model/review.js");
const Listing = require("../model/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController  = require("../controllers/reviews.js");


//reviews
//post review route

router.post("/",isLoggedIn, warpAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, warpAsync(reviewController.destroyReview));

module.exports = router;