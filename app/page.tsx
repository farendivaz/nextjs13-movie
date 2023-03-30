import { getMovies } from "@/lib/movies";
import PopularMovies from "./components/PopularMovies";
import UpcomingMovies from "./components/UpcomingMovies";
import TopRatedMovies from "./components/TopRatedMovies";
import { notFound } from "next/navigation";

export default async function Home() {
  const popularMovies = await getMovies("popular");
  const topRatedMovies = await getMovies("top_rated");
  const upcomingMovies = await getMovies("upcoming");

  if (!popularMovies) {
    return notFound();
  }

  return (
    <main>
      <PopularMovies popularMovies={popularMovies} />
      <TopRatedMovies topRatedMovies={topRatedMovies} />
      <UpcomingMovies upcomingMovies={upcomingMovies} />
    </main>
  );
}
