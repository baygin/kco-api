import { Service } from 'typedi';
import { Word } from '@interfaces/word.interface';
import { NotFoundException } from '@/exceptions/notFoundException';
import { WordModel } from '@/models/word.model';

@Service()
export class WordService {
  public async createWord(word: Word): Promise<Word> {
    return await WordModel.create(word);
  }

  public async findRandomWord(): Promise<Word> {
    const words: Word[] = await WordModel.aggregate([
      {
        $sample: {
          size: 1,
        },
      },
    ]);

    if (!words.length) {
      throw new NotFoundException('The word schema is empty!');
    }

    return words[0];
  }
}
