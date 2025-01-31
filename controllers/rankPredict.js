// CommonJS syntax
const axios = require('axios');

const { fetchQuizSubmissionData } =require ("../services/fetchAllData");

// Function to calculate the rank prediction
const predictRank = async (req, res) => {
    try {
        // Fetch the quiz submission data (e.g., quiz score, accuracy, etc.)
        const submissionData = await fetchQuizSubmissionData();
        const score = submissionData.final_score;
        const accuracy = submissionData.accuracy;  // Accuracy percentage
        const difficultyFactor = submissionData.difficulty_performance || 0; // Difficulty level

        // Calculate the base predicted rank based on score
        let baseRank;

        if (score >= 700) baseRank = Math.floor(Math.random() * 100) + 1;  // Rank 1-100
        else if (score >= 650) baseRank = Math.floor(Math.random() * 400) + 101;  // 101-500
        else if (score >= 600) baseRank = Math.floor(Math.random() * 1500) + 501;  // 501-2000
        else if (score >= 550) baseRank = Math.floor(Math.random() * 8000) + 2001;  // 2001-10000
        else if (score >= 500) baseRank = Math.floor(Math.random() * 40000) + 10001;  // 10001-50000
        else if (score >= 400) baseRank = Math.floor(Math.random() * 100000) + 50001;  // 50001-150000
        else if (score >= 300) baseRank = Math.floor(Math.random() * 150000) + 150001;  // 150001-300000
        else if (score >= 200) baseRank = Math.floor(Math.random() * 200000) + 300001;  // 300001-500000
        else if (score >= 100) baseRank = Math.floor(Math.random() * 300000) + 500001;  // 500001-800000
        else baseRank = Math.floor(Math.random() * 200000) + 800001;  // 800001+

        // Adjust the rank based on accuracy
        let accuracyFactor = 0;
        if (accuracy >= 90) accuracyFactor = -0.05;  // Better accuracy leads to a better rank (5% better)
        else if (accuracy >= 80) accuracyFactor = -0.03;  // 3% better
        else if (accuracy <= 60) accuracyFactor = 0.05;  // Low accuracy results in worse rank (5% worse)

        const adjustedRank = baseRank * (1 + accuracyFactor);

        // Adjust the rank based on difficulty level
        const difficultyAdjustment = (difficultyFactor > 4) ? 0.05 : (difficultyFactor < 2 ? -0.05 : 0);

        // Final predicted rank after all adjustments
        const finalPredictedRank = Math.floor(adjustedRank * (1 + difficultyAdjustment));

        // Send the response with the calculated rank
        res.status(200).json({
            score,
            accuracy,
            predictedRank: finalPredictedRank,
            difficultyAdjustment
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Predicting rank",
            error: error.message
        });
    }
};

module.exports= predictRank;
