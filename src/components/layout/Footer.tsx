import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">DyslexiaEdu Pro</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering families with professional dyslexia support and innovative learning solutions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <span className="text-sm">f</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <span className="text-sm">t</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <span className="text-sm">in</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Free Assessment
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Interactive Games
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Progress Tracking
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Learning Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Parent Community
                </Link>
              </li>
              <li>
                <Link href="/experts" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Expert Consultation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <span className="text-gray-400">support@dyslexiaedu.pro</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-400" />
                <span className="text-gray-400">San Francisco, CA</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">
                Get updates on new features and learning tips.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-md transition-colors duration-300 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 DyslexiaEdu Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}