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
      startD: 'March 21',
      endD: 'April 20',
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
      startD: 'April 21',
      endD: 'May 21',
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
      startD: 'May 21',
      endD: 'June 21',
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
      startD: 'June 22',
      endD: 'July 22',
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
      startD: 'July 23',
      endD: 'August 22',
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
      startD: 'August 24',
      endD: 'September 23',
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
      startD: 'September 23',
      endD: 'October 22',
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
      startD: 'October 23',
      endD: 'November 22',
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
      startD: 'November 22',
      endD: 'December 20',
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
      startD: 'December 21',
      endD: 'January 19',
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
      startD: 'January 20',
      endD: 'February 18',
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
      startD: 'February 18',
      endD: 'March 20',
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
