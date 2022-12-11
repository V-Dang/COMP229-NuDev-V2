//COMP229-Assignment-2-Vivian-Dang-302278335
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require('passport');

function requireAuth(req, res, next)
{
  if (!req.isAuthenticated())
  {
    return res.redirect('/login');
  }
  next();
}

let surveyController = require('../controllers/surveys');

router.get('/', surveyController.displaySurveyList);

router.get('/take/:id', requireAuth, surveyController.displayTakeSurveyPage);

router.post('/take/:id', requireAuth, surveyController.processTakeSurveyPage);

router.get('/answer/:id', requireAuth, surveyController.displayAnswerPage);

router.get('/edit/:id', requireAuth, surveyController.displayEditSurveyPage);

router.post('/edit/:id', requireAuth, surveyController.processEditSurveyPage);

  
  //  GET the Survey Details page in order to add a new Survey
  router.get("/add", requireAuth, surveyController.addpage);
  
  // POST process the Survey  Details page and create a new Survey  - CREATE operation
  router.post("/add", requireAuth, surveyController.addprocesspage);

  
  // GET - process the delete - DELETE operation
router.get("/delete/:id", requireAuth, surveyController.deletepage );

module.exports = router;
