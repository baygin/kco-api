import { IsString, IsNotEmpty, MaxLength, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateAnswerDto {
  @IsMongoId()
  public roundId: ObjectId;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  public answer: string;
}
