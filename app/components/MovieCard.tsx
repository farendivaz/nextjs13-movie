import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      key={movie.id}
      className="w-[148px] h-[295px] md:w-[253px] md:h-[455px] flex flex-col justify-center items-center m-4 bg-slate-800 rounded-xl max-w-xs transition duration-300 ease-in-out hover:scale-105 hover:opacity-80"
    >
      <Image
        src={
          movie?.poster_path
            ? `${process.env.IMAGE_URL}${movie?.poster_path}`
            : `${process.env.EMPTY_IMAGE_URL}`
        }
        alt={movie.title}
        width={250}
        height={320}
        className="rounded-t-xl"
        loading="lazy"
      />
      <p className="text-white text-center text-sm md:text-md font-bold my-2">
        {movie.title}
      </p>
      <span className="text-white font-bold mb-4">⭐ {movie.vote_average}</span>
    </Link>
  );
}
