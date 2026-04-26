import type { Metadata } from "next";
import Link from "next/link";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "ちょこ謎 | スキマ時間に、ちょこっと謎解き。",
  description: "短時間で遊べるユーザー投稿型謎解きプラットフォーム",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  // ログイン状態のモック（本来はAuthライブラリから取得）
  const isLoggedIn = false;

  return (
    <div className={` min-h-screen bg-white text-notion-black flex flex-col`}>
      {/* ヘッダー */}
      <header className="h-[60px] px-4 md:px-8 flex items-center justify-between border-b border-notion-border sticky top-0 bg-white/80 backdrop-blur-md z-50"></header>

      <main className="flex-grow">{children}</main>

      {/* フッター */}
      <footer className="bg-notion-warm border-t border-notion-border py-12 px-4"></footer>
    </div>
  );
}
