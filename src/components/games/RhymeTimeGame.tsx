"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface RhymeTimeGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function RhymeTimeGame({ onComplete, onBack }: RhymeTimeGameProps) {
  const [score] = useState(94);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Card className="shadow-xl">
          <CardHeader className="bg-cyan-500 text-white text-center">
            <CardTitle className="text-2xl">🎵 Rhyme Time</CardTitle>
          </CardHeader>
          <CardContent className="p-12 text-center">
            <h2 className="text-xl mb-4">Match rhyming words together</h2>
            <p className="text-gray-600 mb-8">Find words that sound alike!</p>
            <Button 
              onClick={() => onComplete(score)}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              Complete Demo ({score}%)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}