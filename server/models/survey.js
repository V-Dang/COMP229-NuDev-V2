let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let surveyModel = mongoose.Schema(
    {
        survey_name: String, 
        survey_subject: String, 
        // survey_date: {
        //     type: Date,
        //     default: Date.now,
        // },
        q1: String,
        q2: String,
        q3: String,
        a1: String,
        a2: String,
        a3: String
    },

    {
        collection: "surveys",
    }
);

module.exports = mongoose.model('Survey', surveyModel);