import { TranslateService } from '@/services/translate.service';
import { Translation } from '@/interfaces/translation.interface';
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

describe('[Service] Testing Translation', () => {
  describe('Translate', () => {
    it('translation is correct', async () => {
      const service = new TranslateService();

      const translation: Translation = {
        word: 'car',
        language: 'en',
        targetLanguage: 'tr',
        meanings: ['araba', 'araç', 'otomobil', 'oto', 'taşıt', 'vagon', 'kabin', 'arabalı', 'aracı'],
      };

      const newTranslation: Translation = await service.translate(translation);

      return expect(translation).toMatchObject(newTranslation);
    });
  });
});
