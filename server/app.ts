import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import { parseUserQuery } from './controllers/userQueryController.js';
import {
  queryOpenAIEmbedding,
  queryOpenAIChat,
} from './controllers/openaiController.js';
import { queryPineconeDatabase } from './controllers/pineconeController.js';
import { logQuery } from './controllers/loggingController.js';

import { ServerError } from '../types/types.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post(
  '/api',
  parseUserQuery,
  queryOpenAIEmbedding,
  queryPineconeDatabase,
  queryOpenAIChat,
  logQuery,
  (_req, res) => {
    res.status(200).json({
      quoteRecommendation: res.locals.quoteRecommendation,
    });
  }
);

app.get('/api', (req, res) => {
    
})

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
