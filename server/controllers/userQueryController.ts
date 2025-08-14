import { Request, RequestHandler } from 'express';
import { ServerError } from '../../types/types';
// Parse the user's feeling and pass it down the middleware chain
export const parseUserQuery: RequestHandler = (req, res, next) => {
  const userQuery = req.body?.userQuery;
  const userZodiac = req.body?.userZodiac;

  // Validate input
  if (typeof userQuery !== 'string' || userQuery.trim() === '') {
    const error: ServerError = {
      log: 'parseUserQuery did not receive a valid "string"',
      status: 400,
      message: { err: 'An error occurred while parsing the userQuery' },
    };
    return next(error);
  }
  //TO DO: validate userZodiac
  if (typeof userZodiac !== 'string') {
      const error: ServerError = {
        log: 'parseUserQuery: "userZodiac" must be a string if provided',
        status: 400,
        message: { err: 'Invalid userZodiac format' },
      };
      return next(error);
    }

  // Normalize
  res.locals.userQuery = userQuery;
  res.locals.userZodiac = userZodiac;

  return next();
};