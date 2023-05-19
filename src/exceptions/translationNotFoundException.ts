import { NotFoundException } from './notFoundException';

export class TranslationNotFoundException extends NotFoundException {
  constructor(additionalMessage = '') {
    let message = `The word's translation not found`;

    if (additionalMessage) {
      message += `, ${additionalMessage}`;
    }

    message += '!';

    super(message);
  }
}
