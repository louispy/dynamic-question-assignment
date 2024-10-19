import mongoose from "mongoose";

interface ICycle {
  lastUpdated: Date;
  duration: number;
  region: string;
  currentQuestion: mongoose.Types.ObjectId;
}

const cycleSchema = new mongoose.Schema<ICycle>(
  {
    duration: { type: Number, required: true },
    lastUpdated: { type: Date, required: true },
    region: { type: String, required: true },
    currentQuestion: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export const Cycle = mongoose.model("cycle", cycleSchema);
