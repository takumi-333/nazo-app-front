import { useState, useEffect } from "react";

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
}

export function useRiddle(): UseRiddleResult {
  const [riddle, setRiddle] = useState<Riddle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRiddle() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/riddles/random");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Riddle = await res.json();

        // for debug
        // const data: Riddle = {
        //   riddle_id: "1",
        //   image_url: "abc",
        //   has_hint: false,
        // }
        if (!cancelled) setRiddle(data);
      } catch (e) {
        if (!cancelled) setError("問題の取得に失敗しました");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRiddle();
    return () => {
      cancelled = true;
    };
  }, []);

  return { riddle, loading, error };
}
