import { Service } from 'typedi';
import { Translation } from '@/interfaces/translation.interface';
import { TranslationNotFoundException } from '@/exceptions/translationNotFoundException';
import { env } from 'process';

@Service()
export class TranslateService {
  protected API_URL: string;
  protected API_KEY: string;

  public constructor() {
    this.API_URL = env.YANDEX_DICTIONARY_API_URL;
    this.API_KEY = env.YANDEX_DICTIONARY_API_KEY;
  }

  protected async yandexDictionaryAPI(translation: Translation): Promise<Translation> {
    const targetLanguage = `${translation.language}-${translation.targetLanguage}`;

    const url = new URL(this.API_URL);
    url.searchParams.set('lang', targetLanguage);
    url.searchParams.set('text', translation.word);
    url.searchParams.set('key', this.API_KEY);

    const response = await fetch(url)
      .then(response => response.json())
      .catch(error => {
        throw new TranslationNotFoundException(error);
      });

    if (!response.def.length) {
      throw new TranslationNotFoundException(`with this word '${translation.word}'`);
    }

    const newTranslation: Translation = { ...translation };

    newTranslation.meanings = [];

    response.def.forEach(definition => {
      definition.tr.forEach(tr => {
        newTranslation.meanings.push(tr.text);

        if (Array.isArray(tr.syn)) {
          newTranslation.meanings = newTranslation.meanings.concat(tr.syn.map(syn => syn.text));
        }
      });
    });

    return newTranslation;
  }

  public async translate(translation: Translation): Promise<Translation> {
    const newTranslation = await this.yandexDictionaryAPI(translation);

    return newTranslation;
  }
}
