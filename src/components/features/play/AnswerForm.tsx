"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Props = {
  riddleId?: string;
  onCorrect: () => void;
  onWrong: () => void;
  disabled?: boolean;
};

export function AnswerForm({ riddleId, onCorrect, onWrong, disabled = false }: Props) {
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDisabled = disabled || submitting;
  const trimmedAnswer = answer.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isDisabled || !riddleId) return;

    if (!trimmedAnswer) {
      setError("回答を入力してください");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/riddles/${riddleId}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer_text: trimmedAnswer }),
      });

      if (!res.ok) {
        setError("エラーが発生しました");
        return;
      }

      const data: { correct: boolean } = await res.json();

      if (data.correct) {
        onCorrect();
      } else {
        setAnswer("");
        onWrong();
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex items-end gap-2">
        <Input
          label="回答"
          type="text"
          value={answer}
          onChange={(trimmedValue) => {
            setAnswer(trimmedValue);
          }}
          placeholder={disabled ? "問題を読み込み中…" : "答えを入力…"}
          disabled={isDisabled}
          autoComplete="off"
          error={error ?? undefined}
        />

        <Button
          type="submit"
          variant="secondary"
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
