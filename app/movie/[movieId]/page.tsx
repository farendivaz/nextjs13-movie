import MovieCard from "@/app/components/MovieCard";
import { getMovieCasts, getMovieDetails, getMovieRecom } from "@/lib/movies";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  return (
    <div>
      <div
        key={id}
        className="w-4/5 flex justify-evenly items-center mx-auto my-8"
      >
        <div className="w-2/5">
          <Image
            src={
              poster_path
                ? `${process.env.IMAGE_URL}${poster_path}`
                : `${process.env.EMPTY_IMAGE_URL}${poster_path}`
            }
            alt={title}
            width={350}
            height={450}
            className="rounded-md"
          />
        </div>
        <div className="h-[520px] w-1/2 flex flex-col justify-evenly ">
          <h3 className="text-5xl font-bold">{title}</h3>
          <span className="text-white font-bold mb-4">
            ⭐ {vote_average} | {release_date}
          </span>
          <h3 className="font-bold">THE GENRES</h3>
          <div className="flex gap-4 items-center mb-4">
            {genres.map((genre: any) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <h3 className="font-bold">THE SYNOPSIS</h3>
          <p className="mb-8 text-justify">{overview}</p>
          <h3 className="font-bold">TOP CAST</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {casts.slice(0, 10).map((cast: Cast) => (
              <Link href={`/person/${cast.id}`} key={cast.id}>
                <Image
                  src={
                    cast?.profile_path
                      ? `${process.env.IMAGE_URL}${cast?.profile_path}`
                      : `${process.env.EMPTY_IMAGE_URL}`
                  }
                  alt={title}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </Link>
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

      <h1 className="text-xl font-bold mt-16 ml-40">TOP RECOMMENDATIONS</h1>
      <div className="flex flex-wrap justify-center items-center">
        {recommendations.slice(0, 4).map((rec: Movie) => (
          <MovieCard movie={rec} key={rec.id} />
        ))}
      </div>
    </div>
  );
}
