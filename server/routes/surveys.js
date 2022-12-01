//COMP229-Assignment-2-Vivian-Dang-302278335
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require('passport');

//connect to Books model
//let Book = require("../models/book");

let surveyController = require('../controllers/surveys');

router.get('/', surveyController.displaySurveyList);

router.get('/take/:id', surveyController.displayTakeSurveyPage);

router.get('/edit/:id', surveyController.displayEditSurveyPage);

router.post('/edit/:id', surveyController.processEditSurveyPage);

  
  //  GET the Survey Details page in order to add a new Survey
  router.get("/add", surveyController.addpage);
  
  // POST process the Survey  Details page and create a new Survey  - CREATE operation
  router.post("/add", surveyController.addprocesspage);

  
  // GET - process the delete - DELETE operation
router.get("/delete/:id", surveyController.deletepage );

module.exports = router;
