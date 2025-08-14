declare namespace Express {
  export interface Locals {
    userQuery?: string;
    userZodiac?: string;
    embedding?: number[];
    pineconeQueryResult?: import('@pinecone-database/pinecone').ScoredPineconeRecord<
      import('./types').QuoteMetadata
    >[];
    quoteRecommendation?: string;
  }
}
