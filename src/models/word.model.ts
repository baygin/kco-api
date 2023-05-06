import { Word } from '@/interfaces/word.interface';
import { model, Schema, Document } from 'mongoose';

const WordSchema: Schema = new Schema(
  {
    word: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const WordModel = model<Word & Document>('Word', WordSchema);
