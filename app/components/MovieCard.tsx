import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <Link href={`/movie/${movie.id}`} className="underline ">
      <div key={movie.id}>
        <h1>{movie.title}</h1>
        <Image
          src={
            movie?.poster_path
              ? `${process.env.IMAGE_URL}${movie?.poster_path}`
              : `${process.env.EMPTY_IMAGE_URL}${movie?.poster_path}`
          }
          alt={movie.title}
          width={250}
          height={350}
        />
      </div>
    </Link>
  );
}
