import Link from "next/link";

import StatusBadge from "@/components/StatusBadge/StatusBadge";
import type { Character } from "@/types/character";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({
  character,
}: CharacterCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/character/${character.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h2 className="truncate text-xl font-bold text-slate-900">
              {character.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {character.species}
            </p>
          </div>

          <StatusBadge status={character.status} />

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Last known location
            </p>

            <p className="mt-1 truncate text-sm font-medium text-slate-700">
              {character.location.name}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}