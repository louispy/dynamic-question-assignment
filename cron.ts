import cron from "node-cron";

import { initDatabase } from "./db";
import { Cycle } from "./schemas/cycle";
import { Question } from "./schemas/question";

const run = async () => {
  await initDatabase();
  const cronExpression: string = process.env.CRON || "0,30 * * * * *";
  const task = cron.schedule(cronExpression, async () => {
    try {
      const now = Date.now();
      console.log("Updating cycle...", now);
      const cycles = await Cycle.find();
      const promises = cycles.map(async (cycle) => {
        const lastUpdated = cycle.lastUpdated.getTime();
        const td = now - lastUpdated;
        if (td < cycle.duration) return;
        const question = await Question.findOne({ _id: cycle.currentQuestion });
        if (!question) return;
        cycle.lastUpdated = new Date(lastUpdated + Math.floor((now - lastUpdated) / cycle.duration) * cycle.duration);
        cycle.currentQuestion = question.next || cycle.currentQuestion;
        await cycle.save();
      });

      await Promise.all(promises);
      console.log('Finished updating cycle');
    } catch (error) {
      console.log("error running cron", error);
    }
  });

  task.start();
};

run();
