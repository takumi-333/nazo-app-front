import { checkAnswer } from "@/lib/api/riddles";
import { useState } from "react";

export function useAnswer(
  riddleId: string | undefined,
  { onCorrect, onWrong }: { onCorrect: () => void; onWrong: () => void }
) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(answer: string) {
    if (!riddleId) return;
    setSubmitting(true);
    setError(null);
    try {
      const data = await checkAnswer(riddleId, answer);
    data.correct ? onCorrect() : onWrong();
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setSubmitting(false);
    }
  }

  return { submit, submitting, error };
}