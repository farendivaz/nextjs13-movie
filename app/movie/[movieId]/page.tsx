import { getMovieCasts, getMovieDetails, getMovieRecom } from "@/lib/movies";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Movie({
  params,
}: {
  params: { movieId: number };
}) {
  const { movieId } = params;
  const { id, title, date, poster_path, overview } = await getMovieDetails(
    movieId
  );
  const casts = await getMovieCasts(movieId);
  const recommendations = await getMovieRecom(movieId);

  if (!id) {
    return notFound();
  }

  return (
    <>
      <div key={id}>
        <h1 className="text-5xl font-bold">{title}</h1>
        <Image
          src={
            poster_path
              ? `${process.env.IMAGE_URL}${poster_path}`
              : `${process.env.EMPTY_IMAGE_URL}${poster_path}`
          }
          alt={title}
          width={250}
          height={350}
        />
      </div>
      <h1 className="text-5xl font-bold">THE CASTS</h1>
      <div className="flex flex-wrap justify-center items-center">
        {casts.slice(0, 5).map((cast: Cast) => (
          <div key={cast.id}>
            <h2>
              {cast.original_name} as {cast.character}
            </h2>
            <Image
              src={
                cast?.profile_path
                  ? `${process.env.IMAGE_URL}${cast?.profile_path}`
                  : `${process.env.EMPTY_IMAGE_URL}`
              }
              alt={title}
              width={250}
              height={350}
            />
          </div>
        ))}
      </div>
      <h1 className="text-5xl font-bold">MOVIE RECOMMENDATIONS</h1>

      <div className="flex flex-wrap justify-center items-center">
        {recommendations.slice(0, 5).map((rec: Movie) => (
          <div key={rec.id}>
            <h1 className="text-xl font-bold">{rec.title}</h1>
            <Image
              src={
                rec?.poster_path
                  ? `${process.env.IMAGE_URL}${rec?.poster_path}`
                  : `${process.env.EMPTY_IMAGE_URL}${rec?.poster_path}`
              }
              alt={title}
              width={250}
              height={350}
            />
          </div>
        ))}
      </div>
    </>
  );
}
