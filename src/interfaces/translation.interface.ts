import { Word } from './word.interface';

export interface Translation extends Word {
  languages: {
    main: String;
    target: String;
  };
  meanings?: Array<string>;
}
