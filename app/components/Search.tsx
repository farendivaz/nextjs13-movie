"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/${search}/`);
    setSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-28 md:w-52 flex justify-evenly md:justify-between"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-gray bg-black w-28 md:w-52 p-1 md:p-2 text-lg rounded-l-sm border border-gray-50 outline-none "
        placeholder="Search"
      />
      <button className="text-md mr-8 p-1 rounded-r-sm bg-black border border-gray-50  font-bold md:p-2">
        🔎
      </button>
    </form>
  );
}
