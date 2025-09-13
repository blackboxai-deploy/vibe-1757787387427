"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Volume2, Trophy, Star, Heart, Target, RotateCcw } from "lucide-react";

interface SpellingWord {
  word: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  image: string;
  pronunciation: string;
}

interface SpellingBeeGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const spellingWords: SpellingWord[] = [
  // Easy Words (3-4 letters)
  { word: 'CAT', difficulty: 'easy', hint: 'A pet that says meow', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4602df47-dd0c-46ef-b546-db1b85d06db0.png', pronunciation: 'Cat - C-A-T' },
  { word: 'DOG', difficulty: 'easy', hint: 'A loyal pet that barks', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/45a60525-4aa4-410e-8c64-bc8ab6201493.png', pronunciation: 'Dog - D-O-G' },
  { word: 'SUN', difficulty: 'easy', hint: 'Bright star in the sky', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8d149fec-4428-4c38-8724-c8b3a3259b0c.png', pronunciation: 'Sun - S-U-N' },
  { word: 'FISH', difficulty: 'easy', hint: 'Swims in water', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/56642272-2e39-40d4-94b6-5924d8e7f9be.png', pronunciation: 'Fish - F-I-S-H' },
  
  // Medium Words (5-6 letters)
  { word: 'APPLE', difficulty: 'medium', hint: 'Red fruit that grows on trees', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/345d6c0e-3b04-42d9-9c85-3e3614b3b74b.png', pronunciation: 'Apple - A-P-P-L-E' },
  { word: 'HOUSE', difficulty: 'medium', hint: 'Where people live', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0c62b21c-d683-45f5-a9ea-f6b9aff2cc1c.png', pronunciation: 'House - H-O-U-S-E' },
  { word: 'FLOWER', difficulty: 'medium', hint: 'Beautiful colorful plant', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/42dbd178-7d67-457e-b49a-e621f4af7467.png', pronunciation: 'Flower - F-L-O-W-E-R' },
  { word: 'HAPPY', difficulty: 'medium', hint: 'Feeling joyful and glad', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/472d3c4c-35ee-472f-a762-5caa09f81bb2.png', pronunciation: 'Happy - H-A-P-P-Y' },
  
  // Hard Words (7+ letters)
  { word: 'RAINBOW', difficulty: 'hard', hint: 'Colorful arc in the sky after rain', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ae7e4a16-d1b1-4071-822b-b70b613d3c9d.png', pronunciation: 'Rainbow - R-A-I-N-B-O-W' },
  { word: 'ELEPHANT', difficulty: 'hard', hint: 'Large gray animal with trunk', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/349c8474-ec13-4674-87d0-6bd12ce5323c.png', pronunciation: 'Elephant - E-L-E-P-H-A-N-T' },
  { word: 'BUTTERFLY', difficulty: 'hard', hint: 'Colorful flying insect', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f22648b6-b8fb-47d8-a3ff-9837ab53d25d.png', pronunciation: 'Butterfly - B-U-T-T-E-R-F-L-Y' },
  { word: 'MOUNTAIN', difficulty: 'hard', hint: 'Very tall rocky hill', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/82d7cf1b-1cc3-4e09-9080-7f9d8e1ec8bb.png', pronunciation: 'Mountain - M-O-U-N-T-A-I-N' }
];

const successMessages = [
  "🌟 PERFECT SPELLING! You're absolutely brilliant!",
  "🎉 AMAZING! You spelled that perfectly!",
  "⭐ OUTSTANDING! You're a spelling superstar!",
  "🏆 EXCELLENT! That's perfect spelling!",
  "💫 INCREDIBLE! You're becoming a spelling champion!",
  "🎊 FANTASTIC! What amazing spelling skills!"
];

const encouragementMessages = [
  "💪 Almost perfect! You're learning so well - try again!",
  "🌈 Great effort! Spelling is tricky - you're doing amazing!",
  "💝 Close! Every attempt makes you stronger - keep going!",
  "🌟 You're so brave to try! Let's spell it together!",
  "🎯 Good try! Learning spelling takes practice - you're awesome!",
  "💖 That's okay! Every expert was once a beginner like you!"
];

export default function SpellingBeeGame({ onComplete, onBack }: SpellingBeeGameProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes
  const [showCelebration, setShowCelebration] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(false);

  const currentWord = spellingWords[currentWordIndex];

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameComplete) {
      endGame();
    }
  }, [timeLeft, gameComplete, gameStarted]);

  const speakWord = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingAudio(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.7;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      
      utterance.onend = () => setPlayingAudio(false);
      utterance.onerror = () => setPlayingAudio(false);
      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const triggerCelebration = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const startGame = () => {
    setCurrentWordIndex(0);
    setUserInput('');
    setScore(0);
    setAttempts(0);
    setConsecutiveCorrect(0);
    setGameStarted(true);
    setGameComplete(false);
    setTimeLeft(480);
    setFeedback('🐝 Listen to the word and spell it correctly! You can do this!');
    setShowHint(false);
  };

  const checkSpelling = () => {
    setAttempts(prev => prev + 1);
    const userAnswer = userInput.toUpperCase().trim();
    
    if (userAnswer === currentWord.word) {
      // Correct spelling!
      setScore(prev => prev + (currentWord.difficulty === 'easy' ? 10 : currentWord.difficulty === 'medium' ? 15 : 20));
      setConsecutiveCorrect(prev => prev + 1);
      
      const successMsg = successMessages[Math.floor(Math.random() * successMessages.length)];
      setFeedback(`${successMsg} "${currentWord.word}" is absolutely correct!`);
      
      triggerCelebration();
      
      // Special streak encouragement
      if (consecutiveCorrect >= 2) {
        setTimeout(() => {
          setFeedback(`🔥 INCREDIBLE ${consecutiveCorrect + 1} WORD STREAK! You're unstoppable!`);
        }, 3000);
      }
      
      setTimeout(() => {
        if (currentWordIndex < spellingWords.length - 1) {
          nextWord();
        } else {
          endGame();
        }
      }, 4000);
    } else {
      // Incorrect spelling
      setConsecutiveCorrect(0);
      const encourageMsg = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
      setFeedback(`${encourageMsg} The correct spelling is "${currentWord.word}".`);
      
      setTimeout(() => {
        setUserInput('');
        setFeedback("🎯 Let's try spelling this word! Listen carefully and give it your best shot!");
      }, 4000);
    }
  };

  const nextWord = () => {
    setCurrentWordIndex(prev => prev + 1);
    setUserInput('');
    setShowHint(false);
    setFeedback("🚀 Next word coming up! You're doing fantastic!");
  };

  const endGame = () => {
    setGameComplete(true);
    setGameStarted(false);
    const finalScore = Math.round((score / (spellingWords.length * 15)) * 100);
    
    let winMessage = "";
    if (finalScore >= 90) {
      winMessage = "🏆 SPELLING BEE CHAMPION! You're absolutely incredible!";
    } else if (finalScore >= 75) {
      winMessage = "🌟 EXCELLENT SPELLER! You did amazing work!";
    } else if (finalScore >= 60) {
      winMessage = "👏 GREAT EFFORT! You're learning so well!";
    } else {
      winMessage = "💪 WONDERFUL TRY! Every word you spelled is progress!";
    }
    
    setFeedback(winMessage);
    setTimeout(() => onComplete(finalScore), 4000);
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setUserInput('');
    setScore(0);
    setAttempts(0);
    setConsecutiveCorrect(0);
    setGameStarted(false);
    setGameComplete(false);
    setTimeLeft(480);
    setFeedback('');
    setShowHint(false);
    setShowCelebration(false);
    setPlayingAudio(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progress = ((currentWordIndex + (userInput.length > 0 ? 0.5 : 0)) / spellingWords.length) * 100;

  if (!gameStarted && !gameComplete) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
        <div className="container-fluid py-12">
          <Button onClick={onBack} className="btn-secondary mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          
          <Card className="game-card max-w-4xl mx-auto">
            <CardHeader className="text-center" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <CardTitle className="text-4xl mb-6 text-white">🐝 Spelling Bee Challenge</CardTitle>
              <p className="text-xl text-yellow-100">
                Progressive spelling challenges with audio pronunciation!
              </p>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-8">How to Play:</h3>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xl">1</div>
                    <p className="text-lg text-center">Listen to the word pronunciation</p>
                  </div>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xl">2</div>
                    <p className="text-lg text-center">Type the correct spelling</p>
                  </div>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xl">3</div>
                    <p className="text-lg text-center">Complete all {spellingWords.length} words!</p>
                  </div>
                </div>
              </div>
              
              <Button onClick={startGame} className="btn btn-primary text-xl px-16 py-6">
                🚀 Start Spelling Bee
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
      <div className="container-fluid py-8">
        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="text-9xl animate-bounce">🏆</div>
            <div className="absolute inset-0 bg-yellow-300 opacity-30 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold text-white text-shadow animate-bounce">PERFECT SPELLING!</div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button onClick={onBack} className="btn-secondary">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Games
          </Button>
          
          <div className="flex items-center space-x-6">
            <div className="stats-card py-4 px-6">
              <div className="text-2xl font-bold text-yellow-600">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
            
            <div className="stats-card py-4 px-6">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>

            <div className="stats-card py-4 px-6">
              <div className="text-2xl font-bold text-purple-600">{consecutiveCorrect}</div>
              <div className="text-sm text-gray-600">Streak</div>
            </div>
          </div>
          
          <Button onClick={resetGame} className="btn-secondary">
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-lg font-medium text-gray-700 mb-3">
            <span>Word {currentWordIndex + 1} of {spellingWords.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="progress h-4 rounded-full" />
        </div>

        {/* Enhanced Feedback */}
        {feedback && (
          <div className="mb-8 text-center">
            <div className="inline-block glass rounded-2xl px-8 py-4 border-2 border-white/30">
              <p className="text-xl font-bold text-white text-shadow">{feedback}</p>
            </div>
          </div>
        )}

        {/* Spelling Challenge */}
        <Card className="game-card max-w-3xl mx-auto">
          <CardHeader style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }} className="text-white text-center">
            <div className="flex items-center justify-center space-x-3">
              <Target className="h-8 w-8" />
              <CardTitle className="text-2xl">Spell This Word</CardTitle>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(currentWord.difficulty)}`}>
                {currentWord.difficulty.toUpperCase()}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-10 text-center">
            {/* Word Image */}
            <div className="mb-8">
              <img 
                src={currentWord.image}
                alt="Word to spell"
                className="mx-auto rounded-2xl shadow-xl max-w-sm hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Audio Button */}
            <div className="mb-8">
              <Button 
                onClick={() => speakWord(currentWord.pronunciation)}
                className="btn btn-primary text-lg px-8 py-4"
                disabled={playingAudio}
              >
                <Volume2 className={`h-6 w-6 mr-3 ${playingAudio ? 'animate-pulse' : ''}`} />
                {playingAudio ? 'Playing...' : 'Hear Word'}
              </Button>
            </div>

            {/* Hint */}
            <div className="mb-8">
              {!showHint ? (
                <Button 
                  onClick={() => setShowHint(true)}
                  className="btn-secondary"
                >
                  💡 Show Hint
                </Button>
              ) : (
                <div className="glass rounded-2xl px-6 py-3 border border-white/30 inline-block">
                  <p className="text-lg text-white font-medium italic">"{currentWord.hint}"</p>
                </div>
              )}
            </div>

            {/* Spelling Input */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Type your spelling:</h3>
              <div className="max-w-md mx-auto">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type the word here..."
                  className="text-center text-2xl font-bold py-4 rounded-2xl border-2 border-yellow-300 focus:border-yellow-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && userInput.trim()) {
                      checkSpelling();
                    }
                  }}
                />
              </div>
            </div>

            {/* Check Button */}
            {userInput.trim() && (
              <Button 
                onClick={checkSpelling}
                className="btn btn-primary text-xl px-12 py-4"
              >
                <Star className="h-6 w-6 mr-3" />
                Check Spelling
              </Button>
            )}

            {/* Word Length Hint */}
            <div className="mt-6">
              <p className="text-gray-600">
                💡 This word has <span className="font-bold text-yellow-600">{currentWord.word.length}</span> letters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Summary */}
        {score > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 border-2 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-yellow-800 text-center text-2xl flex items-center justify-center">
                <Trophy className="h-8 w-8 mr-3 text-yellow-600 animate-bounce" />
                Your Spelling Progress! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-yellow-600">{score}</div>
                  <p className="text-gray-600">Points Earned</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{currentWordIndex}</div>
                  <p className="text-gray-600">Words Spelled</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">{consecutiveCorrect}</div>
                  <p className="text-gray-600">Current Streak</p>
                </div>
              </div>
              
              {consecutiveCorrect >= 3 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300">
                  <p className="text-lg font-bold text-purple-800 flex items-center justify-center">
                    <Star className="h-6 w-6 mr-2 text-purple-600 animate-spin" />
                    AMAZING {consecutiveCorrect} WORD STREAK! You're a spelling genius!
                    <Star className="h-6 w-6 ml-2 text-purple-600 animate-spin" />
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Encouragement */}
        <div className="mt-8 text-center">
          <div className="glass rounded-2xl px-8 py-4 border border-white/30 inline-block">
            <p className="text-white font-semibold flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-400 animate-pulse" />
              Remember: Great spellers are made through practice, not perfection!
              <Heart className="h-5 w-5 ml-2 text-red-400 animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}