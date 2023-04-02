import { getMovieResults } from "@/lib/movies";
import MovieCard from "../components/MovieCard";

type Props = {
  params: {
    searchTerm: string;
  };
};

async function getSearchResults(searchTerm: string): Promise<JSX.Element> {
  try {
    const movies: Movie[] = await getMovieResults(searchTerm);

    if (!movies.length) {
      return <h2 className="p-2 text-xl">{`${searchTerm} Not Found`}</h2>;
    }

    return (
      <main className="flex flex-wrap justify-center items-center mx-auto py-1 min-h-screen">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </main>
    );
  } catch (error) {
    console.error(error);
    return <h2 className="p-2 text-xl">{`${searchTerm} Not Found`}</h2>;
  }
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
  return getSearchResults(searchTerm);
}
