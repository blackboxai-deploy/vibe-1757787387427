"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface StorySequenceGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function StorySequenceGame({ onComplete, onBack }: StorySequenceGameProps) {
  const [score] = useState(87);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Card className="shadow-xl">
          <CardHeader className="bg-orange-500 text-white text-center">
            <CardTitle className="text-2xl">📚 Story Sequencing</CardTitle>
          </CardHeader>
          <CardContent className="p-12 text-center">
            <h2 className="text-xl mb-4">Arrange story elements in correct order</h2>
            <p className="text-gray-600 mb-8">Put the story pieces in the right sequence!</p>
            <Button 
              onClick={() => onComplete(score)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Complete Demo ({score}%)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}