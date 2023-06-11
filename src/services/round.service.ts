import { Service } from 'typedi';
import { ERoundLanguage, Round } from '@interfaces/round.interface';
import { RoundModel } from '@models/round.model';
import { InvalidArgumentException } from '@/exceptions/invalidArgumentException';
import { ObjectId } from 'mongoose';
import { RoundNotFoundException } from '@/exceptions/roundNotFoundException';
import { HttpException } from '@/exceptions/httpException';
import { StatusCodes } from 'http-status-codes';

@Service()
export class RoundService {
  public async createRound(word: string, language: ERoundLanguage, roundTime: number): Promise<Round> {
    if (roundTime <= 0) {
      throw new InvalidArgumentException('The roundTime must be longer than zero!');
    }

    const round: Round = await RoundModel.create({ word, language, roundTime });

    if (!round) {
      throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Occurred an internal error when creating a round!');
    }

    return round;
  }

  public async findRoundById(roundId: ObjectId): Promise<Round> {
    const round: Round = await RoundModel.findById(roundId);

    if (!round) {
      throw new RoundNotFoundException("Round doesn't exists!");
    }

    return round;
  }

  public async isRoundFinish(roundId: ObjectId): Promise<boolean> {
    const round: Round = await this.findRoundById(roundId);

    return round.isFinish;
  }

  public async finishTheRound(roundId: ObjectId): Promise<boolean> {
    await this.findRoundById(roundId);

    /**
     * @description There is no need to wait for the update
     */
    RoundModel.findOneAndUpdate({ _id: roundId }, { isFinish: true });

    return true;
  }
}
