import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import Log from '../models/logModel.js';

export const logQuery: RequestHandler = async (_req, res, next) => {
  console.log('in log controller');
  //   const { userSign, userQuery, allQuoteRecommendations, embedding, finalQuote } =
  //     res.locals;

  //TO DO: mock data to be removed
  const userSign = 'Aquarius';
  const userQuery = 'I feel happy about coding';
  const allQuoteRecommendations = ['quote 1', 'quote 2', 'quote 3'];
  const embedding = [0, 1, 2];
  const finalQuote = 'You are amazing!';

  try {
    const log = await Log.insertOne({
      userSign,
      userQuery,
      allQuoteRecommendations,
      finalQuote,
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
