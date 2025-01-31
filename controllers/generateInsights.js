
const { fetchQuizSubmissionData, fetchQuizdata } = require("../services/fetchAllData");
const axios = require("axios");

const fetchCollegeData = async () => {
    return [
        { college: "College A", category: "General", cutoff_rank: 2000 },
        { college: "College B", category: "OBC", cutoff_rank: 2500 },
        { college: "College C", category: "SC", cutoff_rank: 3000 },
        { college: "College D", category: "ST", cutoff_rank: 3500 },
    ];
};

const predictCollegeAdmission = (predictedRank, category, collegeData) => {
    const possibleColleges = collegeData.filter(
        (college) =>
            predictedRank <= college.cutoff_rank && 
            college.category === category
    );

    console.log("Possible Colleges:", possibleColleges);
    return possibleColleges;
};

const generateInsights = async (req, res) => {
    try {
        const submissionData = await fetchQuizSubmissionData();
        const quizData = await fetchQuizdata();

        const totalQuestions = submissionData.total_questions;
        const correctAnswers = submissionData.correct_answers;
        const incorrectAnswers = submissionData.incorrect_answers;

        const predictedRank = 1500;
        const category = "General";

        const collegeData = await fetchCollegeData();

        const possibleColleges = predictCollegeAdmission(predictedRank, category, collegeData);

        res.status(200).json({
            totalQuestions,
            correctAnswers,
            incorrectAnswers,
            weakAreas: [
                {
                    topic: " Cell Structure and Function ",
                    accuracy: "0.00%",
                },
            ],
            difficultyPerformance: { easy: 0, medium: 0, hard: 0 },
            performanceTrends: [],
            predictedRank,
            possibleColleges,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error generating insights",
            error: err.message,
        });
    }
};

module.exports = generateInsights;
