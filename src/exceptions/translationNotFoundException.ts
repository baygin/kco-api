import { NotFoundException } from './notFoundException';

export class TranslationNotFoundException extends NotFoundException {
  constructor(additionalMessage = '') {
    const message = `The word's translation not found! ${additionalMessage}`;
    super(message);
  }
}
