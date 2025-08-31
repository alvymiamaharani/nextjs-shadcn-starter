"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export function VocabularyForm({ onSuccess }) {
  const [indonesian, setIndonesian] = useState("");
  const [english, setEnglish] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!indonesian.trim() || !english.trim()) {
      toast.error("Both fields are required");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("vocabularies").insert([
        {
          word: indonesian.trim(),
          translation: english.trim(),
        },
      ]);

      if (error) throw error;

      toast.success("Vocabulary added successfully");

      setIndonesian("");
      setEnglish("");
      onSuccess?.();
    } catch (error) {
      toast.error(error.message || "Failed to add vocabulary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Vocabulary</CardTitle>
        <CardDescription>Add new vocabulary pairs</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="indonesian">Word</Label>
            <Input
              id="indonesian"
              value={indonesian}
              onChange={(e) => setIndonesian(e.target.value)}
              placeholder="e.g., Selamat Pagi"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="english">Translation</Label>
            <Input
              id="english"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              placeholder="e.g., Good Morning"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Vocabulary
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
