"use client";

import { StarRating } from "@/components/ui/StarRating";

type Props = {
  riddleId?: string;
  correct: boolean;
  explanation: string | null;
  onRated: () => void;
};

export function ResultView({ riddleId, correct, explanation, onRated }: Props) {
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
    </div>
  );
}
