import express from "express";
import "dotenv/config";

const app = express();
import { dbConnect } from "./DB/db.js";
import cors from "cors";

dbConnect()
    .then(() => {
        console.log("connected to DATABASE");
    })
    .catch((error) => {
        console.log('DB connection error :', error);
    })


import chatRoutes from "./routes/chat.route.js";

// Middleware to parse JSON bodies.
app.use(express.json());
let frontend_origin = process.env.FRONTEND_URL;
app.use(cors({
    origin: frontend_origin,
     methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use("/api", chatRoutes);

// app.post('/test', async (req, res) => {

//     let { prompt } = req.body;

//     const generatedText = await getGemeniResponse(prompt);

//     res.send(generatedText);

// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is listening on port:${PORT}`);
})

























// import {GoogleGenAI} from '@google/genai';
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: 'gemini-2.0-flash-001',
//     contents: 'tell me a joke',
//   });
//   console.log(response.text);
// }

// main();

