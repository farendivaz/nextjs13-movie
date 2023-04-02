import Image from "next/image";
import Link from "next/link";

export default function CastCard({ cast }: { cast: any }) {
  return (
    <Link href={`/person/${cast.id}`} key={cast.id}>
      <Image
        src={
          cast?.profile_path
            ? `${process.env.IMAGE_URL}${cast?.profile_path}`
            : `${process.env.EMPTY_IMAGE_URL}`
        }
        alt={cast.title}
        width={50}
        height={50}
        className="rounded-full"
      />
    </Link>
  );
}
