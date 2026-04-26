import { ReactNode } from "react";

type TopMainSectionProps = {
  title: string;
  children: ReactNode;
};

export function TopMainSection({ title, children }: TopMainSectionProps) {
  return (
    <main className="min-h-screen bg-canvas px-4">
      <section className="grid min-h-screen w-full grid-rows-[auto_1fr]">
        {/* タイトルパート */}
        <div className="pt-8 text-center">
          <h1 className="whitespace-nowrap text-[clamp(1rem,5.5vw,3rem)] font-bold text-primary">
            {title}
          </h1>
        </div>

        {/* アクションボタンパート */}
        <div className="flex items-center justify-center pb-24">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">{children}</div>
        </div>
      </section>
    </main>
  );
}
