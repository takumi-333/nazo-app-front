import { apiFetch } from "./apiClient";

export interface Riddle {
  riddle_id: string;
  image_url: string;
  has_hint: boolean;
  hint?: string;
}

export async function fetchRandomRiddle(signal?: AbortSignal): Promise<Riddle> {
  return apiFetch<Riddle>("/riddles/random", {
    method: "GET",
    signal,
  });
}

export async function checkAnswer(
  riddleId: string,
  answer_text?: string,
  give_up?: boolean,
): Promise<{ correct: boolean; explanation: string }> {
  return apiFetch<{ correct: boolean; explanation: string }>(`/riddles/${riddleId}/check`, {
    method: "POST",
    body: {
      answer_text,
      give_up,
    },
  });
}

export async function submitResult(
  riddleId: string,
  score: number,
  is_correct: boolean,
  duration_ms: number,
  used_hint: boolean,
  attempt_count: number,
): Promise<void> {
  return apiFetch<void>(`/riddles/${riddleId}/submit`, {
    method: "POST",
    body: {
      score,
      is_correct,
      duration_ms,
      used_hint,
      attempt_count,
    },
  });
}
