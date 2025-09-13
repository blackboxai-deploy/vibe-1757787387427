"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ShapeLettersGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function ShapeLettersGame({ onComplete, onBack }: ShapeLettersGameProps) {
  const [score] = useState(90);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Card className="shadow-xl">
          <CardHeader className="bg-indigo-500 text-white text-center">
            <CardTitle className="text-2xl">🔺 Shape Letters</CardTitle>
          </CardHeader>
          <CardContent className="p-12 text-center">
            <h2 className="text-xl mb-4">Form letters using geometric shapes</h2>
            <p className="text-gray-600 mb-8">Build letters with triangles, circles, and lines!</p>
            <Button 
              onClick={() => onComplete(score)}
              className="bg-indigo-500 hover:bg-indigo-600"
            >
              Complete Demo ({score}%)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}