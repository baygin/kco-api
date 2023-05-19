import { Round } from './round.interface';

export interface IRoundManager {
  /**
   * {
   *  trEn: [
   *      {
   *          ...roundDetails,
   *      },
   *      {
   *          ...round2Details,
   *      },
   * ],
   * }
   */
  languages: {
    [key: string]: Round[];
  };

  addRound: (round: Round) => void;
}
