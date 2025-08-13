import { RequestHandler } from 'express';
import { ServerError, MovieMetadata } from '../../types/types';
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';