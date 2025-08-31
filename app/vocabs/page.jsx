"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { VocabularyTabs } from "./tabs";

export default function Home() {
  return (
    <>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Vocabulary Learning App</h1>
          <p className="text-muted-foreground">
            Learn Multi Language vocabulary with flashcards
          </p>
        </div>

        <VocabularyTabs />
      </div>
    </>
  );
}
