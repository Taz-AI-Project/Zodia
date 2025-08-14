import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import Log from '../models/logModel.js';

export const logQuery: RequestHandler = async (_req, res, next) => {
  console.log('🔍 in logQuery');
  const {
    userZodiac,
    userQuery,
    pineconeQueryResult,
    embedding,
    quoteRecommendation,
  } = res.locals;

  //TO DO: mock data to be removed
  // const userZodiac = 'Aquarius';
  // const userQuery = 'I feel happy!';
  // const pineconeQueryResult = [
  //   {
  //     id: '1',
  //     score: 0.999967217,
  //     values: [],
  //     sparseValues: undefined,
  //     metadata: {
  //       content:
  //         'The more you praise and celebrate your life, the more there is in life to celebrate. - Oprah Winfrey',
  //     },
  //   },
  // ];
  // const embedding = [0, 1, 2];
  // const quoteRecommendation = 'You are amazing!';

  try {
    const log = await Log.insertOne({
      userZodiac,
      userQuery,
      pineconeQueryResult,
      quoteRecommendation,
      embedding,
    });
    res.locals.log = log;
    return next();
  } catch (err) {
    const error: ServerError = {
      log: `logQuery: ${err}`,
      status: 500,
      message: { err: `An error occured while logging query to mongodb` },
    };
    return next(error);
  }
};
