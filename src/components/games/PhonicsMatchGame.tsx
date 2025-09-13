"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PhonicsMatchGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function PhonicsMatchGame({ onComplete, onBack }: PhonicsMatchGameProps) {
  const [score] = useState(85);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Card className="shadow-xl">
          <CardHeader className="bg-purple-500 text-white text-center">
            <CardTitle className="text-2xl">🔊 Phonics Sound Match</CardTitle>
          </CardHeader>
          <CardContent className="p-12 text-center">
            <h2 className="text-xl mb-4">Match sounds to letters and words</h2>
            <p className="text-gray-600 mb-8">This advanced phonics game is coming soon!</p>
            <Button 
              onClick={() => onComplete(score)}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Complete Demo ({score}%)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}