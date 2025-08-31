"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyForm } from "./vocabulary-form";
import { VocabularyList } from "./vocabulary-list";
import { FlashCard } from "./flash-card";

export function VocabularyTabs() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Tabs defaultValue="learn" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="add">Add Vocabulary</TabsTrigger>
        <TabsTrigger value="list">List</TabsTrigger>
        <TabsTrigger value="learn">Learn</TabsTrigger>
      </TabsList>

      <TabsContent value="add" className="space-y-4">
        <VocabularyForm onSuccess={handleUpdate} />
      </TabsContent>

      <TabsContent value="list" className="space-y-4">
        <VocabularyList key={refreshKey} />
      </TabsContent>

      <TabsContent value="learn" className="space-y-4">
        <FlashCard key={refreshKey} />
      </TabsContent>
    </Tabs>
  );
}
