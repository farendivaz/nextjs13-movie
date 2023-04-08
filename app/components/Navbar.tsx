import Link from "next/link";
import Search from "./Search";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-slate-800 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-600">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl md:text-2xl text-white font-semibold"
          >
            <Image
              src="images/moviedb.svg"
              width={100}
              height={100}
              priority
              alt="The MovieDB Icon"
            />
          </Link>
          <Search />
        </div>
      </div>
    </nav>
  );
}
