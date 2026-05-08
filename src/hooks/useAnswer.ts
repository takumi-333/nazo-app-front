import { checkAnswer } from "@/lib/api/riddles";
import { useCallback, useEffect, useRef, useState } from "react";


export interface AnswerStats {
  is_correct: boolean;
  duration_ms: number;
  attempt_count: number;
  used_hint: boolean;
}

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
  const [usedHint, setUsedHint] = useState(false);
  const [durationMs, setDurationMs] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [explanation, setExplanation] = useState<string | null>(null);

  const startedAt = useRef(Date.now());

  // riddleId が変わったらリセット
  useEffect(() => {
    startedAt.current = Date.now();
    setCorrect(false);
    setExplanation(null);
    setAttemptCount(0);
    setUsedHint(false);
    setDurationMs(0);
    setError(null);
  }, [riddleId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  async function submit(answer: string) {
    if (!riddleId) return;
    setSubmitting(true);
    setError(null);
    try {
      const data = await checkAnswer(riddleId, answer);
      setAttemptCount((c) => c + 1);
      data.correct ? onCorrect() : onWrong();
      if (data.correct) {
        const elapsed = Date.now() - startedAt.current;
        setDurationMs(elapsed);
        setCorrect(true);
        setExplanation(data.explanation);
        onCorrect();
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
      const elapsed = Date.now() - startedAt.current;
      setDurationMs(elapsed);
      setCorrect(false);
      setExplanation(data.explanation);
      onGiveup();
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setSubmitting(false);
    }
  }

  const stats: AnswerStats = {
    is_correct: correct,
    duration_ms: durationMs,
    attempt_count: attemptCount,
    used_hint: usedHint,
  };

  return {
    submit,
    giveup,
    submitting,
    error,
    clearError,
    correct,
    explanation,
    setUsedHint,
    stats,
  };
}
