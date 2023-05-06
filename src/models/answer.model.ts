import { model, Schema, Document } from 'mongoose';
import { Answer } from '@interfaces/answers.interface';
import { Types } from 'mongoose';

const AnswerSchema: Schema = new Schema({
  roundId: {
    type: Types.ObjectId,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  isCorrect: {
    type: Number,
    default: 0,
    required: true,
  },
});

export const AnswerModel = model<Answer & Document>('Answer', AnswerSchema);
