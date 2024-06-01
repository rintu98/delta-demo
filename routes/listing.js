const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage})

// Index , creat Route 
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing));
    



//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/search", wrapAsync(listingController.searchListing));

router.get("/sort/:category", wrapAsync(listingController.sortListing));


//Show, Update, Delete Route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing,  wrapAsync(listingController.updateListings))
    .delete(isLoggedIn, wrapAsync(listingController.destroyListing))



//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;