import { Service } from 'typedi';
import { Translation } from '@/interfaces/translation.interface';
import { TranslationNotFoundException } from '@/exceptions/translationNotFoundException';
import { env } from 'process';

@Service()
export class TranslateService {
  protected API_ADDRESS = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup';

  // lang=en-tr&text=dictionary

  protected async yandexDictionaryAPI(translation: Translation): Promise<Translation> {
    const targetLanguage = `${translation.languages.main}-${translation.languages.target}`;

    const url = new URL(this.API_ADDRESS);
    url.searchParams.set('lang', targetLanguage);
    url.searchParams.set('text', translation.word);
    url.searchParams.set('key', env.YANDEX_DICTIONARY_API_TOKEN);

    const response = await fetch(url)
      .then(response => response.json())
      .catch(error => {
        throw new TranslationNotFoundException(error);
      });

    if (!response.def.length) {
      throw new TranslationNotFoundException();
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
