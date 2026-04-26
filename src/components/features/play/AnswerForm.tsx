"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAnswer } from "@/hooks/useAnswer";

type Props = {
  riddleId?: string;
  onCorrect: () => void;
  onWrong: () => void;
  onGiveup: () => void;
  disabled?: boolean;
};

export function AnswerForm({ riddleId, onCorrect, onWrong, disabled = false }: Props) {
  const [answer, setAnswer] = useState("");
  const { submit, submitting, error } = useAnswer(riddleId, { onCorrect, onWrong });
  const isDisabled = disabled || submitting;
  const trimmedAnswer = answer.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isDisabled || !riddleId) return;
    if (!trimmedAnswer) return;
    await submit(trimmedAnswer);
    setAnswer("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex items-end gap-2">
        <Input
          label="回答"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={disabled ? "問題を読み込み中..." : "答えを入力..."}
          disabled={isDisabled}
          autoComplete="off"
          error={error ?? undefined}
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={submitting}
          disabled={isDisabled || !trimmedAnswer}
          className="shrink-0"
        >
          回答
        </Button>
      </div>
    </form>
  );
}
