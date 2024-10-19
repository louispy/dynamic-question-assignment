import mongoose from "mongoose";

export interface IQuestion {
  _id: mongoose.Types.ObjectId,
  question: string;
  region: string;
  next?: mongoose.Types.ObjectId;
}

const questionSchema = new mongoose.Schema<IQuestion>(
  {
    question: { type: String, required: true },
    region: { type: String, required: true },
    next: { type: mongoose.Schema.Types.ObjectId, required: false },
  },
  { timestamps: true }
);

export const Question = mongoose.model("question", questionSchema);
