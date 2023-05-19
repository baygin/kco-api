import { ObjectId } from 'mongoose';

export enum AnswerStatus {
  NotChecked = 0,
  Unknown = 1,
  True = 2,
  False = 3,
}

export interface Answer {
  _id?: ObjectId;
  roundId: ObjectId;
  answer: string;
  date?: Date;
  isCorrect: AnswerStatus;
}
