import { model, Schema, Document } from 'mongoose';
import { Round } from '@interfaces/round.interface';
import { Answer } from '@/interfaces/answers.interface';
import { AnswerModel } from './answer.model';
import { AnswerService } from '@/services/answer.service';
import { AnswerNotFoundException } from '@/exceptions/answerNotFoundException';
import { RoundFinishException } from '@/exceptions/roundFinishException';

const RoundSchema: Schema = new Schema({
  word: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  roundTime: {
    type: Number,
    required: true,
  },
  isFinish: {
    type: Boolean,
    required: true,
    default: false,
  },
});

RoundSchema.methods.findAnswers = async function (): Promise<Answer[]> {
  const answers: Answer[] = await new AnswerService().findAnswersByRoundId(this._id);

  if (!answers.length) {
    throw new AnswerNotFoundException('There is no answers!');
  }

  return answers;
};

RoundSchema.methods.createAnswer = async function (answer: Answer): Promise<Answer> {
  if (this.isFinish) {
    throw new RoundFinishException("The roundId exists but it's finished.");
  }

  return await AnswerModel.create(answer);
};

export const RoundModel = model<Round & Document>('Round', RoundSchema);
