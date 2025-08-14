export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

//TO DO: change type name and key value pairs
export type QuoteMetadata = {
  id: string;
  content: string;
};
