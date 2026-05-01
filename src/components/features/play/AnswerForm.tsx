"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAnswer } from "@/hooks/useAnswer";

type Props = {
  riddleId?: string;
  submit: (answer: string) => void;
  giveup: () => void;
  submitting: boolean;
  disabled?: boolean;
};

export function AnswerForm({ riddleId, submit, giveup, submitting, disabled = false }: Props) {
  const [answer, setAnswer] = useState("");
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
    <>
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
      <Button
        type="button"
        onClick={giveup}
        variant="secondary"
        size="md"
        isLoading={submitting}
        disabled={isDisabled}
        className="shrink-0"
      >
        諦める
      </Button>
    </>
  );
}
