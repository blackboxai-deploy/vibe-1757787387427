"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen,
  TrendingUp, 
  Award, 
  Clock,
  Target,
  ChevronRight,
  Star,
  PlayCircle,
  BarChart3,
  Settings
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Demo data
const children = [
  {
    id: 1,
    name: "Emma Johnson",
    age: 8,
    avatar: "EJ",
    overallProgress: 78,
    currentLevel: "Level 3",
    strengths: ["Visual Learning", "Word Recognition"],
    challenges: ["Phonics", "Spelling"],
    recentActivity: "Completed Memory Card Game",
    nextGoal: "Complete Level 3 Assessment"
  },
  {
    id: 2,
    name: "Alex Johnson", 
    age: 10,
    avatar: "AJ",
    overallProgress: 65,
    currentLevel: "Level 2",
    strengths: ["Math Skills", "Logic"],
    challenges: ["Reading Fluency", "Comprehension"],
    recentActivity: "Started Phonics Module",
    nextGoal: "Improve Reading Speed"
  }
];

const recentGames = [
  { name: "Letter Matching", score: 95, date: "Today", time: "12 min" },
  { name: "Word Builder", score: 88, date: "Yesterday", time: "8 min" },
  { name: "Memory Cards", score: 92, date: "2 days ago", time: "15 min" },
  { name: "Phonics Sound", score: 78, date: "3 days ago", time: "10 min" }
];

const achievements = [
  { title: "First Steps", description: "Completed first assessment", icon: "🏆", earned: true },
  { title: "Word Master", description: "Built 50 words successfully", icon: "📝", earned: true },
  { title: "Memory Champion", description: "Perfect memory game score", icon: "🧠", earned: true },
  { title: "Reading Star", description: "Read 10 stories", icon: "⭐", earned: false },
  { title: "Spelling Bee", description: "Perfect spelling test", icon: "🐝", earned: false }
];

export default function DashboardPage() {
  const [selectedChild, setSelectedChild] = useState(children[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Main Content */}
      <div className={`pt-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Track your child's learning journey and celebrate their progress.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Select onValueChange={(value) => {
                const child = children.find(c => c.id === parseInt(value));
                if (child) setSelectedChild(child);
              }}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select child" />
                </SelectTrigger>
                <SelectContent>
                  {children.map(child => (
                    <SelectItem key={child.id} value={child.id.toString()}>
                      {child.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
            </div>
          </div>

          {/* Child Profile Card */}
          <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20 border-4 border-white">
                  <AvatarFallback className="text-2xl font-bold text-orange-600 bg-white">
                    {selectedChild.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{selectedChild.name}</h2>
                  <p className="text-orange-100 mb-2">Age {selectedChild.age} • {selectedChild.currentLevel}</p>
                  <p className="text-orange-100 text-sm mb-4">{selectedChild.recentActivity}</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm font-bold">{selectedChild.overallProgress}%</span>
                      </div>
                      <Progress 
                        value={selectedChild.overallProgress} 
                        className="h-2 bg-orange-400/30"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Link href="/assessment">
                    <Button className="bg-white text-orange-600 hover:bg-orange-50 mb-2">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </Link>
                  <Link href="/progress">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Reports
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
                    <div className="text-gray-600 text-sm">Lessons Completed</div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
                    <div className="text-gray-600 text-sm">Games Mastered</div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">45m</div>
                    <div className="text-gray-600 text-sm">Today's Practice</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-orange-500" />
                      <span>Recent Activity</span>
                    </CardTitle>
                    <Link href="/progress" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentGames.map((game, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <PlayCircle className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{game.name}</p>
                            <p className="text-sm text-gray-500">{game.date} • {game.time}</p>
                          </div>
                        </div>
                        <Badge 
                          variant={game.score >= 90 ? "default" : game.score >= 80 ? "secondary" : "outline"}
                          className={game.score >= 90 ? "bg-green-500" : game.score >= 80 ? "bg-yellow-500" : ""}
                        >
                          {game.score}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Current Goal */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-600">
                    <Target className="h-5 w-5" />
                    <span>Current Goal</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{selectedChild.nextGoal}</p>
                  <Link href="/assessment">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                      Start Now
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Strengths & Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-600 mb-2 flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Strengths
                    </h4>
                    <div className="space-y-1">
                      {selectedChild.strengths.map((strength, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-orange-600 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      Areas to Improve
                    </h4>
                    <div className="space-y-1">
                      {selectedChild.challenges.map((challenge, index) => (
                        <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          {challenge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center space-x-3 p-2 rounded-lg ${
                          achievement.earned 
                            ? 'bg-yellow-50 border border-yellow-200' 
                            : 'bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{achievement.title}</p>
                          <p className="text-xs text-gray-500">{achievement.description}</p>
                        </div>
                        {achievement.earned && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300 text-xs">
                            Earned
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/games" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Play Games
                    </Button>
                  </Link>
                  
                  <Link href="/assessment" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Take Assessment
                    </Button>
                  </Link>
                  
                  <Link href="/progress" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Progress
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}