import CastCard from "@/app/components/CastCard";
import MovieCard from "@/app/components/MovieCard";
import { getMovieCasts, getMovieDetails, getMovieRecom } from "@/lib/movies";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { movieId: number };
}) {
  const { movieId } = params;
  const movieDetail = await getMovieDetails(movieId); // deduplicated

  const movie = movieDetail.id.toString() === movieId.toString();

  if (!movie) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: movieDetail.title,
  };
}

export default async function Movie({
  params,
}: {
  params: { movieId: number };
}) {
  const { movieId } = params;
  const {
    id,
    title,
    vote_average,
    release_date,
    genres,
    poster_path,
    overview,
    imdb_id,
    homepage,
  } = await getMovieDetails(movieId);
  const casts = await getMovieCasts(movieId);
  const recommendations = await getMovieRecom(movieId);

  if (!id) {
    return notFound();
  }

  const words = overview.split(" ");
  const text = words.slice(0, 40).join(" ");

  return (
    <div>
      <div
        key={id}
        className="w-11/12 md:w-4/5 gap-10 flex flex-col md:flex-row justify-evenly items-center mx-auto my-4 md:my-8"
      >
        <div className="w-full mb-2 md:mb-0 md:w-2/5">
          <Image
            src={
              poster_path
                ? `${process.env.IMAGE_URL}${poster_path}`
                : `${process.env.EMPTY_IMAGE_URL}${poster_path}`
            }
            alt={title}
            width={350}
            height={450}
            className="rounded-md mx-auto md:ml-8"
          />
        </div>
        <div className="h-[520px] mt-4 md:mt-0 w-11/12 md:w-1/2 flex flex-col justify-evenly ">
          <h3 className="text-2xl md:text-4xl font-bold">{title}</h3>
          <span className="text-white font-bold mb-4">
            ⭐ {vote_average} | {release_date}
          </span>
          <h3 className="font-bold text-md">THE GENRES</h3>
          <div className="flex gap-4 items-center mb-4">
            {genres.map((genre: any) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <h3 className="font-bold text-md">THE SYNOPSIS</h3>
          <p className="mb-8 text-justify">{text}</p>
          <h3 className="font-bold">TOP CAST</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {casts.slice(0, 10).map((cast: Cast) => (
              <CastCard cast={cast} key={cast.id} />
            ))}
          </div>
          <div className="flex gap-4">
            <Link
              href={`https://www.imdb.com/title/${imdb_id}`}
              target="_blank"
              className="flex gap-1 border bg-black text-white font-bold p-2"
            >
              IMDB{" "}
              <Image
                src="/images/imdb-icon.svg"
                height={13}
                width={13}
                alt="IMDB ICON"
              />
            </Link>
            <Link
              href={homepage}
              target="_blank"
              className="flex gap-1 border bg-black text-white font-bold p-2"
            >
              WEBSITE 🔗
            </Link>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-bold text-center md:text-left mt-24 w-8/12 mx-auto">
        TOP RECOMMENDATIONS
      </h1>
      <div className="flex flex-wrap justify-center items-center">
        {recommendations.slice(0, 4).map((rec: Movie) => (
          <MovieCard movie={rec} key={rec.id} />
        ))}
      </div>
    </div>
  );
}
