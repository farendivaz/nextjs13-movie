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
      return (
        <div className="flex justify-center items-center h-80">
          <h2 className="p-2 text-xl text-center font-bold">{`No results found for "${searchTerm}"`}</h2>
        </div>
      );
    }

    return (
      <main className="flex flex-wrap justify-center items-center mt-2 md:mx-12  py-1 min-h-screen">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </main>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="p-2 text-xl text-center">{`No results found for "${searchTerm}"`}</h2>
      </div>
    );
  }
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
  return getSearchResults(searchTerm);
}
