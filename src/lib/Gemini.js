const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY);

const main = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });

    const result = await chat?.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
};

module.exports = main;
