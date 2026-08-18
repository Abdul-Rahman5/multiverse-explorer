"use client";

import { useParams, useRouter } from "next/navigation";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";

import type { Character, Episode } from "@/types/character";

async function getCharacter(id: string): Promise<Character> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );

  if (!response.ok) {
    throw new Error("Character not found");
  }

  return response.json();
}

async function getEpisodes(ids: string[]): Promise<Episode[]> {
  if (ids.length === 0) return [];

  const response = await fetch(
    `https://rickandmortyapi.com/api/episode/${ids.join(",")}`
  );

  if (!response.ok) {
    throw new Error("Episodes not found");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [data];
}

export default function CharacterDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: character,
    isLoading: characterLoading,
    isError: characterError,
  } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id),
    enabled: !!id,
  });

  const episodeIds =
    character?.episode
      .map((url) => url.split("/").pop())
      .filter(Boolean) ?? [];

  const { data: episodes = [], isLoading: episodesLoading } = useQuery({
    queryKey: ["episodes", episodeIds],
    queryFn: () => getEpisodes(episodeIds as string[]),
    enabled: episodeIds.length > 0,
  });

  if (characterLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-10 w-32 rounded bg-slate-200" />

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="aspect-square rounded-3xl bg-slate-200" />

            <div className="space-y-5">
              <div className="h-10 w-3/4 rounded bg-slate-200" />
              <div className="h-6 w-1/2 rounded bg-slate-200" />
              <div className="h-6 w-2/3 rounded bg-slate-200" />
              <div className="h-6 w-1/2 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (characterError || !character) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Character not found
          </h1>

          <button
            onClick={() => router.push("/")}
            className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Back to Characters
          </button>
        </div>
      </main>
    );
  }

  const statusClass = classNames(
    "inline-flex items-center rounded-full px-4 py-2 text-sm font-bold",
    {
      "bg-green-100 text-green-700": character.status === "Alive",
      "bg-red-100 text-red-700": character.status === "Dead",
      "bg-slate-200 text-slate-700": character.status === "unknown",
    }
  );

  const dotClass = classNames("mr-2 h-2.5 w-2.5 rounded-full", {
    "bg-green-500": character.status === "Alive",
    "bg-red-500": character.status === "Dead",
    "bg-slate-500": character.status === "unknown",
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
        >
          ← Back
        </button>

        {/* Character */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="grid md:grid-cols-2">

            {/* Image */}
            <div className="relative">
              <img
                src={character.image}
                alt={character.name}
                className="h-full min-h-[400px] w-full object-cover md:min-h-[520px]"
              />
            </div>

            {/* Information */}
            <div className="flex flex-col justify-center p-6 md:p-10">
              <span className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
                Character Details
              </span>

              <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                {character.name}
              </h1>

              <div className="mt-6">
                <span className={statusClass}>
                  <span className={dotClass} />
                  {character.status}
                </span>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <InfoItem
                  label="Species"
                  value={character.species}
                />

                <InfoItem
                  label="Gender"
                  value={character.gender}
                />

                <InfoItem
                  label="Origin"
                  value={character.origin.name}
                />

                <InfoItem
                  label="Last Known Location"
                  value={character.location.name}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Episodes */}
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Episodes
            </h2>

            <p className="mt-1 text-slate-500">
              Episodes featuring {character.name}
            </p>
          </div>

          {episodesLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-2xl bg-slate-200"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {episodes.map((episode) => (
                <article
                  key={episode.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-slate-900">
                      {episode.name}
                    </h3>

                    <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                      {episode.episode}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-slate-500">
                    {episode.air_date}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}