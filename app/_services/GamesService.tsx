import { Game } from "../_models/game";
import request from "../_utils/request";

export async function searchGames(q: string): Promise<Game[]> {
  try {
    return await request<Game[]>(`http://127.0.0.1:8000/games/search/?q=${q}`);
  } catch (error) {
    return [];
  }
}

export async function getGame(id: number): Promise<Game | undefined> {
  try {
    return await request<Game>(`http://127.0.0.1:8000/games/${id}/`);
  } catch (error) {
    return undefined;
  }
}
