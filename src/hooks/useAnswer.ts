import { checkAnswer } from "@/lib/api/riddles";
import { useCallback, useState } from "react";

export function useAnswer(
  riddleId: string | undefined,
  {
    onCorrect,
    onWrong,
    onGiveup,
  }: {
    onCorrect: () => void;
    onWrong: () => void;
    onGiveup: () => void;
  },
) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  async function submit(answer: string) {
    if (!riddleId) return;
    setSubmitting(true);
    setError(null);
    try {
      const data = await checkAnswer(riddleId, answer);
      data.correct ? onCorrect() : onWrong();
      if (data.correct) {
        setCorrect(true);
        setExplanation(data.explanation);
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setSubmitting(false);
    }
  }

  async function giveup() {
    if (!riddleId) return;
    setSubmitting(true);
    setError(null);
    try {
      const data = await checkAnswer(riddleId, undefined, true);
      onGiveup();
      setCorrect(false);
      setExplanation(data.explanation);
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setSubmitting(false);
    }
  }

  return { submit, giveup, submitting, error, clearError, correct, explanation };
}
