const express = require ("express");
const predictRank = require("../controllers/rankPredict");
const generateInsights =require ("../controllers/generateInsights");
const analyzePerformance=  require ("../controllers/analyzePerformance");

const router = express.Router();

router.get("/analyze", analyzePerformance);
router.get("/predict-rank", predictRank);
router.get("/generate-insights", generateInsights);

module.exports= router