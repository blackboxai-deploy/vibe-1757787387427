"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, CheckCircle, Shuffle } from "lucide-react";

interface Word {
  word: string;
  image: string;
  hint: string;
}

interface WordBuilderGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const wordsData: Word[] = [
  { word: 'CAT', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/62c8bd23-5145-4b61-9234-d053fbbcb520.png', hint: 'A furry pet that says meow' },
  { word: 'DOG', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/140c7223-d492-4bd0-90fb-1d7ac44f98ac.png', hint: 'A loyal pet that barks' },
  { word: 'SUN', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7c7651e4-b38c-441c-b7c1-4be2a666f440.png', hint: 'A bright star in the sky' },
  { word: 'TREE', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/82c14e8d-2058-4c93-9466-bd49b0015481.png', hint: 'Tall plant with leaves and branches' },
  { word: 'FISH', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c681e222-58d0-4452-9059-505f6d3682ff.png', hint: 'Animal that lives in water' },
  { word: 'BIRD', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6c92daf7-8e08-470a-b8ff-c7bbf1b4c941.png', hint: 'Animal that can fly and sing' },
  { word: 'BALL', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0002ec43-176a-42d4-a892-22b825c6afb3.png', hint: 'Round toy you can throw and catch' },
  { word: 'BOOK', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c3e81b1a-d702-4f0d-a43d-75003ef92737.png', hint: 'You read this to learn stories' }
];

export default function WordBuilderGame({ onComplete, onBack }: WordBuilderGameProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [wordsCompleted, setWordsCompleted] = useState(0);

  const currentWord = wordsData[currentWordIndex];

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameComplete) {
      endGame();
    }
  }, [timeLeft, gameComplete, gameStarted]);

  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateLetters = (word: string) => {
    const wordLetters = word.split('');
    const extraLetters = ['A', 'E', 'I', 'O', 'U', 'B', 'L', 'M', 'N', 'P', 'R', 'S', 'T'];
    const randomExtras = extraLetters.filter(letter => !wordLetters.includes(letter))
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    return shuffleArray([...wordLetters, ...randomExtras]);
  };

  const startGame = () => {
    setCurrentWordIndex(0);
    setWordsCompleted(0);
    setScore(0);
    setSelectedLetters([]);
    setAvailableLetters(generateLetters(wordsData[0].word));
    setGameComplete(false);
    setGameStarted(true);
    setTimeLeft(300);
    setFeedback('Build the word by selecting letters!');
    setShowHint(false);
  };

  const selectLetter = (letter: string, index: number) => {
    if (selectedLetters.length >= currentWord.word.length) return;
    
    setSelectedLetters(prev => [...prev, letter]);
    setAvailableLetters(prev => prev.filter((_, i) => i !== index));
  };

  const removeLetter = (index: number) => {
    const removedLetter = selectedLetters[index];
    setSelectedLetters(prev => prev.filter((_, i) => i !== index));
    setAvailableLetters(prev => [...prev, removedLetter]);
  };

  const checkWord = () => {
    const builtWord = selectedLetters.join('');
    
    if (builtWord === currentWord.word) {
      setScore(prev => prev + 100);
      setWordsCompleted(prev => prev + 1);
      setFeedback(`Excellent! You built "${currentWord.word}" correctly! 🎉`);
      
      setTimeout(() => {
        if (currentWordIndex < wordsData.length - 1) {
          nextWord();
        } else {
          endGame();
        }
      }, 2000);
    } else {
      setFeedback(`Not quite right. The word is "${currentWord.word}". Try again!`);
      setSelectedLetters([]);
      setAvailableLetters(generateLetters(currentWord.word));
    }
  };

  const nextWord = () => {
    const nextIndex = currentWordIndex + 1;
    setCurrentWordIndex(nextIndex);
    setSelectedLetters([]);
    setAvailableLetters(generateLetters(wordsData[nextIndex].word));
    setFeedback(`Great! Now build the next word.`);
    setShowHint(false);
  };

  const shuffleLetters = () => {
    setAvailableLetters(prev => shuffleArray(prev));
  };

  const endGame = () => {
    setGameComplete(true);
    setGameStarted(false);
    const finalScore = Math.round((wordsCompleted / wordsData.length) * 100);
    setFeedback(`Game Complete! You built ${wordsCompleted} words correctly!`);
    setTimeout(() => onComplete(finalScore), 2000);
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setWordsCompleted(0);
    setScore(0);
    setSelectedLetters([]);
    setAvailableLetters([]);
    setGameComplete(false);
    setGameStarted(false);
    setTimeLeft(300);
    setFeedback('');
    setShowHint(false);
  };

  const progress = ((wordsCompleted + (selectedLetters.length / currentWord?.word.length || 1)) / wordsData.length) * 100;

  if (!gameStarted && !gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={onBack} variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          
          <Card className="shadow-2xl">
            <CardHeader className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl mb-4">🧩 Word Builder Game</CardTitle>
              <p className="text-lg opacity-90">
                Build words by selecting the correct letters in order!
              </p>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">How to Play:</h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">1</div>
                    <p>Look at the picture and hint</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">2</div>
                    <p>Click letters to build the word</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">3</div>
                    <p>Complete all {wordsData.length} words to win!</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={startGame}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-12 py-4 text-lg font-semibold"
              >
                Start Building
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{wordsCompleted}/{wordsData.length}</div>
              <div className="text-sm text-gray-600">Words Built</div>
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
            Word {currentWordIndex + 1} of {wordsData.length}
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

        {/* Current Word Challenge */}
        <Card className="shadow-lg mb-6">
          <CardHeader className="bg-green-500 text-white text-center">
            <CardTitle>Build This Word</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <img 
                src={currentWord.image}
                alt="Word to build"
                className="mx-auto rounded-lg shadow-md mb-4 max-w-xs"
              />
              
              {!showHint ? (
                <Button 
                  onClick={() => setShowHint(true)}
                  variant="outline"
                  size="sm"
                >
                  Show Hint
                </Button>
              ) : (
                <p className="text-lg text-gray-600 italic">"{currentWord.hint}"</p>
              )}
            </div>

            {/* Word Building Area */}
            <div className="mb-6">
              <div className="flex justify-center items-center space-x-2 mb-4">
                {Array.from({ length: currentWord.word.length }).map((_, index) => (
                  <div
                    key={index}
                    onClick={() => removeLetter(index)}
                    className={`w-16 h-16 border-4 border-dashed rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer transition-all ${
                      selectedLetters[index] 
                        ? 'border-green-400 bg-green-50 text-green-600 hover:bg-green-100' 
                        : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    {selectedLetters[index] || '?'}
                  </div>
                ))}
              </div>

              {selectedLetters.length === currentWord.word.length && (
                <Button 
                  onClick={checkWord}
                  className="bg-green-500 hover:bg-green-600"
                  size="lg"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Check Word
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Letters */}
        <Card className="shadow-lg">
          <CardHeader className="bg-emerald-500 text-white">
            <div className="flex justify-between items-center">
              <CardTitle>Choose Letters</CardTitle>
              <Button 
                onClick={shuffleLetters}
                variant="outline" 
                size="sm"
                className="border-white text-white hover:bg-white hover:text-emerald-500"
              >
                <Shuffle className="h-4 w-4 mr-1" />
                Shuffle
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              {availableLetters.map((letter, index) => (
                <button
                  key={`${letter}-${index}`}
                  onClick={() => selectLetter(letter, index)}
                  className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xl font-bold cursor-pointer hover:scale-105 transition-transform shadow-md hover:shadow-lg"
                >
                  {letter}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Display */}
        {wordsCompleted > 0 && (
          <Card className="mt-6 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 text-center">Words Completed! 🏆</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{wordsCompleted}</div>
                <p className="text-gray-600">out of {wordsData.length} words built correctly!</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}