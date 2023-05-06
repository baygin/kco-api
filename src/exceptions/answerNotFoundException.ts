import { NotFoundException } from './notFoundException';

export class AnswerNotFoundException extends NotFoundException {
  constructor(message = 'There is no answer!') {
    super(message);
  }
}
