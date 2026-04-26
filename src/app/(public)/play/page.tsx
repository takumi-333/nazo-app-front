"use client";

import { useRouter } from "next/navigation";
import { useRiddle } from "@/hooks/useRiddle";
import { RiddleImage } from "@/components/features/play/RiddleImage";
import { AnswerForm } from "@/components/features/play/AnswerForm";
import { useToast } from "@/components/ui/Toast";
import { useEffect, useRef } from "react";

export default function PlayPage() {
  const router = useRouter();
  const toast = useToast();
  const { riddle, loading, error } = useRiddle();
  const handledErrorRef = useRef(false);

  useEffect(() => {
    if (!error) return;
    if (handledErrorRef.current) return;

    handledErrorRef.current = true;

    toast.error(error);
    router.replace("/");
  }, [error, router, toast]);

  function handleCorrect() {
    router.push(`/play/${riddle!.riddle_id}/result?correct=true`);
  }

  function handleWrong() {
    // TODO: 不正解トースト表示
  }

  function handleGiveup() {
    router.push(`/play/${riddle!.riddle_id}/result?correct=false`);
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">
      <RiddleImage imageUrl={riddle?.image_url} loading={loading} />
      <AnswerForm
        riddleId={riddle?.riddle_id}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
        disabled={loading}
      />
    </main>
  );
}
