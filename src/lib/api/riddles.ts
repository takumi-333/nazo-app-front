import { apiFetch } from "./apiClient";

export interface Riddle {
  riddle_id: string;
  image_url: string;
  has_hint: boolean;
  hint?: string;
}

export async function fetchRandomRiddle(signal?: AbortSignal): Promise<Riddle> {
  return apiFetch<Riddle> ("/riddles/random", {
    method: "GET",
    signal,
  });
}

export async function checkAnswer(riddleId: string, answer_text: string): Promise<{ correct: boolean, explanation: string }> {
  return apiFetch<{correct: boolean, explanation: string}>(`/riddles/${riddleId}/check`, {
    method: "POST",
    body: {
      answer_text,
    }
  });
}

