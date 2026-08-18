import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "@/lib/api";
import type { Character } from "@/types/character";

interface UseCharactersParams {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
}

export function useCharacters({
  page = 1,
  name,
  status,
  species,
}: UseCharactersParams = {}) {
  return useQuery({
    queryKey: ["characters", page, name, status, species],
    queryFn: () =>
      getCharacters({
        page,
        name,
        status,
        species,
      }),
    placeholderData: (previousData) => previousData,
  });
}

export function useCharacter(id: string) {
  return useQuery<Character>({
    queryKey: ["character", id],
    queryFn: async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch character");
      }

      return response.json();
    },
  });
}