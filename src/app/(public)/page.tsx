"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "../constants/routes";
import { Button } from "../components/ui/Button";

export default function HomePage() {
  const router = useRouter();

  // ログイン状態のモック
  const isLoggedIn = false;

  const handleCreateNazo = () => {
    // 表示ロジック：未ログインならサインインへリダイレクト
    if (!isLoggedIn) {
      router.push(ROUTES.auth.signIn);
    } else {
      router.push(ROUTES.creator.dashboard);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="mb-12 text-center font-bold whitespace-nowrap text-[clamp(1.5rem,5vw,3rem)]">
        スキマ時間に、ちょこっと謎解き。
      </h1>

      <div className="flex gap-6 flex-wrap justify-center">
        <Button className="w-36 h-36 sm:w-44 sm:h-44 text-lg rounded-lg">
          <Link href={ROUTES.play.root}>謎を解く</Link>
        </Button>

        <Button onClick={handleCreateNazo} className="w-36 h-36 sm:w-44 sm:h-44 text-lg rounded-lg">
          謎を作る
        </Button>
      </div>
    </main>
  );
}
