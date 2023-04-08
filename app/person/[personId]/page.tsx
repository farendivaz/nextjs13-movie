import MovieCard from "@/app/components/MovieCard";
import { getPersonMovies, getPersonDetails } from "@/lib/movies";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { personId: number };
}) {
  const { personId } = params;
  const personDetail = await getPersonDetails(personId); // deduplicated

  const person = personDetail.id.toString() === personId.toString();
  if (!person) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: personDetail.name,
  };
}

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
  const text = words.slice(0, 70).join(" ");

  return (
    <div>
      <div
        key={id}
        className="w-full md:w-4/5 flex flex-col md:flex-row justify-evenly items-center mx-auto my-8"
      >
        <div className="w-4/5  mx-auto md:w-2/5">
          <Image
            src={
              profile_path
                ? `${process.env.IMAGE_URL}${profile_path}`
                : `${process.env.EMPTY_IMAGE_URL}${profile_path}`
            }
            alt={name}
            width={350}
            height={450}
            className="rounded-md mx-auto"
          />
        </div>
        <div className="h-[520px] w-4/5 md:w-1/2 flex flex-col justify-center md:justify-evenly ">
          <h3 className="text-3xl md:text-5xl font-bold">{name}</h3>
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
      <h2 className="mt-8 md:mt-16 font-bold text-xl w-4/5 text-center mx-auto md:text-left md:ml-48">
        ALSO APPEARS IN MOVIES
      </h2>
      <div className="w-full md:w-4/5 mx-auto flex flex-wrap justify-center items-center ">
        {movies.map((movie: Movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
