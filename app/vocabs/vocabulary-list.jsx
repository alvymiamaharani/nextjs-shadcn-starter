"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function VocabularyList({ onUpdate }) {
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVocabularies();
  }, [onUpdate]);

  const fetchVocabularies = async () => {
    try {
      const { data, error } = await supabase
        .from("vocabularies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVocabularies(data || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch vocabularies");
    } finally {
      setLoading(false);
    }
  };

  const deleteVocabulary = async (id) => {
    try {
      const { error } = await supabase
        .from("vocabularies")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Vocabulary deleted successfully");
      fetchVocabularies();
    } catch (error) {
      toast.error(error.message || "Failed to delete vocabulary");
    }
  };

  if (loading) {
    return <div>Loading vocabulary...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Your Vocabulary ({vocabularies.length})
      </h3>
      <div className="space-y-2">
        {vocabularies.map((vocab) => (
          <Card key={vocab.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="font-medium">{vocab.word}</p>
                <p className="text-sm text-muted-foreground">
                  {vocab.translation}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteVocabulary(vocab.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
