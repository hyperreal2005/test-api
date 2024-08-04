/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

require("./frontend/src/app.js");
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You have to give a mental health analysis based on the options selected by the user, in thr 5 questions in this survey. You have to give a short concised report on their mental health. Don't  make it very long, keep it short and concised. Also, the input will be in JSON format.",
  });
  
  const generationConfig = {
    temperature: 1.25,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "hi\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Please provide me with the 5 questions and the user's answers so I can give you a mental health analysis. \n"},
          ],
        },
      ],
    });
    
    const result = await chatSession.sendMessage();
    console.log(result.response.text());
  }

  run();