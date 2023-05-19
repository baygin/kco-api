import { Service } from 'typedi';
import { Answer } from '@interfaces/answers.interface';
import { AnswerModel } from '@models/answer.model';
import { ObjectId } from 'mongoose';
import { NotFoundException } from '@/exceptions/notFoundException';
import { RoundService } from './round.service';
import { Round } from '@/interfaces/round.interface';
import { RoundFinishException } from '@/exceptions/roundFinishException';

@Service()
export class AnswerService {
  public async createAnswer(answer: Answer): Promise<Answer> {
    const round: Round = await new RoundService().findRoundById(answer.roundId);

    if (round.isFinish) {
      throw new RoundFinishException("The roundId exists but it's finished.");
    }

    return await AnswerModel.create(answer);
  }

  public async findAnswersByRoundId(roundId: ObjectId): Promise<Answer[]> {
    await new RoundService().findRoundById(roundId);

    const answers: Answer[] = await AnswerModel.find({ roundId });

    if (!answers) {
      throw new NotFoundException("Answer doesn't exists!");
    }

    return answers;
  }
}
