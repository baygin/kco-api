import { ObjectId } from 'mongoose';

export interface RoundDetail {
  id?: string;
  name?: string;
  language?: string;
  targetLanguage?: string;
  /**
   * Owner user of the round
   * Reserved for the new features
   */
  userId?: ObjectId;
}
