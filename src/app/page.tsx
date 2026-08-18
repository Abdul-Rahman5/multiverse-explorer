"use client";

import { useState } from "react";

import CharacterGrid from "@/components/CharacterGrid/CharacterGrid";
import CharacterSkeleton from "@/components/CharacterSkeleton/CharacterSkeleton";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useCharacters } from "@/hooks/useCharacters";

export default function Home() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");

  const { data, isLoading, isError } = useCharacters({
    page,
    name,
    status,
    species,
  });

  const handleNameChange = (value: string) => {
    setName(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleSpeciesChange = (value: string) => {
    setSpecies(value);
    setPage(1);
  };

  const clearFilters = () => {
    setName("");
    setStatus("");
    setSpecies("");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              Rick & Morty Universe
            </p>

            <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Multiverse Explorer
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">
              Explore characters, discover their stories, and browse
              the episodes they appeared in.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        {/* Filters */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Find a character
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search and filter the multiverse.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 text-black">
            <SearchBar
              value={name}
              onChange={handleNameChange}
            />

            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-black outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            >
              <option value="">All Statuses</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>

            <input
              type="text"
              value={species}
              onChange={(e) =>
                handleSpeciesChange(e.target.value)
              }
              placeholder="Filter by species..."
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-black outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          {(name || status || species) && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold text-slate-600 underline underline-offset-4 hover:text-slate-900"
            >
              Clear filters
            </button>
          )}
        </section>

        {/* Loading */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <CharacterSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
            <h2 className="text-xl font-bold text-red-700">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-red-600">
              We couldn't load the characters. Please try again.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading &&
          !isError &&
          data?.results.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                No characters found
              </h2>

              <p className="mt-2 text-slate-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
              >
                Clear filters
              </button>
            </div>
          )}

        {/* Results */}
        {!isLoading &&
          !isError &&
          data &&
          data.results.length > 0 && (
            <>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Showing{" "}
                  <span className="font-bold text-slate-900">
                    {data.results.length}
                  </span>{" "}
                  characters
                </p>

                <p className="text-sm text-slate-400">
                  Page {page} of {data.info.pages}
                </p>
              </div>

              <CharacterGrid characters={data.results} />

              <Pagination
                currentPage={page}
                totalPages={data.info.pages}
                onPageChange={setPage}
              />
            </>
          )}
      </div>
    </main>
  );
}