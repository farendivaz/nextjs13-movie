import { getMovieResults } from "@/lib/movies";
import MovieCard from "../components/MovieCard";
import { notFound } from "next/navigation";

type Props = {
  params: {
    searchTerm: string;
  };
};

async function getSearchResults(searchTerm: string): Promise<JSX.Element> {
  try {
    const movies: Movie[] = await getMovieResults(searchTerm);

    if (!movies.length) {
      return notFound();
    }

    return (
      <main className="flex flex-wrap justify-evenly items-center mx-auto py-1 min-h-screen">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </main>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
  return getSearchResults(searchTerm);
}
