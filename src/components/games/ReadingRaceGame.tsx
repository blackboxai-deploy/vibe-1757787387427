"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ReadingRaceGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function ReadingRaceGame({ onComplete, onBack }: ReadingRaceGameProps) {
  const [score] = useState(88);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Card className="shadow-xl">
          <CardHeader className="bg-red-500 text-white text-center">
            <CardTitle className="text-2xl">🏃 Reading Race</CardTitle>
          </CardHeader>
          <CardContent className="p-12 text-center">
            <h2 className="text-xl mb-4">Timed reading comprehension</h2>
            <p className="text-gray-600 mb-8">Race against time to read and understand stories!</p>
            <Button 
              onClick={() => onComplete(score)}
              className="bg-red-500 hover:bg-red-600"
            >
              Complete Demo ({score}%)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}