import mongoose from 'mongoose';
import 'dotenv/config';
import { ZodiacInfo } from '../server/models/zodiacModel.js';

async function main() {
  await mongoose.connect(process.env.MONGO_URI as string);

  // Clear and insert all 12 signs
  await ZodiacInfo.deleteMany({});
  await ZodiacInfo.insertMany([
    {
      userZodiac: 'Aries',
      startD: '03/21',
      endD: '04/19',
      traits: [
        'brave',
        'willful',
        'productive',
        'enterprising humanitarian',
        'moody',
        'impulsive',
        'impatient',
        'assertive',
      ],
    },
    {
      userZodiac: 'Taurus',
      startD: '04/20',
      endD: '05/20',
      traits: [
        'practical',
        'resourceful',
        'confident',
        'energetic',
        'tidy',
        'stubborn',
        'unforgiving',
        'excessive',
      ],
    },
    {
      userZodiac: 'Gemini',
      startD: '05/21',
      endD: '06/20',
      traits: [
        'curious',
        'skillful',
        'humorous',
        'seductive',
        'imaginative',
        'impractical',
        'restless',
        'nervous',
        'careless',
      ],
    },
    {
      userZodiac: 'Cancer',
      startD: '06/21',
      endD: '07/22',
      traits: [
        'intelligent',
        'crafty',
        'rational',
        'strong-willed',
        'tenacious',
        'moody',
        'irritable',
        'oppressive',
      ],
    },
    {
      userZodiac: 'Leo',
      startD: '07/23',
      endD: '08/22',
      traits: [
        'dominant',
        'courageous',
        'aristocratic',
        'idealistic',
        'arrogant',
        'impulsive',
        'despotic',
        'hedonistic',
      ],
    },
    {
      userZodiac: 'Virgo',
      startD: '08/23',
      endD: '09/22',
      traits: [
        'efficient',
        'industrious',
        'calm',
        'altruistic',
        'adaptable',
        'highly sensitive',
        'over-critical',
        'materialistic',
      ],
    },
    {
      userZodiac: 'Libra',
      startD: '09/23',
      endD: '10/22',
      traits: [
        'fair',
        'wise',
        'helpful',
        'friendly',
        'superficial',
        'indifferent',
        'vain',
        'convenience-loving',
      ],
    },
    {
      userZodiac: 'Scorpio',
      startD: '10/23',
      endD: '11/21',
      traits: [
        'emotional',
        'determined',
        'inquisitive',
        'industrious',
        'jealous',
        'compulsive',
        'unforgiving',
      ],
    },
    {
      userZodiac: 'Sagittarius',
      startD: '11/22',
      endD: '12/21',
      traits: [
        'optimistic',
        'fair-minded',
        'funny',
        'intellectual',
        'reckless',
        'cold-hearted',
        'impatient',
        'overconfident',
      ],
    },
    {
      userZodiac: 'Capricorn',
      startD: '12/22',
      endD: '01/19',
      traits: [
        'self-disciplined',
        'persevering',
        'stoic',
        'determined',
        'serious',
        'hard-hearted',
        'inflexible',
        'pessimistic',
      ],
    },
    {
      userZodiac: 'Aquarius',
      startD: '01/20',
      endD: '02/18',
      traits: [
        'generous',
        'trustworthy',
        'independent',
        'logical',
        'detached',
        'indifferent',
        'rebellious',
      ],
    },
    {
      userZodiac: 'Pisces',
      startD: '02/19',
      endD: '03/20',
      traits: [
        'sensible',
        'placid',
        'easygoing',
        'warm-hearted',
        'dreamy',
        'obsessive',
        'restless',
        'insecure',
      ],
    },
  ]);

  console.log('✅ update zodiac profile');
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
