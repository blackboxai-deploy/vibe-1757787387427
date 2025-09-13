"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, Trophy, Clock } from "lucide-react";

interface MemoryCard {
  id: number;
  content: string;
  type: 'letter' | 'word' | 'image';
  matched: boolean;
  flipped: boolean;
  pair: number;
}

interface MemoryCardGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const cardPairs = [
  { letter: 'A', word: 'APPLE', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f3b7c31f-f856-4cd1-95d7-4416c371e9a8.png' },
  { letter: 'B', word: 'BALL', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5f5db0aa-733a-4cc1-83f4-a44f5fea070e.png' },
  { letter: 'C', word: 'CAT', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f9afddaa-f45e-430e-8ec3-c3b9db23892a.png' },
  { letter: 'D', word: 'DOG', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2bd49564-ac84-4f6a-b0eb-5148f93004bb.png' },
  { letter: 'E', word: 'EGG', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cf9d14c7-2eb3-4216-bc38-e5bb1c6cb87b.png' },
  { letter: 'F', word: 'FISH', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0eb57106-d320-43ef-8b03-114f34ca19ac.png' },
  { letter: 'G', word: 'GRAPE', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6e3ce443-74fb-48af-b20e-5dad8826a8a6.png' },
  { letter: 'H', word: 'HOUSE', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aa7fd770-0bf5-4164-9067-3d5e2e15fef4.png' }
];

export default function MemoryCardGame({ onComplete, onBack }: MemoryCardGameProps) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (gameStarted && !gameComplete) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameComplete]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }, [flippedCards]);

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeCards = () => {
    const gameCards: MemoryCard[] = [];
    let cardId = 0;

    cardPairs.forEach((pair, pairIndex) => {
      // Add letter card
      gameCards.push({
        id: cardId++,
        content: pair.letter,
        type: 'letter',
        matched: false,
        flipped: false,
        pair: pairIndex
      });

      // Add word card
      gameCards.push({
        id: cardId++,
        content: pair.word,
        type: 'word',
        matched: false,
        flipped: false,
        pair: pairIndex
      });
    });

    return shuffleArray(gameCards);
  };

  const startGame = () => {
    const newCards = initializeCards();
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(true);
    setGameComplete(false);
    setFeedback('Match letters with their corresponding words!');
  };

  const flipCard = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find(card => card.id === cardId)?.matched) return;

    setFlippedCards(prev => [...prev, cardId]);
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, flipped: true } : card
    ));
  };

  const checkMatch = () => {
    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find(card => card.id === firstId);
    const secondCard = cards.find(card => card.id === secondId);

    setMoves(prev => prev + 1);

    if (firstCard && secondCard && firstCard.pair === secondCard.pair) {
      // Match found!
      setCards(prev => prev.map(card => 
        card.id === firstId || card.id === secondId 
          ? { ...card, matched: true, flipped: true }
          : card
      ));
      
      setMatchedPairs(prev => prev + 1);
      setFeedback(`Great match! ${firstCard.content} goes with ${secondCard.content}! 🎉`);
      
      // Check if game is complete
      if (matchedPairs + 1 === cardPairs.length) {
        setTimeout(() => endGame(), 1000);
      }
    } else {
      // No match
      setFeedback('Not a match! Try again.');
      setTimeout(() => {
        setCards(prev => prev.map(card => 
          card.id === firstId || card.id === secondId 
            ? { ...card, flipped: false }
            : card
        ));
      }, 1000);
    }

    setTimeout(() => {
      setFlippedCards([]);
    }, 1000);
  };

  const endGame = () => {
    setGameComplete(true);
    setGameStarted(false);
    
    // Calculate score based on moves and time
    const baseScore = 100;
    const movesPenalty = Math.max(0, (moves - cardPairs.length * 2) * 2);
    const timePenalty = Math.max(0, (timeElapsed - 120) * 0.5);
    const finalScore = Math.max(20, Math.round(baseScore - movesPenalty - timePenalty));
    
    setFeedback(`Congratulations! You found all ${cardPairs.length} pairs!`);
    setTimeout(() => onComplete(finalScore), 2000);
  };

  const resetGame = () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setGameComplete(false);
    setFeedback('');
  };

  const progress = (matchedPairs / cardPairs.length) * 100;

  if (!gameStarted && !gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={onBack} variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          
          <Card className="shadow-2xl">
            <CardHeader className="text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl mb-4">🎴 Memory Cards Game</CardTitle>
              <p className="text-lg opacity-90">
                Match letters with their corresponding words to improve memory and recognition!
              </p>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">How to Play:</h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">1</div>
                    <p>Click cards to flip them over</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">2</div>
                    <p>Find matching letter-word pairs</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">3</div>
                    <p>Match all {cardPairs.length} pairs to win!</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={startGame}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-12 py-4 text-lg font-semibold"
              >
                Start Memory Game
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 flex items-center">
                <Clock className="h-6 w-6 mr-1" />
                {Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-600">Time</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{moves}</div>
              <div className="text-sm text-gray-600">Moves</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{matchedPairs}/{cardPairs.length}</div>
              <div className="text-sm text-gray-600">Pairs Found</div>
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

        {/* Game Grid */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <CardTitle className="text-center">Memory Cards</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => flipCard(card.id)}
                  className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    card.flipped || card.matched
                      ? card.matched
                        ? 'bg-gradient-to-br from-green-400 to-green-600'
                        : card.type === 'letter'
                        ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                        : 'bg-gradient-to-br from-orange-400 to-orange-600'
                      : 'bg-gradient-to-br from-gray-400 to-gray-600'
                  }`}
                >
                  <div className="w-full h-full rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                    {card.flipped || card.matched ? (
                      <div className="text-center">
                        <div className={`${card.type === 'letter' ? 'text-2xl' : 'text-sm'} font-bold`}>
                          {card.content}
                        </div>
                      </div>
                    ) : (
                      <div className="text-2xl">?</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Matched Pairs Display */}
        {matchedPairs > 0 && (
          <Card className="mt-6 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 text-center flex items-center justify-center">
                <Trophy className="h-6 w-6 mr-2" />
                Matched Pairs! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{matchedPairs}</div>
                <p className="text-gray-600">pairs found out of {cardPairs.length}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Moves: {moves} | Time: {Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}