import { fetchRandomRiddle } from "@/lib/api/riddles";
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
    const controller = new AbortController();

    async function loadRiddle() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchRandomRiddle(controller.signal);

        // for debug
        // const data = {
        //   riddle_id: "1",
        //   image_url: "http://abc.png",
        //   has_hint: false,
        // }
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
  }, []);

  return { riddle, loading, error };
}
