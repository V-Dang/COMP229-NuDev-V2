let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");




//connect to survey model
let Survey = require("../models/survey");
//let Survey = surveyModel.Survey 

//GET Route for the survey list page - READ Operation
module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        } else {
            //console.log(contactlist)

            res.render("surveys/list", {title: "Surveys", SurveyList: surveyList, displayName: req.user ? req.user.displayName: ''});
            //render contact.ejs and pass title and contactlist variable we are passing contactsList object to ContactsList 
        }
    });
};

module.exports.displayTakeSurveyPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, Takesurvey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render("surveys/take", {title: Takesurvey.survey_name, takesurvey: Takesurvey, displayName: req.user ? req.user.displayName: ''});
        }
    });
};

module.exports.displayEditSurveyPage = (req, res, next) => {
    let id = req.params.id;
        Survey.findById(id, (err, Editsurvey) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                res.render("surveys/edit", {title: "Edit Survey Title", editsurvey: Editsurvey, displayName: req.user ? req.user.displayName: ''});         //show edit view
            }
        });
    };

module.exports.processEditSurveyPage = (req, res, next) => {
    let id = req.params.id;
    
    let updateSurvey = Survey({
     "_id": id,
     "survey_name": req.body.survey_name,
     "survey_subject": req.body.survey_subject,
     "q1": req.body.q1,
     "q2": req.body.q2,
     "q3": req.body.q3,
    });
    Survey.updateOne({_id:id}, updateSurvey, (err) => {
      if(err)
    {
        console.log(err);
        res.end(err);
    }
      else
    {
        //refresh the survey list
        res.redirect("/survey");
    }
});
}


module.exports.addpage = (req, res, next) => {
    res.render("surveys/add", {title: "Create a Survey"
   }); 
};

   module.exports.addprocesspage = (req, res, next) => {
    let newSurvey = Survey({
        "survey_name": req.body.survey_name,
        "survey_subject": req.body.survey_subject,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3": req.body.q3,
    });
    Survey.create(newSurvey, (err, survey) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        //refresh the Survey list
        res.redirect("/survey");
      }
    });
  };

module.exports.displayeditpage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveytoEdit) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
  // show the edit view
  res.render("surveys/edit", {title: "Edit Survey", survey:surveytoEdit})
      }
    });
  }; 

module.exports.deletepage = (req, res, next) => {
    let id = req.params.id;
    Survey.remove({_id: id}, (err) => {
    if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
      //refresh the survey list
      res.redirect("/survey");
      }
  });
  };