"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Volume2, Play, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface LearningItem {
  character: string;
  word: string;
  image: string;
  pronunciation: string;
}

// Alphabet data with images and pronunciations
const alphabetData: LearningItem[] = [
  { character: 'A', word: 'Apple', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b077d17c-aa8d-4152-90b5-03f9a4449d9d.png', pronunciation: 'A as in Apple' },
  { character: 'B', word: 'Ball', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/16c4ac87-fc65-45f5-8b53-7ee00f13ce5d.png', pronunciation: 'B as in Ball' },
  { character: 'C', word: 'Cat', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0605a632-e6aa-4e54-b13a-d3f73d6c4bde.png', pronunciation: 'C as in Cat' },
  { character: 'D', word: 'Dog', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2fee717d-a524-4c81-9c3f-7887e7975a92.png', pronunciation: 'D as in Dog' },
  { character: 'E', word: 'Egg', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/885ed402-02ad-4b08-bac9-0beb124fa290.png', pronunciation: 'E as in Egg' },
  { character: 'F', word: 'Fish', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/995a51ea-d9d2-41f4-94d1-17e8b09f951b.png', pronunciation: 'F as in Fish' },
  { character: 'G', word: 'Grape', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cc79cdd0-2326-499f-8480-f70e9abcb8f0.png', pronunciation: 'G as in Grape' },
  { character: 'H', word: 'House', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f0a896f1-5890-4908-8136-05fc2957803c.png', pronunciation: 'H as in House' },
  { character: 'I', word: 'Ice', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/91333074-f44a-4d34-b70a-56049247ed4c.png', pronunciation: 'I as in Ice' },
  { character: 'J', word: 'Juice', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9ca8223a-1863-4471-ac09-63653ed6b18f.png', pronunciation: 'J as in Juice' },
  { character: 'K', word: 'Key', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0dc0af9a-3b47-4ad0-bc4d-3b6a69b6ae4c.png', pronunciation: 'K as in Key' },
  { character: 'L', word: 'Lion', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/46b812dd-f9f9-4b5c-b0b0-3f180c884788.png', pronunciation: 'L as in Lion' },
  { character: 'M', word: 'Moon', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c2fd4122-b140-43a0-807b-4a68656c9ed5.png', pronunciation: 'M as in Moon' },
  { character: 'N', word: 'Nest', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d083b888-6366-44a1-acbb-dbe7d7014057.png', pronunciation: 'N as in Nest' },
  { character: 'O', word: 'Orange', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/db3408d5-49a7-46ca-bdc2-e0fd568e48ce.png', pronunciation: 'O as in Orange' },
  { character: 'P', word: 'Pizza', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ebb5905e-aea3-471f-bf88-afed59f2d040.png', pronunciation: 'P as in Pizza' },
  { character: 'Q', word: 'Queen', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/54eb192a-6bb0-4bb9-ae87-3f9117d6f859.png', pronunciation: 'Q as in Queen' },
  { character: 'R', word: 'Rainbow', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bc630f6b-b81f-4c6d-81e2-bad63ffd9a3d.png', pronunciation: 'R as in Rainbow' },
  { character: 'S', word: 'Sun', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/110c95ec-66ac-405e-999b-5573afbe5c63.png', pronunciation: 'S as in Sun' },
  { character: 'T', word: 'Tree', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/65d79d5e-8b65-458b-ab24-7dcd40c148cc.png', pronunciation: 'T as in Tree' },
  { character: 'U', word: 'Umbrella', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/117d731c-e519-4013-9d9c-917fb609686a.png', pronunciation: 'U as in Umbrella' },
  { character: 'V', word: 'Violin', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/92dac2ef-e488-4b53-a194-5924d587391b.png', pronunciation: 'V as in Violin' },
  { character: 'W', word: 'Water', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0f9c5460-75fe-4ede-a075-08234fbbab0b.png', pronunciation: 'W as in Water' },
  { character: 'X', word: 'Xylophone', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8896ba0a-ddbd-4ba1-8e7d-0305ec60de86.png', pronunciation: 'X as in Xylophone' },
  { character: 'Y', word: 'Yacht', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/25f9be09-8e95-475f-84b6-1385371a55b7.png', pronunciation: 'Y as in Yacht' },
  { character: 'Z', word: 'Zebra', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4461ac32-a686-4222-a252-d3a50a1e63cc.png', pronunciation: 'Z as in Zebra' }
];

// Numbers data with images and pronunciations
const numbersData: LearningItem[] = [
  { character: '1', word: 'One', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f3a4291f-22ad-450f-8398-3e75e9a34078.png', pronunciation: 'One' },
  { character: '2', word: 'Two', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b00cce80-5fd4-4724-8e31-e635bc71b8d8.png', pronunciation: 'Two' },
  { character: '3', word: 'Three', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/47761023-35e9-4fe6-b249-4c7044cb1417.png', pronunciation: 'Three' },
  { character: '4', word: 'Four', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ebb193fb-a565-4d42-ad10-8fa34991e41f.png', pronunciation: 'Four' },
  { character: '5', word: 'Five', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/58a5c509-3754-4640-ad5b-3e7e71bed471.png', pronunciation: 'Five' },
  { character: '6', word: 'Six', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4631f703-4234-4fc4-b4a3-a46fd893c99e.png', pronunciation: 'Six' },
  { character: '7', word: 'Seven', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/85fcf753-8654-420f-8b29-25fc8d824995.png', pronunciation: 'Seven' },
  { character: '8', word: 'Eight', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/abc66f8c-176b-4497-bd57-00c2db1ac34a.png', pronunciation: 'Eight' },
  { character: '9', word: 'Nine', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1cdd70a4-96ce-4ce6-9d84-3bd0f00ae1f2.png', pronunciation: 'Nine' },
  { character: '10', word: 'Ten', image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b22bf274-a6f3-4c88-979e-9840d2c82c01.png', pronunciation: 'Ten' }
];

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState<'alphabet' | 'numbers'>('alphabet');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  // Text-to-speech function
  const speakText = useCallback((text: string, character: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      setPlayingAudio(character);
      setCurrentlyPlaying(character);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 1;
      
      utterance.onend = () => {
        setPlayingAudio(null);
        setCurrentlyPlaying(null);
      };
      
      utterance.onerror = () => {
        setPlayingAudio(null);
        setCurrentlyPlaying(null);
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`${text} - Audio not supported in this browser`);
    }
  }, []);

  const playAll = useCallback(() => {
    const data = activeTab === 'alphabet' ? alphabetData : numbersData;
    let index = 0;
    
    const playNext = () => {
      if (index < data.length) {
        const item = data[index];
        speakText(item.pronunciation, item.character);
        index++;
        setTimeout(playNext, 2000); // Wait 2 seconds between each
      }
    };
    
    playNext();
  }, [activeTab, speakText]);

  const stopAll = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingAudio(null);
    setCurrentlyPlaying(null);
  };

  const currentData = activeTab === 'alphabet' ? alphabetData : numbersData;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)' }}>
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-fluid">
          {/* Header */}
          <div className="text-center mb-12">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            
            <Badge className="mb-6 bg-green-100 text-green-700 px-6 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Interactive Learning Center
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn with 
              <span className="gradient-text">Sound & Vision</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Click on any letter or number to hear its sound and see its picture. 
              Learning is more fun when you can see, hear, and interact!
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="glass rounded-2xl p-2 border border-white/30">
              <div className="flex space-x-2">
                <Button
                  onClick={() => setActiveTab('alphabet')}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'alphabet'
                      ? 'btn-primary'
                      : 'bg-transparent text-gray-700 hover:bg-white/50'
                  }`}
                >
                  🔤 Alphabet (A-Z)
                </Button>
                <Button
                  onClick={() => setActiveTab('numbers')}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'numbers'
                      ? 'btn-primary'
                      : 'bg-transparent text-gray-700 hover:bg-white/50'
                  }`}
                >
                  🔢 Numbers (1-10)
                </Button>
              </div>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex justify-center gap-6 mb-12">
            <Button 
              onClick={playAll}
              className="btn btn-primary text-lg px-8 py-4"
              disabled={!!playingAudio}
            >
              <Play className="h-5 w-5 mr-3" />
              Play All {activeTab === 'alphabet' ? 'Letters' : 'Numbers'}
            </Button>
            
            {playingAudio && (
              <Button 
                onClick={stopAll}
                className="btn-secondary text-lg px-8 py-4"
              >
                ⏹️ Stop Audio
              </Button>
            )}
          </div>

          {/* Learning Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {currentData.map((item, index) => (
              <Card 
                key={item.character}
                className={`game-card cursor-pointer group ${
                  currentlyPlaying === item.character ? 'neon-glow' : ''
                }`}
                onClick={() => speakText(item.pronunciation, item.character)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <CardContent className="p-6 text-center">
                  {/* Character Display */}
                  <div 
                    className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-4xl font-bold text-white transition-all duration-500 group-hover:scale-110 ${
                      activeTab === 'alphabet' 
                        ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                        : 'bg-gradient-to-br from-purple-400 to-purple-600'
                    } ${
                      currentlyPlaying === item.character ? 'animate-pulse scale-110' : ''
                    }`}
                  >
                    {item.character}
                  </div>

                  {/* Image */}
                  <div className="relative mb-4">
                    <img 
                      src={item.image}
                      alt={item.word}
                      className="w-full h-24 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
                    />
                    {currentlyPlaying === item.character && (
                      <div className="absolute inset-0 bg-yellow-300 bg-opacity-30 rounded-xl flex items-center justify-center animate-pulse">
                        <Volume2 className="h-8 w-8 text-yellow-600 animate-bounce" />
                      </div>
                    )}
                  </div>

                  {/* Word */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {item.word}
                    </h3>
                    
                    {/* Audio Indicator */}
                    <div className="flex items-center justify-center space-x-2">
                      <Volume2 className={`h-4 w-4 transition-colors ${
                        currentlyPlaying === item.character ? 'text-green-500' : 'text-gray-400'
                      }`} />
                      <span className="text-xs text-gray-500">Click to hear</span>
                    </div>
                  </div>

                  {/* Playing Indicator */}
                  {currentlyPlaying === item.character && (
                    <div className="mt-3">
                      <Badge className="bg-green-100 text-green-700 px-3 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Playing
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Learning Tips */}
          <div className="mt-16">
            <Card className="stats-card max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  🎯 Learning Tips for Parents
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-green-700">👂 Listen Together</h3>
                    <p className="text-gray-600">Repeat the sounds together to reinforce learning through auditory memory.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-blue-700">👀 Visual Association</h3>
                    <p className="text-gray-600">Help your child connect letters with pictures to build visual memory links.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-purple-700">🎮 Make it Fun</h3>
                    <p className="text-gray-600">Turn learning into a game - celebrate every success, big or small!</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
                    💡 Tip: Practice 5-10 minutes daily for best results!
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/games">
                <Button className="btn btn-primary text-lg px-8 py-4">
                  🎮 Play Learning Games
                </Button>
              </Link>
              
              <Link href="/assessment">
                <Button className="btn-secondary text-lg px-8 py-4">
                  📝 Take Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}