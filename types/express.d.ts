declare namespace Express {
  export interface Locals {
    userQuery?: string;
    embedding?: number[];
    pineconeQueryResult?: import('@pinecone-database/pinecone').ScoredPineconeRecord<
      import('./types').QuoteMetadata
    >[];
    movieRecommendation?: string;
  }
}
