"use client";

import { useRouter } from "next/navigation";
import { useRiddle } from "@/hooks/useRiddle";
import { RiddleImage } from "@/components/features/play/RiddleImage";
import { AnswerForm } from "@/components/features/play/AnswerForm";
import { useToast } from "@/components/ui/Toast";
import { useEffect, useRef, useState } from "react";
import { ResultView } from "@/components/features/play/ResultView";
import { useAnswer } from "@/hooks/useAnswer";

type Phase = "playing" | "result";

export default function PlayPage() {
  const router = useRouter();
  const toast = useToast();

  // 謎情報の管理
  const { riddle, loading, error, nextRiddle } = useRiddle();

  // 回答状態の管理
  const {
    submit,
    giveup,
    submitting,
    error: answerError,
    clearError,
    correct,
    explanation,
  } = useAnswer(riddle?.riddle_id, {
    onCorrect: handleCorrect,
    onWrong: handleWrong,
    onGiveup: handleGiveup,
  });

  const [phase, setPhase] = useState<Phase>("playing");
  const handledErrorRef = useRef(false);

  useEffect(() => {
    if (!error) return;
    if (handledErrorRef.current) return;

    handledErrorRef.current = true;

    toast.error(error, 2000);
    router.replace("/");
  }, [error, router, toast]);

  useEffect(() => {
    if (!answerError) return;

    toast.error(answerError, 2000);
    clearError();
  }, [answerError, toast, clearError]);

  function handleCorrect() {
    setPhase("result");
  }

  function handleWrong() {
    toast.warning("不正解！もう一度考えてみましょう", 1500);
  }

  function handleGiveup() {
    setPhase("result");
  }

  function handleRated() {
    nextRiddle();
    setPhase("playing");
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">
      <RiddleImage imageUrl={riddle?.image_url} loading={loading} />
      {phase === "playing" ? (
        <AnswerForm
          riddleId={riddle?.riddle_id}
          submit={submit}
          giveup={giveup}
          submitting={submitting}
          disabled={loading}
        />
      ) : (
        <ResultView
          riddleId={riddle?.riddle_id}
          correct={correct}
          explanation={explanation}
          onRated={handleRated}
        />
      )}
    </main>
  );
}
