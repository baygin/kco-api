import { ObjectId } from 'mongoose';

export enum ERoundLanguage {
  trEN = 'tr-en',
}

export interface Round {
  _id: ObjectId;
  word?: string;
  language?: ERoundLanguage;
  date?: Date;
  roundTime?: number;
  isFinish: boolean;
}
