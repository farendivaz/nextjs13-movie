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
      className="w-50 flex justify-center md:justify-between"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-gray bg-black p-2 w-50 text-lg rounded-l-sm border border-gray-50 outline-none "
        placeholder="Search"
      />
      <button className="p-2 text-lg rounded-r-sm bg-black border border-gray-50  font-bold">
        🔎
      </button>
    </form>
  );
}
