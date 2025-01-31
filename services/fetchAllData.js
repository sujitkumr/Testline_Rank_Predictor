
const axios = require('axios');
const https = require('https');

const agent = new https.Agent({  
  rejectUnauthorized: false  
});

const fetchQuizdata = async () => {
    try {
        const response = await axios.get(process.env.QUIZ_ENDPOINT, { httpsAgent: agent });
        return response.data;
    } catch (error) {
        console.error("Error fetching quiz data:", error.message);
        throw new Error("Unable to fetch quiz data.");
    }
}


// const fetchQuizdata = async () => {
//     try {
//         const response = await axios.get(process.env.QUIZ_ENDPOINT);
//         return response.data;
//         console.log(response.data,"jgsfoois")
//     } catch (error) {
//         console.error("Error fetching quiz data:", error.message);
//         throw new Error("Unable to fetch quiz data.");
//     }
// }

const fetchQuizSubmissionData = async () => {
    try {
        const response = await axios.get(process.env.SUBMISSION_ENDPOINT);
        return response.data;
    } catch (error) {
        console.error("Error fetching quiz submission data:", error.message);
        throw new Error("Unable to fetch quiz submission data.");
    }
}


module.exports = { fetchQuizdata, fetchQuizSubmissionData };

