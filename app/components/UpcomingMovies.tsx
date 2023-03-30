import Image from "next/image";
import MovieCard from "./MovieCard";

export default function upcomingMovies({
  upcomingMovies,
}: {
  upcomingMovies: any;
}) {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {upcomingMovies.slice(0, 5).map((movie: Movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
}
