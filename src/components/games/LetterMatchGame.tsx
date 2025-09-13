"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, CheckCircle, XCircle } from "lucide-react";

interface LetterItem {
  letter: string;
  word: string;
  image: string;
  matched: boolean;
}

interface LetterMatchGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const letterData: LetterItem[] = [
  { letter: 'A', word: 'Apple', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ece41ec1-bc53-4bdc-bd0a-1e5db2facfd4.png', matched: false },
  { letter: 'B', word: 'Ball', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bdf9db5e-9a2a-49c0-98f7-68bb7103dc41.png', matched: false },
  { letter: 'C', word: 'Cat', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d9876a42-df6f-4a55-872b-40784fe1db99.png', matched: false },
  { letter: 'D', word: 'Dog', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f6a1bb72-6e7b-4fc2-93c9-d83369ce491e.png', matched: false },
  { letter: 'E', word: 'Egg', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b43456d0-5537-4425-9965-58eda31484e4.png', matched: false },
  { letter: 'F', word: 'Fish', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7557d394-0fe7-4f56-bdc1-ffc2b3fde104.png', matched: false }
];

export default function LetterMatchGame({ onComplete, onBack }: LetterMatchGameProps) {
  const [letters, setLetters] = useState<LetterItem[]>(letterData);
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameComplete) {
      endGame();
    }
  }, [timeLeft, gameComplete, gameStarted]);

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    setLetters(prev => prev.map(item => ({ ...item, matched: false })));
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
    setGameStarted(true);
    setTimeLeft(180);
    setFeedback('Drag letters to their matching pictures!');
  };

  const handleDragStart = (letter: string) => {
    setDraggedLetter(letter);
  };

  const handleDragEnd = () => {
    setDraggedLetter(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetLetter: string) => {
    e.preventDefault();
    
    if (!draggedLetter || !gameStarted) return;

    setAttempts(prev => prev + 1);

    if (draggedLetter === targetLetter) {
      setLetters(prev => prev.map(item => 
        item.letter === targetLetter ? { ...item, matched: true } : item
      ));
      setScore(prev => prev + 1);
      setFeedback(`Correct! ${targetLetter} is for ${letters.find(l => l.letter === targetLetter)?.word}! 🎉`);
      
      // Check if game is complete
      const updatedLetters = letters.map(item => 
        item.letter === targetLetter ? { ...item, matched: true } : item
      );
      
      if (updatedLetters.every(item => item.matched)) {
        setTimeout(() => endGame(), 1000);
      }
    } else {
      setFeedback(`Not quite! Try again. ${draggedLetter} doesn't match this picture.`);
    }

    setDraggedLetter(null);
  };

  const endGame = () => {
    setGameComplete(true);
    setGameStarted(false);
    const finalScore = Math.round((score / letters.length) * 100);
    setFeedback(`Game Complete! You matched ${score} out of ${letters.length} letters correctly!`);
    setTimeout(() => onComplete(finalScore), 2000);
  };

  const resetGame = () => {
    setLetters(letterData.map(item => ({ ...item, matched: false })));
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
    setGameStarted(false);
    setTimeLeft(180);
    setFeedback('');
    setDraggedLetter(null);
  };

  const progress = (score / letters.length) * 100;
  const shuffledLetters = shuffleArray(letters);

  if (!gameStarted && !gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          
          <Card className="shadow-2xl">
            <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl mb-4">🔤 Letter Match Game</CardTitle>
              <p className="text-lg opacity-90">
                Drag each letter to its matching picture to learn the alphabet!
              </p>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">How to Play:</h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                    <p>Drag letters from the left side</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
                    <p>Drop them on matching pictures</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
                    <p>Match all {letters.length} letters to win!</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={startGame}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-12 py-4 text-lg font-semibold"
              >
                Start Game
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{score}/{letters.length}</div>
              <div className="text-sm text-gray-600">Matched</div>
            </div>
          </div>
          
          <Button onClick={resetGame} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-3" />
          <div className="text-center mt-2 text-sm text-gray-600">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="mb-6 text-center">
            <div className="inline-block bg-white rounded-lg shadow-md px-6 py-3">
              <p className="text-lg font-medium text-gray-800">{feedback}</p>
            </div>
          </div>
        )}

        {/* Game Area */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Letters to Drag */}
          <Card className="shadow-lg">
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle className="text-center">Letters</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {shuffledLetters.filter(item => !item.matched).map((item) => (
                  <div
                    key={item.letter}
                    draggable
                    onDragStart={() => handleDragStart(item.letter)}
                    onDragEnd={handleDragEnd}
                    className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold cursor-grab hover:scale-105 transition-transform shadow-lg"
                  >
                    {item.letter}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Drop Zones */}
          <Card className="shadow-lg">
            <CardHeader className="bg-indigo-500 text-white">
              <CardTitle className="text-center">Pictures</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {letters.map((item) => (
                  <div
                    key={item.letter}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item.letter)}
                    className={`relative w-20 h-20 rounded-xl border-4 border-dashed transition-all ${
                      item.matched 
                        ? 'border-green-400 bg-green-50' 
                        : draggedLetter === item.letter 
                          ? 'border-blue-400 bg-blue-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-blue-300'
                    }`}
                  >
                    <img 
                      src={item.image}
                      alt={item.word}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    
                    {item.matched && (
                      <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    )}
                    
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                      {item.word}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completed Letters Display */}
        {letters.some(item => item.matched) && (
          <Card className="mt-6 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 text-center">Matched Letters! 🎉</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                {letters.filter(item => item.matched).map(item => (
                  <div key={item.letter} className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                    <span className="text-2xl font-bold text-green-600">{item.letter}</span>
                    <span className="text-sm text-gray-600">→</span>
                    <span className="text-sm font-medium">{item.word}</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}