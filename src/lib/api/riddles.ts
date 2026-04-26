export async function checkAnswer(riddleId: string, answer: string): Promise<{ correct: boolean }> {
  const res = await fetch(`/riddles/${riddleId}/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer: answer }),
  });
  if (!res.ok) throw new Error("API error");
  return res.json();
}

export interface Riddle {
  riddle_id: string;
  image_url: string;
  has_hint: boolean;
  hint?: string;
}

export async function fetchRandomRiddle(signal?: AbortSignal): Promise<Riddle> {
  const res = await fetch("/api/riddles/random", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch random riddle: HTTP ${res.status}`);
  }

  const data = (await res.json()) as Riddle;

  return data;
}
