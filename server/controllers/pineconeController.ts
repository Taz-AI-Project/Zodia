import { RequestHandler } from 'express';
import { ServerError, QuoteMetadata } from '../../types/types';
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
import 'dotenv/config';

dotenv.config();

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export const queryPineconeDatabase: RequestHandler = async (
  _req,
  res,
  next
) => {
  const { embedding } = res.locals;
  console.log('🔍 in queryPineconeDatabase');
  if (!embedding) {
    const error: ServerError = {
      log: 'Database query middleware did not receive embedding',
      status: 500,
      message: { err: 'An error occurred before querying the database' },
    };
    return next(error);
  }
  try {
    const index = pc.index<QuoteMetadata>(process.env.PINECONE_INDEX!);
    const result = await index.query({
      vector: embedding,
      topK: 3,
      includeMetadata: true,
    });
    res.locals.pineconeQueryResult = result.matches;
    return next();
  } catch (err) {
    const error = {
      log: `queryPineconeDatabase: ${err}`,
      status: 500,
      message: { err: 'An error occurred while querying database' },
    };
    return next(error);
  }
  // res.locals.pineconeQueryResult = [
  //   {
  //     id: '1',
  //     score: 0.54014945,
  //     values: [],
  //     sparseValues: undefined,
  //     metadata: {
  //         id: '1',
  //         content: 'You are amazing!',
  //     }
  //     },
  //     {
  //     id: '2',
  //     score: 0.54014945,
  //     values: [],
  //     sparseValues: undefined,
  //     metadata: {
  //         id: '2',
  //         content: 'I am amazing!',
  //     }
  //     },
  //     {
  //     id: '3',
  //     score: 0.54014945,
  //     values: [],
  //     sparseValues: undefined,
  //     metadata: {
  //         id: '3',
  //         content: 'They are amazing!',
  //     }
  //     },

  // ];
  // return next();
};
