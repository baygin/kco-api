import { Word } from './word.interface';

export interface Translation extends Word {
  targetLanguage: string;
  meanings?: Array<string>;
}
