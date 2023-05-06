import { NotFoundException } from './notFoundException';

export class RoundNotFoundException extends NotFoundException {
  constructor(message = 'Round not found!') {
    super(message);
  }
}
