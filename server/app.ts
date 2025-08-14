import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import { parseUserQuery } from './controllers/userQueryController.js'
//import { parseUserQuery } from './controllers/userQueryController.ts'
// import { queryPineconeDatabase } from './controllers/pineconeController.js'
// import { queryOpenAIEmbedding, queryOpenAIChat } from './controllers/openaiController.js'
// import { logQuery } from './controllers/loggingController.js';
import 'dotenv/config';

import { ServerError } from '../types/types.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api', parseUserQuery, (_req, res) => {
  //demo showing res.locals.userQuery is set
  res.status(200).json({
    quoteRecommendation: 'You are amazing!',
  });
});

const errorHandler: ErrorRequestHandler = (
  err: ServerError,
  _req,
  res,
  _next
) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj: ServerError = { ...defaultErr, ...err };
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
};

app.use(errorHandler);

export default app;
