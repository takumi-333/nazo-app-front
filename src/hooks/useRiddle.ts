import { fetchRandomRiddle } from "@/lib/api/riddles";
import { useState, useEffect, useCallback } from "react";

export interface Riddle {
  riddle_id: string;
  image_url: string;
  has_hint: boolean;
  hint?: string;
}

interface UseRiddleResult {
  riddle: Riddle | null;
  loading: boolean;
  error: string | null;
  nextRiddle: () => void;
}

export function useRiddle(): UseRiddleResult {
  const [riddle, setRiddle] = useState<Riddle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRiddle() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchRandomRiddle(controller.signal);

        setRiddle(data);
      } catch (e) {
        if (controller.signal.aborted) {
          return;
        }

        setError("問題の取得に失敗しました");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadRiddle();

    return () => {
      controller.abort();
    };
  }, [fetchCount]);

  const nextRiddle = useCallback(() => {
    setFetchCount((c) => c + 1);
  }, []);

  return { riddle, loading, error, nextRiddle };
}
