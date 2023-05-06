import { Service } from 'typedi';
import { Answer } from '@interfaces/answers.interface';
import { AnswerModel } from '@models/answer.model';
import { ObjectId } from 'mongoose';
import { NotFoundException } from '@/exceptions/notFoundException';
import { UserService } from './users.service';
import { RoundService } from './round.service';
import { InvalidArgumentException } from '@/exceptions/invalidArgumentException';
import { Round } from '@/interfaces/round.interface';
import { RoundFinishException } from '@/exceptions/roundFinishException';

@Service()
export class AnswerService {
  public async createAnswer(answer: Answer): Promise<Answer> {
    const round: Round = await new RoundService().findRoundById(answer.roundId);

    if (round.isFinish) {
      throw new RoundFinishException("The roundId exists but it's finished.");
    }

    if (!answer.userId) {
      throw new InvalidArgumentException('The userId must not be null!');
    } else {
      await new UserService().findUserById(answer.userId);
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

  public async findAnswersByRoundIdAndUserId(roundId: ObjectId, userId: ObjectId): Promise<Answer[]> {
    await new UserService().findUserById(userId);
    await new RoundService().findRoundById(roundId);

    const answers: Answer[] = await AnswerModel.find({ roundId, userId });

    if (!answers) {
      throw new NotFoundException("Answers doesn't exists!");
    }

    return answers;
  }
}
