"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isScrolled ? 'bg-orange-500' : 'bg-white/20'
            }`}>
              <BookOpen className={`h-6 w-6 transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-white'
              }`} />
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              DyslexiaEdu Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/features" 
              className={`font-medium transition-colors duration-300 hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Features
            </Link>
            <Link 
              href="/assessment" 
              className={`font-medium transition-colors duration-300 hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Assessment
            </Link>
            <Link 
              href="/games" 
              className={`font-medium transition-colors duration-300 hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Games
            </Link>
            <Link 
              href="/resources" 
              className={`font-medium transition-colors duration-300 hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Resources
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button 
                variant="ghost" 
                className={`transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-orange-500' 
                    : 'text-white hover:text-orange-200'
                }`}
              >
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <Link 
              href="/features" 
              className="block text-gray-700 font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/assessment" 
              className="block text-gray-700 font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Assessment
            </Link>
            <Link 
              href="/games" 
              className="block text-gray-700 font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Games
            </Link>
            <Link 
              href="/resources" 
              className="block text-gray-700 font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <hr className="border-gray-200" />
            <Link 
              href="/login" 
              className="block text-gray-700 font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link href="/register" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}