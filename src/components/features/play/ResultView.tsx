"use client";

import { StarRating, StarValue } from "@/components/ui/StarRating";
import { AnswerStats } from "@/hooks/useAnswer";
import { submitResult } from "@/lib/api/riddles";
import { useState } from "react";

type Props = {
  riddleId?: string;
  correct: boolean;
  explanation: string | null;
  onRated: () => void;
  stats: AnswerStats;
};

export function ResultView({ riddleId, correct, explanation, onRated, stats }: Props) {

  const [rating, setRating] = useState<StarValue | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = async (value: StarValue) => {
    setRating(value);
    setSubmitting(true);
    try {
      await submitResult(
        riddleId!,
        value, 
        stats.is_correct,
        stats.duration_ms,
        stats.used_hint,
        stats.attempt_count,
      );

      // 評価後の処理
      onRated();

    } catch (error) {
      console.error("評価送信エラー:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col gap-6">
      {/* 正誤バナー */}
      <div
        className={`rounded-xl px-5 py-4 text-center font-medium text-lg ${
          correct ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}
      >
        {correct ? "🎉 正解！" : "😢 不正解…"}
      </div>

      {/* 解説 */}
      {explanation && (
        <section className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground font-medium">解説</p>
          <p className="text-base leading-relaxed">{explanation}</p>
        </section>
      )}

      {/* 評価フォーム（送信で次へ） */}
      {/* <RatingForm riddleId={riddle.riddle_id} onSubmitted={onRated} /> */}
      <StarRating
        value={rating}
        onSelect={handleSelect}
        label="この謎はどうでしたか？"
        disabled={submitting}
        locked={false}
        size="md"
      />
    </div>
  );
}
