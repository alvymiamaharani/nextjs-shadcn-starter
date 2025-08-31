"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Eye, EyeOff, Repeat } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export function FlashCard() {
  const [vocabularies, setVocabularies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState("indo-english"); // "indo-english" or "english-indo"
  const [shuffledVocabularies, setShuffledVocabularies] = useState([]);

  useEffect(() => {
    fetchVocabularies();
  }, []);

  const fetchVocabularies = async () => {
    try {
      const { data } = await supabase.from("vocabularies").select("*");

      if (data && data.length > 0) {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setVocabularies(data);
        setShuffledVocabularies(shuffled);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Error fetching vocabularies:", error);
    } finally {
      setLoading(false);
    }
  };

  const shuffle = () => {
    const shuffled = [...vocabularies].sort(() => Math.random() - 0.5);
    setShuffledVocabularies(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % shuffledVocabularies.length);
  };

  const previousCard = () => {
    setShowAnswer(false);
    setCurrentIndex(
      (prev) =>
        (prev - 1 + shuffledVocabularies.length) % shuffledVocabularies.length,
    );
  };

  const randomCard = () => {
    setShowAnswer(false);
    const randomIndex = Math.floor(Math.random() * shuffledVocabularies.length);
    setCurrentIndex(randomIndex);
  };

  const toggleDirection = () => {
    setDirection(
      direction === "indo-english" ? "english-indo" : "indo-english",
    );
    setShowAnswer(false);
  };

  if (loading) return <div>Loading...</div>;
  if (vocabularies.length === 0)
    return <div>No vocabulary found. Add some words first!</div>;

  const current = shuffledVocabularies[currentIndex];
  if (!current) return <div>Loading...</div>;

  const displayWord =
    direction === "indo-english" ? current.word : current.translation;

  const displayAnswer =
    direction === "indo-english" ? current.translation : current.word;

  return (
    <div className="max-w-md mx-auto">
      {/* Direction Toggle */}
      <div className="mb-4 flex items-center justify-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDirection}
          className="ml-2"
        >
          <Repeat className="w-4 h-4" />
        </Button>
      </div>

      <Card className="mb-4">
        <CardContent className="p-8 text-center">
          <div className="mb-4 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Card {currentIndex + 1} of {shuffledVocabularies.length}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {showAnswer ? displayAnswer : displayWord}
            </h2>
            <p className="text-sm text-muted-foreground">
              {showAnswer ? "Answer" : "Guess the translation"}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowAnswer(!showAnswer)}
            className="mb-4"
          >
            {showAnswer ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Hide Answer
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Show Answer
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-2 justify-center">
        <Button variant="outline" onClick={previousCard}>
          Previous
        </Button>
        <Button onClick={randomCard} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Random
        </Button>
        <Button
          onClick={shuffle}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Shuffle All
        </Button>
        <Button variant="outline" onClick={nextCard}>
          Next
        </Button>
      </div>
    </div>
  );
}
