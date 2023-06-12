import { ObjectId } from 'mongoose';
import { ERoundLanguage, Round } from './round.interface';

export interface IRoundManager {
  /**
   * {
   *  enTR: [
   *      {
   *          ...roundDetails,
   *      },
   *      {
   *          ...round2Details,
   *      },
   *  ],
   * }
   */

  addRound: (round: Round) => void;
  findRoundById: (id: string) => Round | void;
  getAllRoundByLanguage: (language: ERoundLanguage) => Round[] | null;

  /**
   * @param id
   * @returns true if exists or false
   */
  removeRoundById: (id: string) => boolean;

  /**
   * @param language
   * @returns count how many deleted or false
   */
  removeRoundsByLanguage: (language: ERoundLanguage) => number | false;
}
