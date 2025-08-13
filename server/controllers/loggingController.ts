import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import Log from '../models/logModel';

export const logQuery: RequestHandler = async (_req, res, next) => {
  const { userSign, userQuery, allQuoteRecommendations, embedding } =
    res.locals;

  try {
    await Log.insertOne({
      userSign,
      userQuery,
      allQuoteRecommendations,
      embedding,
    });
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
