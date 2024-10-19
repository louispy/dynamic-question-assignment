import mongoose from "mongoose";
import { initDatabase } from "./db";
import { IQuestion, Question } from "./schemas/question";
import { Cycle } from "./schemas/cycle";

const seed = async () => {
  try {
    console.log("Start seeding...");

    await initDatabase();

    const regions = ["SGP", "USA"];
    const questionsCount = 5;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const promises = regions.map(async (region) => {
      const questions = [];
      let id = new mongoose.Types.ObjectId();
      for (let i = 0; i < questionsCount; i++) {
        const q: IQuestion = {
          _id: id,
          question: `This is question ${i + 1} for region ${region}`,
          region,
        };
        id = new mongoose.Types.ObjectId();
        q.next = id;
        questions.push(q);
      }
      questions[questions.length - 1].next = questions[0]._id;
      await Question.insertMany(questions);

      await Cycle.create({
        currentQuestion: questions[0]._id,
        // duration: 7 * 24 * 3600 * 1000 // 7 days in milliseconds
        duration: 60 * 1000, // 1 minute for testing
        lastUpdated: today,
        region,
      });
    });

    await Promise.all(promises);
    console.log("Finished seeding");
  } catch (err) {
    console.error("Error on seeding", err);
  }
};

seed().then(() => process.exit(0));
