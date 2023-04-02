type Movie = {
  id: number;
  title: string;
  date: string;
  poster_path: string;
  overview: string;
};

type Cast = {
  id: number;
  original_name: string;
  character: string;
  profile_path: string;
};

type SearchResult = {
  query?: {
    pages?: Result[];
  };
};
