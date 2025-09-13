"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SyllableClapGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function SyllableClapGame({ onComplete, onBack }: SyllableClapGameProps) {
  const [score] = useState(91);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Card className="shadow-xl">
          <CardHeader className="bg-emerald-500 text-white text-center">
            <CardTitle className="text-2xl">👏 Syllable Clap</CardTitle>
          </CardHeader>
          <CardContent className="p-12 text-center">
            <h2 className="text-xl mb-4">Count syllables in spoken words</h2>
            <p className="text-gray-600 mb-8">Clap along to count word syllables!</p>
            <Button 
              onClick={() => onComplete(score)}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Complete Demo ({score}%)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}