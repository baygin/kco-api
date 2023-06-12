import { config } from 'dotenv';
import { RoundManager } from '@/utils/round-manager';
import { ERoundLanguage, Round } from '@/interfaces/round.interface';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

describe('[Utils] Round Manager', () => {
  const roundManager: RoundManager = new RoundManager();

  const round: Round = {
    id: '4edd40c86762e0fb1s2000003',
    word: 'car',
    language: ERoundLanguage.enTR,
    date: new Date(),
    roundTime: 30, // seconds
    isFinish: false,
  };

  it('the round added successfully', async () => {
    const ret = roundManager.addRound(round);

    expect(ret).toBe(undefined);
  });

  it('get the round by id successfully', async () => {
    expect(roundManager.findRoundById(round.id)).toMatchObject(round);
  });

  it('get the all round by language successfully', async () => {
    const rounds: Round[] = roundManager.getAllRoundByLanguage(ERoundLanguage.enTR);

    expect(rounds.length).toBe(1);
    expect(rounds[0]).toMatchObject(round);
    expect(rounds[1]).toBeUndefined();
  });

  it('remove the round by id', async () => {
    roundManager.removeRoundById(round.id);
    const rounds: Round[] = roundManager.getAllRoundByLanguage(round.language);
    const _round: Round = roundManager.findRoundById(round.id);

    expect(rounds.length).toBe(0);
    expect(rounds[0]).toBeUndefined();
    expect(_round).toBeNull();
  });

  it('remove the rounds by the language', async () => {
    roundManager.addRound(round);

    const rounds: Round[] = roundManager.getAllRoundByLanguage(round.language);

    expect(rounds.length).toBe(1);
    expect(rounds[0]).toMatchObject(round);

    roundManager.removeRoundsByLanguage(ERoundLanguage.enTR);

    const rounds2: Round[] = roundManager.getAllRoundByLanguage(round.language);

    expect(rounds2.length).toBe(0);
    expect(rounds2[0]).toBeUndefined();
  });
});
