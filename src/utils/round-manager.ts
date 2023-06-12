import { IRoundManager } from '@/interfaces/round-manager.interface';
import { ERoundLanguage, Round } from '@/interfaces/round.interface';

export class RoundManager implements IRoundManager {
  protected rounds: {
    [key: string]: Round[];
  };

  constructor() {
    this.rounds = {};
  }

  public addRound(round: Round): void {
    /** TODO: validation  */

    if (this.rounds[round.language] instanceof Array) {
      this.rounds[round.language].push(round);
    } else {
      this.rounds[round.language] = [round];
    }

    return;
  }

  protected findRoundIndexById(id: string): [number, ERoundLanguage] | null {
    let roundIndex: number = null;
    let roundLanguage: ERoundLanguage = null;

    Object.keys(this.rounds).forEach((language: ERoundLanguage) => {
      this.rounds[language].forEach((round: Round, index: number) => {
        if (round.id === id) {
          roundIndex = index;
          roundLanguage = language;
          return;
        }
      });

      if (roundIndex !== null) {
        return;
      }
    });

    return [roundIndex, roundLanguage];
  }

  public findRoundById(id: string): Round | null {
    const [roundIndex, roundLanguage] = this.findRoundIndexById(id);

    if (roundIndex !== null) {
      return this.rounds[roundLanguage][roundIndex];
    }

    return null;
  }

  public getAllRoundByLanguage(language: ERoundLanguage): Round[] | null {
    return this.rounds[language] || null;
  }

  public removeRoundById(id: string): boolean {
    const [roundIndex, roundLanguage] = this.findRoundIndexById(id);

    if (roundIndex !== null) {
      const id = this.rounds[roundLanguage][roundIndex].id;

      this.rounds[roundLanguage] = this.rounds[roundLanguage].filter((round: Round) => {
        return round.id !== id;
      });

      return true;
    }

    return false;
  }

  public removeRoundsByLanguage(language: ERoundLanguage): number | false {
    if (!this.rounds[language]) {
      return false;
    }

    const length = this.rounds[language].length;
    this.rounds[language] = [];

    return length;
  }
}
