import MovieCard from "@/app/components/MovieCard";
import { getPersonMovies, getPersonDetails } from "@/lib/movies";
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
  const { id, name, biography, profile_path, homepage, imdb_id, birthday } =
    await getPersonDetails(personId);

  const words = biography.split(" ");
  const text = words.slice(0, 150).join(" ");

  return (
    <div>
      <div
        key={id}
        className="w-4/5 flex justify-evenly items-center mx-auto my-8"
      >
        <div className="w-2/5">
          <Image
            src={
              profile_path
                ? `${process.env.IMAGE_URL}${profile_path}`
                : `${process.env.EMPTY_IMAGE_URL}${profile_path}`
            }
            alt={name}
            width={350}
            height={450}
            className="rounded-md"
          />
        </div>
        <div className="h-[520px] w-1/2 flex flex-col justify-evenly ">
          <h3 className="text-5xl font-bold">{name}</h3>
          <span className="text-white font-bold mb-4">{birthday}</span>
          <h3 className="font-bold mt-2">THE BIOGRAPHY</h3>
          <p className="mb-8 text-justify">{text}</p>
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
            {homepage && (
              <Link
                href={homepage}
                target="_blank"
                className="flex gap-1 border bg-black text-white font-bold p-2"
              >
                WEBSITE 🔗
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {movies.map((movie: Movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
