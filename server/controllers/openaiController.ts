import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const queryOpenAIEmbedding: RequestHandler = async (_req, res, next) => {
  const { userQuery } = res.locals;
  const DIM = 512;
  console.log('🔍 in queryOpenAIEmbedding');
  if (!userQuery) {
    const error: ServerError = {
      log: 'queryOpenAIEmbedding did not receive a user query',
      status: 500,
      message: { err: 'An error occurred before querying OpenAI' },
    };
    return next(error);
  }
  try {
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: userQuery,
      encoding_format: 'float',
      dimensions: DIM,
    });
    console.log('embedding', embedding.data[0].embedding);
    if (!embedding) {
      const error: ServerError = {
        log: 'queryOpenAI: Error: OpenAI error',
        status: 500,
        message: { err: 'An error occurred while querying OpenAI' },
      };
      return next(error);
    }
    res.locals.embedding = embedding.data[0].embedding;
    return next();
  } catch (err) {
    const error: ServerError = {
      log: `queryOpenAIEmnbedding had an error embedding ${err}`,
      status: 500,
      message: {
        err: 'An error occurred talking to ai trying to embed the data',
      },
    };
    return next(error);
  }
};

export const queryOpenAIChat: RequestHandler = async (_req, res, next) => {
  const { userQuery, userZodiac, pineconeQueryResult } = res.locals;
  console.log('🔍 in queryOpenAIChat');
  if (!userQuery) {
    const error: ServerError = {
      log: 'queryOpenAIChat did not receive a user query',
      status: 500,
      message: { err: 'An error occurred before querying OpenAI' },
    };
    return next(error);
  }
  if (!userZodiac) {
    const error: ServerError = {
      log: 'queryOpenAIChat did not receive a user Zodiac',
      status: 500,
      message: { err: 'An error occurred before querying OpenAI' },
    };
    return next(error);
  }
  if (!pineconeQueryResult) {
    const error: ServerError = {
      log: 'queryOpenAIChat did not receive pinecone query results',
      status: 500,
      message: { err: 'An error occurred before querying OpenAI' },
    };
    return next(error);
  }

  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `

        You are a helpful assistant that recommends helpful quotes to a user based on the feeling that they input.
        You will be given a zodiac sign from the user along with how they are feeling.
        You will find the keywords that pertain to feelings from their input.
        You will determine whether the feeling is possitive or negative.
        You have access to a list of quotes from ${pineconeQueryResult} and the vectorized version of them.
        You will determine the best quote from the list that relates to their feeling.
        You will then change the quote to one that will be in your own words.
        Be aware of the feeling the user has and how people with that zodiac sign prefer to take information then adjust the quote to be most suitable them.
        If their feeling is positive your response should include an encouraging initial response, then offer the quote you create as something that can reinforce that feeling.
        If their feeling is negative your response should include an apathetic initial response, then offer the quote you create as something that might help them through their feeling.
        Your response should only mention the users zodiac sign in the form of: "as a ${userZodiac}, you"...
      `,
        },
        { role: 'user', content: `I am a ${userZodiac} and ${userQuery}` },
      ],
      temperature: 1.5,
    });
    const aiResponse = result.choices[0].message.content;
    // error handle aiResponse
    if (!aiResponse) {
      const error: ServerError = {
        log: 'AI Response completion does not exist',
        status: 500,
        message: { err: 'An error occured while quering openai' },
      };
      return next(error);
    }
    res.locals.quoteRecommendation = aiResponse;
    return next();
  } catch (err) {
    const error: ServerError = {
      log: `An error has occurred in the the ai prompt ${err}`,
      status: 500,
      message: {
        err: 'An error occurred talking to ai trying to embed the data',
      },
    };
    return next(error);
  }
};
