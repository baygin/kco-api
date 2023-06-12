export enum ERoundLanguage {
  /**
   * English to Turkish
   */
  enTR = 'en-tr',
}

export interface Round {
  id: string;
  word?: string;
  language?: ERoundLanguage;
  date?: Date;
  roundTime?: number;
  isFinish: boolean;
}
