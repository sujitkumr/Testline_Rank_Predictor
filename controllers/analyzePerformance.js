const { fetchQuizSubmissionData } =require( "../services/fetchAllData");

const analyzePerformance = async (req, res) => {
    try {
        const submissionData = await fetchQuizSubmissionData();

        if (!submissionData) {
            return res.status(400).json({
                message: "No submission data found"
            });
        }

        const { total_questions, correct_answers, incorrect_answers, rank_text } = submissionData;

        if (total_questions && correct_answers != null && incorrect_answers != null) {
            const accuracy = (correct_answers / total_questions) * 100;

            res.status(200).json({
                totalQuestions: total_questions,
                correctAnswers: correct_answers,
                incorrectAnswers: incorrect_answers,
                accuracy: accuracy.toFixed(2) + "%",
                rank: rank_text
            });
        } else {
            return res.status(400).json({
                message: "Incomplete submission data"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error analyzing quiz performance",
            error: err.message
        });
    }
}
module.exports= analyzePerformance;
