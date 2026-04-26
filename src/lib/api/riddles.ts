export async function checkAnswer(riddleId: string, answer: string): Promise<{ correct: boolean }> {
  const res = await fetch(`/riddles/${riddleId}/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer: answer }),
  });
  if (!res.ok) throw new Error("API error");
  return res.json();
}
