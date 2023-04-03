import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      key={movie.id}
      className="w-[160px] h-[310px] md:w-[280px] md:h-[475px] flex flex-col justify-center items-center m-4 border-2 border-gray-400 rounded-xl max-w-xs transition duration-300 ease-in-out hover:scale-105"
    >
      <Image
        src={
          movie?.poster_path
            ? `${process.env.IMAGE_URL}${movie?.poster_path}`
            : `${process.env.EMPTY_IMAGE_URL}`
        }
        alt={movie.title}
        width={280}
        height={350}
        className="rounded-t-xl"
        loading="lazy"
      />
      <p className="text-white text-center text-sm md:text-md font-bold my-4">
        {movie.title}
      </p>
    </Link>
  );
}
