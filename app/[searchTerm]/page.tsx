import { getMovieResults } from "@/lib/movies";
import MovieCard from "../components/MovieCard";

type Props = {
  params: {
    searchTerm: string;
  };
};

export default async function SearchResults({ params: { searchTerm } }: Props) {
  try {
    const moviesData: Promise<Movie[]> = getMovieResults(searchTerm);
    const data = await moviesData;

    if (!data || data.length === 0) {
      return <h2 className="p-2 text-xl">{`${searchTerm} Not Found`}</h2>;
    }

    const content = (
      <main className="flex flex-wrap justify-center items-center mx-auto py-1 min-h-screen">
        {data.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </main>
    );

    return content;
  } catch (error) {
    console.error(error);
    return <h2 className="p-2 text-xl">{`${searchTerm} Not Found`}</h2>;
  }
}
