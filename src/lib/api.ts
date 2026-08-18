import type {
  Character,
  CharactersResponse,
} from "@/types/character";
const API_URL = "https://rickandmortyapi.com/api";

interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
}

export async function getCharacters({
  page = 1,
  name,
  status,
  species,
}: GetCharactersParams): Promise<CharactersResponse> {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (name) params.set("name", name);
  if (status) params.set("status", status);
  if (species) params.set("species", species);

  const response = await fetch(
    `${API_URL}/character?${params.toString()}`
  );

  if (response.status === 404) {
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    };
  }

  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }

  return response.json();
}
export async function getCharacter(
  id: string
): Promise<Character> {
  const response = await fetch(`${API_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch character");
  }

  return response.json();
}