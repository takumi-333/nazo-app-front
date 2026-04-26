"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "../../constants/routes";
import { TopActionButton } from "../../components/features/top/TopActionButton";
import { TopMainSection } from "../../components/features/top/TopMainSection";

export default function HomePage() {
  const router = useRouter();

  const isLoggedIn = false;

  const handleCreateRiddle = () => {
    if (!isLoggedIn) {
      router.push(ROUTES.auth.signIn);
      return;
    }

    router.push(ROUTES.creator.dashboard);
  };

  const handlePlayRiddle = () => {
    router.push(ROUTES.play.root);
  };

  return (
    <TopMainSection title="スキマ時間に、ちょこっと謎解きを">
      <TopActionButton onClick={handleCreateRiddle} variant="create">
        + 謎を作る
      </TopActionButton>

      <TopActionButton onClick={handlePlayRiddle} variant="play">
        ▶ 謎を解く
      </TopActionButton>
    </TopMainSection>
  );
}
