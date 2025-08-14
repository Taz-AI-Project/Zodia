import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import Log from '../models/logModel.js';

export const logQuery: RequestHandler = async (_req, res, next) => {
  console.log('in log controller');
  //   const { userZodiac, userQuery, pineconeQueryResult, embedding, quoteRecommendation } =
  //     res.locals;

  //TO DO: mock data to be removed
  const userZodiac = 'Aquarius';
  const userQuery = 'I feel happy about coding';
  const pineconeQueryResult = ['quote 1', 'quote 2', 'quote 3'];
  const embedding = [0, 1, 2];
  const quoteRecommendation = 'You are amazing!';

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
