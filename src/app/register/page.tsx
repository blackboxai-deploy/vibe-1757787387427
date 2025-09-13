"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, ArrowLeft, Eye, EyeOff, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    childName: "",
    childAge: "",
    agreeTerms: false,
    newsletter: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Demo registration - redirect to dashboard
    router.push('/dashboard');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="w-full max-w-lg relative z-10 my-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Create Your Account
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Start tracking your child's learning journey
            </p>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Parent Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="h-5 w-5 mr-2 text-orange-500" />
                    Parent Information
                  </h3>
                </div>

                <div>
                  <Label htmlFor="parentName" className="text-gray-700 font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="parentName"
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => handleInputChange("parentName", e.target.value)}
                    placeholder="Your full name"
                    className="mt-1 h-12 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className="mt-1 h-12 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                      className="mt-1 h-12 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Create password"
                        className="h-12 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Confirm password"
                        className="h-12 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Child Information */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                    Child Information
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="childName" className="text-gray-700 font-medium">
                      Child's Name
                    </Label>
                    <Input
                      id="childName"
                      type="text"
                      value={formData.childName}
                      onChange={(e) => handleInputChange("childName", e.target.value)}
                      placeholder="Child's full name"
                      className="mt-1 h-12 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="childAge" className="text-gray-700 font-medium">
                      Age Group
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("childAge", value)}>
                      <SelectTrigger className="mt-1 h-12 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500">
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4-6">4-6 years</SelectItem>
                        <SelectItem value="7-9">7-9 years</SelectItem>
                        <SelectItem value="10-12">10-12 years</SelectItem>
                        <SelectItem value="13-15">13-15 years</SelectItem>
                        <SelectItem value="16+">16+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Terms and Newsletter */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                  />
                  <Label htmlFor="agreeTerms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-orange-600 hover:text-orange-700">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-orange-600 hover:text-orange-700">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                  />
                  <Label htmlFor="newsletter" className="text-sm text-gray-600">
                    Send me updates about new features and learning tips
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                disabled={isLoading || !formData.agreeTerms}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-orange-600 hover:text-orange-700 font-semibold"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}