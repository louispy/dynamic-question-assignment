import cors from "cors";
import express from "express";
import morgan from "morgan";

import { initDatabase } from "./db";
import { Cycle } from "./schemas/cycle";
import { Question } from "./schemas/question";

const run = async () => {
  await initDatabase();
  const app = express();
  const port = 5000;

  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));

  app.get("/", (req, res) => {
    res.send("Hello, TypeScript Node Express!");
  });

  app.get("/question", async (req, res) => {
    try {
      const region = req.query.region || "SGP";
      const cycle = await Cycle.findOne({ region });
      if (!cycle) {
        return res.status(400).json({ message: "Cycle not found" });
      }
      const question = await Question.findOne({ _id: cycle.currentQuestion });
      if (!question) {
        return res.status(400).json({ message: "Question not found" });
      }
      return res.status(200).json({ question: question.question });
    } catch (error) {
      return res.status(500).json({ message: "oops something went wrong", error });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

run();
