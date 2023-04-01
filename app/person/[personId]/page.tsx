import { getPersonMovies } from "@/lib/movies";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Person({
  params,
}: {
  params: { personId: number };
}) {
  const { personId } = params;
  const movies = await getPersonMovies(personId);
  // if (!id) {
  //   return notFound();
  // }
  // console.log(movies);
  return (
    <div className="flex flex-wrap justify-center items-center">
      {movies.map((movie: Movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id} className="underline">
          <div>
            <h1 className="text-xl font-bold">{movie.title}</h1>
            <Image
              src={
                movie?.poster_path
                  ? `${process.env.IMAGE_URL}${movie?.poster_path}`
                  : `${process.env.EMPTY_IMAGE_URL}`
              }
              alt={movie.title}
              width={250}
              height={350}
              loading="lazy"
              blurDataURL="blur"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
