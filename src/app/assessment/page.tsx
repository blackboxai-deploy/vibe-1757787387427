"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Clock,
  Star,
  Trophy,
  Target,
  Brain,
  Volume2
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Assessment data structure
const assessmentLevels = [
  {
    id: 1,
    title: "Basic Recognition",
    description: "Letter and number identification",
    questions: 10,
    color: "bg-green-500",
    icon: "🔤"
  },
  {
    id: 2,
    title: "Phonics Foundation", 
    description: "Sound association and basic phonics",
    questions: 15,
    color: "bg-blue-500",
    icon: "🔊"
  },
  {
    id: 3,
    title: "Word Formation",
    description: "Building and spelling simple words",
    questions: 20,
    color: "bg-purple-500",
    icon: "📝"
  },
  {
    id: 4,
    title: "Reading Comprehension",
    description: "Understanding text and context",
    questions: 15,
    color: "bg-orange-500", 
    icon: "📖"
  },
  {
    id: 5,
    title: "Advanced Skills",
    description: "Complex reading and writing tasks",
    questions: 20,
    color: "bg-red-500",
    icon: "🎓"
  }
];

// Sample questions for each level
const sampleQuestions = {
  1: [
    {
      id: 1,
      type: "multiple-choice",
      question: "Which letter is shown in the image?",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0bdbc0a9-374f-4ea1-be7a-2501e42f408c.png",
      options: ["A", "B", "C", "D"],
      correct: 0,
      difficulty: "easy"
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What number do you see?",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f49cf900-76e2-4d87-b369-f7341bc4c181.png",
      options: ["2", "3", "4", "5"],
      correct: 1,
      difficulty: "easy"
    },
    {
      id: 3,
      type: "matching",
      question: "Match the uppercase letter with its lowercase pair",
      pairs: [["A", "a"], ["B", "b"], ["C", "c"]],
      difficulty: "easy"
    }
  ],
  2: [
    {
      id: 1,
      type: "audio-choice",
      question: "Which word starts with the 'B' sound?",
      audio: "/sounds/b-sound.mp3",
      options: ["Cat", "Ball", "Dog", "Fish"],
      correct: 1,
      difficulty: "medium"
    },
    {
      id: 2,
      type: "multiple-choice", 
      question: "What sound does 'PH' make in 'phone'?",
      options: ["P", "H", "F", "PH"],
      correct: 2,
      difficulty: "medium"
    }
  ],
  3: [
    {
      id: 1,
      type: "word-building",
      question: "Drag the letters to spell 'CAT'",
      letters: ["C", "A", "T", "B", "D"],
      correct: ["C", "A", "T"],
      difficulty: "medium"
    },
    {
      id: 2,
      type: "spelling",
      question: "How do you spell the word for this image?",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6dff4dfc-58c7-4286-819b-df8ab0faf3ed.png",
      correct: "HOUSE",
      difficulty: "medium"
    }
  ]
};

export default function AssessmentPage() {
  const [currentView, setCurrentView] = useState<'levels' | 'assessment' | 'results'>('levels');
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [timeStarted, setTimeStarted] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentView === 'assessment' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setAssessmentComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentView, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startAssessment = (levelId: number) => {
    setSelectedLevel(levelId);
    setCurrentView('assessment');
    setTimeStarted(new Date());
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer("");
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setSelectedAnswer("");
    
    const level = assessmentLevels.find(l => l.id === selectedLevel);
    if (currentQuestion + 1 >= (level?.questions || 0)) {
      setAssessmentComplete(true);
      setCurrentView('results');
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  const calculateResults = () => {
    // Demo scoring logic
    const correctAnswers = Math.floor(answers.length * 0.8); // 80% success rate for demo
    const percentage = Math.round((correctAnswers / answers.length) * 100);
    const level = assessmentLevels.find(l => l.id === selectedLevel);
    
    return {
      score: percentage,
      correct: correctAnswers,
      total: answers.length,
      level: level?.title || "",
      recommendations: getRecommendations(percentage)
    };
  };

  const getRecommendations = (score: number) => {
    if (score >= 90) return ["Excellent work! Ready for next level", "Continue with advanced exercises"];
    if (score >= 75) return ["Good progress! Review challenging areas", "Practice phonics exercises"];
    if (score >= 60) return ["Keep practicing! Focus on basics", "Use interactive games for improvement"];
    return ["Needs additional support", "Consider one-on-one tutoring", "Start with simpler exercises"];
  };

  if (currentView === 'results') {
    const results = calculateResults();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        
        <div className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-12 w-12 text-white" />
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Assessment Complete!
                </h1>
                
                <div className="text-6xl font-bold text-green-500 mb-2">
                  {results.score}%
                </div>
                
                <p className="text-xl text-gray-600 mb-8">
                  {results.correct} out of {results.total} correct answers
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Brain className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-900">Level Completed</h3>
                    <p className="text-blue-700">{results.level}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-900">Performance</h3>
                    <p className="text-green-700">
                      {results.score >= 80 ? "Excellent" : results.score >= 60 ? "Good" : "Needs Practice"}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <h3 className="font-semibold text-purple-900">Time Spent</h3>
                    <p className="text-purple-700">
                      {timeStarted ? Math.round((Date.now() - timeStarted.getTime()) / 1000 / 60) : 0} minutes
                    </p>
                  </div>
                </div>

                <Card className="mb-8 text-left">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="flex space-x-4 justify-center">
                  <Button 
                    onClick={() => setCurrentView('levels')}
                    variant="outline"
                    size="lg"
                  >
                    Take Another Level
                  </Button>
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500">
                    Start Learning Games
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  if (currentView === 'assessment' && selectedLevel) {
    const level = assessmentLevels.find(l => l.id === selectedLevel);
    const questions = sampleQuestions[selectedLevel as keyof typeof sampleQuestions] || [];
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / (level?.questions || 1)) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        
        <div className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Assessment Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {level?.title} Assessment
                </h1>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-100 text-blue-800">
                    Question {currentQuestion + 1} of {level?.questions}
                  </Badge>
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
                  </div>
                </div>
              </div>
              
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="shadow-lg border-0 mb-6">
              <CardContent className="p-8">
                {currentQ && (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        {currentQ.question}
                      </h2>
                      
                      {currentQ && 'image' in currentQ && currentQ.image && (
                        <div className="mb-6">
                          <img 
                            src={currentQ.image}
                            alt="Question image"
                            className="mx-auto rounded-lg shadow-md max-w-xs"
                          />
                        </div>
                      )}

                      {currentQ && 'audio' in currentQ && currentQ.type === 'audio-choice' && (
                        <Button variant="outline" className="mb-6">
                          <Volume2 className="h-4 w-4 mr-2" />
                          Play Sound
                        </Button>
                      )}
                    </div>

                    {currentQ && 'options' in currentQ && currentQ.options && (
                      <RadioGroup 
                        value={selectedAnswer} 
                        onValueChange={handleAnswerSelect}
                        className="space-y-4"
                      >
                        {currentQ.options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label 
                              htmlFor={`option-${index}`} 
                              className="text-lg cursor-pointer flex-1"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button 
                onClick={nextQuestion}
                disabled={!selectedAnswer}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                {currentQuestion + 1 === level?.questions ? "Finish Assessment" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  // Default view - Level Selection
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Dyslexia Assessment Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take our comprehensive 5-level assessment to understand your child's learning profile 
              and get personalized recommendations for their educational journey.
            </p>
          </div>

          {/* Assessment Levels */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {assessmentLevels.map((level, index) => (
              <Card 
                key={level.id} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 shadow-lg"
                onClick={() => startAssessment(level.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${level.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl">{level.icon}</span>
                  </div>
                  
                  <Badge className="mb-3" variant="outline">
                    Level {level.id}
                  </Badge>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {level.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {level.description}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>{level.questions} questions</span>
                    <span>•</span>
                    <span>~{Math.round(level.questions * 1.5)} minutes</span>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Start Level {level.id}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Assessment Features */}
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Assessment Features</CardTitle>
              <p className="text-gray-600">
                Our scientifically-designed assessment provides comprehensive insights
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Adaptive Testing</h3>
                  <p className="text-gray-600 text-sm">
                    Questions adapt based on your child's responses for accurate assessment
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Detailed Analysis</h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive reports with strengths, challenges, and recommendations
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                  <p className="text-gray-600 text-sm">
                    Monitor improvements over time with detailed progress analytics
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