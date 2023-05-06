import { ObjectId } from 'mongoose';

export interface Answer {
  _id?: ObjectId;
  roundId: ObjectId;
  userId?: ObjectId;
  answer: string;
  date?: Date;
  isCorrect?: number;
}
