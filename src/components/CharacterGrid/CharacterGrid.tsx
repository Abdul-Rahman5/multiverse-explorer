import type { Character } from "@/types/character";
import CharacterCard from "@/components/CharacterCard/CharacterCard";

interface CharacterGridProps {
  characters: Character[];
}

export default function CharacterGrid({
  characters,
}: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
        />
      ))}
    </div>
  );
}