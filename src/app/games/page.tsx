"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  PlayCircle, 
  Star, 
  Trophy, 
  Clock,
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  Shuffle,
  Volume2
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Game data
const games = [
  {
    id: "letter-match",
    title: "Letter Matching",
    description: "Drag letters to match with corresponding images",
    icon: "🔤",
    difficulty: "Easy",
    estimatedTime: "5-10 min",
    color: "bg-green-500"
  },
  {
    id: "word-builder",
    title: "Word Builder", 
    description: "Build words by arranging letter tiles",
    icon: "🧩",
    difficulty: "Medium",
    estimatedTime: "10-15 min",
    color: "bg-blue-500"
  },
  {
    id: "memory-cards",
    title: "Memory Cards",
    description: "Match pairs of letters, words, or images",
    icon: "🧠",
    difficulty: "Easy",
    estimatedTime: "8-12 min", 
    color: "bg-purple-500"
  },
  {
    id: "phonics-sound",
    title: "Phonics Sound Match",
    description: "Match sounds with letters and words",
    icon: "🔊",
    difficulty: "Medium",
    estimatedTime: "10-15 min",
    color: "bg-orange-500"
  },
  {
    id: "spelling-bee",
    title: "Spelling Bee",
    description: "Spell words correctly with increasing difficulty",
    icon: "🐝",
    difficulty: "Hard",
    estimatedTime: "15-20 min",
    color: "bg-yellow-500"
  },
  {
    id: "reading-race",
    title: "Reading Race",
    description: "Read passages and answer comprehension questions",
    icon: "🏃",
    difficulty: "Hard", 
    estimatedTime: "10-20 min",
    color: "bg-red-500"
  },
  {
    id: "shape-letters",
    title: "Shape Letters",
    description: "Form letters using different shapes and patterns",
    icon: "🔺",
    difficulty: "Medium",
    estimatedTime: "8-15 min",
    color: "bg-indigo-500"
  },
  {
    id: "story-sequence",
    title: "Story Sequencing",
    description: "Arrange story elements in the correct order",
    icon: "📚",
    difficulty: "Medium",
    estimatedTime: "12-18 min",
    color: "bg-pink-500"
  },
  {
    id: "rhyme-time",
    title: "Rhyme Time",
    description: "Find and match words that rhyme together",
    icon: "🎵",
    difficulty: "Easy",
    estimatedTime: "8-12 min",
    color: "bg-teal-500"
  },
  {
    id: "syllable-clap", 
    title: "Syllable Clap",
    description: "Count syllables in words by clapping",
    icon: "👏",
    difficulty: "Medium",
    estimatedTime: "10-15 min",
    color: "bg-cyan-500"
  }
];

// Letter matching game data
const letterMatchData = [
  { letter: "A", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/42799de8-4e9c-4261-a538-3f2d61b4e70d.png", word: "Apple" },
  { letter: "B", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ff45766b-0740-4513-a553-db9f60328718.png", word: "Ball" },
  { letter: "C", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/36b10561-f5c3-41db-8858-2828824b2c32.png", word: "Cat" },
  { letter: "D", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/662f783d-0463-4c06-b259-88f5647fbeb7.png", word: "Dog" },
  { letter: "E", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/00cb38f2-2246-43a5-85d5-8466e36ca51a.png", word: "Egg" },
  { letter: "F", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f5bbe6c8-8bea-4516-a022-2050b2f4291d.png", word: "Fish" }
];

// Word builder game data
const wordBuilderData = [
  { word: "CAT", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f9e4bf17-4f80-489a-a349-7763bfefb403.png", letters: ["C", "A", "T"] },
  { word: "DOG", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/23c0a056-b355-4ec6-be2c-c0ee955c780a.png", letters: ["D", "O", "G"] },
  { word: "FISH", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a33f1f83-4cb5-4412-87d9-7a27210658df.png", letters: ["F", "I", "S", "H"] },
  { word: "BIRD", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b3fe6d4e-e83f-4a6c-88b3-81e075b56922.png", letters: ["B", "I", "R", "D"] }
];

export default function GamesPage() {
  const [currentView, setCurrentView] = useState<'menu' | 'game'>('menu');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const startGame = (gameId: string) => {
    setSelectedGame(gameId);
    setCurrentView('game');
  };

  const backToMenu = () => {
    setCurrentView('menu');
    setSelectedGame(null);
  };

  // Letter Matching Game Component
  const LetterMatchingGame = () => {
    const [gameItems, setGameItems] = useState(letterMatchData.slice(0, 4));
    const [matches, setMatches] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [attempts, setAttempts] = useState(0);

    const handleDragStart = (letter: string) => {
      setDraggedItem(letter);
    };

    const handleDrop = (targetLetter: string) => {
      if (draggedItem === targetLetter) {
        setMatches([...matches, targetLetter]);
        setScore(score + 10);
        setAttempts(attempts + 1);
      } else {
        setAttempts(attempts + 1);
      }
      setDraggedItem(null);
    };

    const resetGame = () => {
      setMatches([]);
      setScore(0);
      setAttempts(0);
      setDraggedItem(null);
    };

    const shuffleGame = () => {
      const shuffled = [...gameItems].sort(() => Math.random() - 0.5);
      setGameItems(shuffled);
    };

    return (
      <div className="space-y-6">
        {/* Game Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Letter Matching</h2>
            <p className="text-gray-600">Drag letters to their matching images</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-100 text-green-800">
              Score: {score}
            </Badge>
            <Badge variant="outline">
              Attempts: {attempts}
            </Badge>
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex space-x-2">
          <Button onClick={resetGame} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={shuffleGame} variant="outline" size="sm">
            <Shuffle className="h-4 w-4 mr-2" />
            Shuffle
          </Button>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{matches.length} / {gameItems.length}</span>
          </div>
          <Progress value={(matches.length / gameItems.length) * 100} />
        </div>

        {/* Game Area */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Letters Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Letters</h3>
            <div className="grid grid-cols-2 gap-4">
              {gameItems.map((item) => (
                <div
                  key={`letter-${item.letter}`}
                  className={`w-20 h-20 border-2 border-dashed rounded-lg flex items-center justify-center text-2xl font-bold cursor-move transition-all duration-300 ${
                    matches.includes(item.letter)
                      ? 'bg-green-100 border-green-300 text-green-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                  draggable={!matches.includes(item.letter)}
                  onDragStart={() => handleDragStart(item.letter)}
                >
                  {item.letter}
                </div>
              ))}
            </div>
          </div>

          {/* Images Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {gameItems.map((item) => (
                <div
                  key={`image-${item.letter}`}
                  className={`border-2 border-dashed rounded-lg p-2 text-center transition-all duration-300 ${
                    matches.includes(item.letter)
                      ? 'bg-green-100 border-green-300'
                      : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(item.letter)}
                >
                  <img 
                    src={item.image} 
                    alt={item.word}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-medium text-gray-700">{item.word}</p>
                  {matches.includes(item.letter) && (
                    <CheckCircle className="h-6 w-6 text-green-500 mx-auto mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Complete */}
        {matches.length === gameItems.length && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 mb-2">Excellent Work!</h3>
              <p className="text-green-700 mb-4">
                You matched all letters correctly with a score of {score} points!
              </p>
              <div className="flex space-x-4 justify-center">
                <Button onClick={resetGame} className="bg-green-500 hover:bg-green-600">
                  Play Again
                </Button>
                <Button variant="outline" onClick={backToMenu}>
                  Try Another Game
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // Word Builder Game Component  
  const WordBuilderGame = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [builtWord, setBuiltWord] = useState<string[]>([]);
    const [availableLetters, setAvailableLetters] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);

    const currentWord = wordBuilderData[currentWordIndex];

    useEffect(() => {
      // Shuffle letters for the current word
      const shuffled = [...currentWord.letters, ...['X', 'Y', 'Z'].slice(0, 2)].sort(() => Math.random() - 0.5);
      setAvailableLetters(shuffled);
      setBuiltWord([]);
    }, [currentWordIndex]);

    const addLetter = (letter: string, index: number) => {
      setBuiltWord([...builtWord, letter]);
      setAvailableLetters(availableLetters.filter((_, i) => i !== index));
    };

    const removeLetter = (index: number) => {
      const letter = builtWord[index];
      setBuiltWord(builtWord.filter((_, i) => i !== index));
      setAvailableLetters([...availableLetters, letter]);
    };

    const checkWord = () => {
      setAttempts(attempts + 1);
      if (builtWord.join('') === currentWord.word) {
        setScore(score + 20);
        if (currentWordIndex + 1 < wordBuilderData.length) {
          setCurrentWordIndex(currentWordIndex + 1);
        }
      } else {
        // Reset for retry
        setAvailableLetters([...availableLetters, ...builtWord].sort(() => Math.random() - 0.5));
        setBuiltWord([]);
      }
    };

    const resetWord = () => {
      setAvailableLetters([...currentWord.letters, ...['X', 'Y', 'Z'].slice(0, 2)].sort(() => Math.random() - 0.5));
      setBuiltWord([]);
    };

    return (
      <div className="space-y-6">
        {/* Game Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Word Builder</h2>
            <p className="text-gray-600">Build the word for the image using letter tiles</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-blue-100 text-blue-800">
              Score: {score}
            </Badge>
            <Badge variant="outline">
              Word {currentWordIndex + 1} / {wordBuilderData.length}
            </Badge>
          </div>
        </div>

        {/* Current Word Image */}
        <Card>
          <CardContent className="p-8 text-center">
            <img 
              src={currentWord.image}
              alt="Word to build"
              className="w-48 h-36 object-cover rounded-lg mx-auto mb-4"
            />
            <p className="text-gray-600">What word describes this image?</p>
          </CardContent>
        </Card>

        {/* Word Building Area */}
        <Card>
          <CardHeader>
            <CardTitle>Build Your Word</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Built Word Display */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {Array(6).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                      index < builtWord.length
                        ? 'bg-blue-100 border-blue-300 text-blue-600 cursor-pointer hover:bg-blue-200'
                        : 'bg-gray-50 border-gray-300 text-gray-400'
                    }`}
                    onClick={() => index < builtWord.length && removeLetter(index)}
                  >
                    {builtWord[index] || ''}
                  </div>
                ))}
              </div>
            </div>

            {/* Available Letters */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {availableLetters.map((letter, index) => (
                  <button
                    key={`${letter}-${index}`}
                    onClick={() => addLetter(letter, index)}
                    className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <Button onClick={checkWord} disabled={builtWord.length === 0}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Check Word
              </Button>
              <Button onClick={resetWord} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Game Complete */}
        {currentWordIndex >= wordBuilderData.length && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-800 mb-2">Fantastic!</h3>
              <p className="text-blue-700 mb-4">
                You built all words correctly! Final score: {score} points
              </p>
              <div className="flex space-x-4 justify-center">
                <Button onClick={() => { setCurrentWordIndex(0); setScore(0); setAttempts(0); }} className="bg-blue-500 hover:bg-blue-600">
                  Play Again
                </Button>
                <Button variant="outline" onClick={backToMenu}>
                  Try Another Game
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // Game content renderer
  const renderGameContent = () => {
    switch (selectedGame) {
      case 'letter-match':
        return <LetterMatchingGame />;
      case 'word-builder':
        return <WordBuilderGame />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Coming Soon!</h2>
            <p className="text-gray-600 mb-6">This game is being developed and will be available soon.</p>
            <Button onClick={backToMenu}>Back to Games Menu</Button>
          </div>
        );
    }
  };

  if (currentView === 'game') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        
        <div className="pt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <Button 
              onClick={backToMenu}
              variant="outline" 
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Games
            </Button>

            {/* Game Content */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                {renderGameContent()}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  // Games Menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Interactive Learning Games
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engaging games designed to make learning fun and effective. 
              Each game targets specific skills to support your child's development.
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {games.map((game) => (
              <Card 
                key={game.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 shadow-lg"
                onClick={() => startGame(game.id)}
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${game.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl">{game.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                    {game.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center mb-4 text-sm">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <Badge 
                      variant="outline"
                      className={
                        game.difficulty === 'Easy' ? 'border-green-300 text-green-700' :
                        game.difficulty === 'Medium' ? 'border-yellow-300 text-yellow-700' :
                        'border-red-300 text-red-700'
                      }
                    >
                      {game.difficulty}
                    </Badge>
                    <span className="text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {game.estimatedTime}
                    </span>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Play Game
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Game Benefits */}
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Why Play Our Games?</CardTitle>
              <p className="text-gray-600">
                Scientifically designed to support dyslexic learners
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Sensory Learning</h3>
                  <p className="text-gray-600 text-sm">
                    Games engage visual, auditory, and kinesthetic learning styles
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Progressive Difficulty</h3>
                  <p className="text-gray-600 text-sm">
                    Adaptive challenges that grow with your child's abilities
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Volume2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Audio Support</h3>
                  <p className="text-gray-600 text-sm">
                    Built-in pronunciation guides and audio feedback
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}