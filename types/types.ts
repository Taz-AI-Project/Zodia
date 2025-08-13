export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

//TO DO: change type name and key value pairs
export type MovieMetadata = {
  id: string;
  year: number;
  title: string;
  origin: string;
  director: string;
  cast: string;
  genre: string;
  wiki: string;
  plot: string;
};
