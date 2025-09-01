import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Phone, Calendar, MapPin, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function RegistrationPage({ onBack, onNavigate, challenge }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    education: '',
    institution: '',
    experience: '',
    skills: [],
    motivation: '',
    referral: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillOptions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'Machine Learning',
    'Data Science', 'AI/ML', 'Cloud Computing', 'DevOps', 'Mobile Development',
    'UI/UX Design', 'Data Analysis', 'Algorithms', 'System Design'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else {
      setSelectedSkills(prev => [...prev, skill]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration process
    alert('Registration successful! Welcome to Growify!');
    onNavigate('dashboard');
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="Create password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="education">Highest Education</Label>
        <select
          id="education"
          value={formData.education}
          onChange={(e) => handleInputChange('education', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Education Level</option>
          <option value="high-school">High School</option>
          <option value="diploma">Diploma</option>
          <option value="bachelors">Bachelor's Degree</option>
          <option value="masters">Master's Degree</option>
          <option value="phd">PhD</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="institution">Institution/University</Label>
        <div className="relative">
          <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="institution"
            placeholder="Enter your institution name"
            value={formData.institution}
            onChange={(e) => handleInputChange('institution', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Work Experience</Label>
        <select
          id="experience"
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Experience Level</option>
          <option value="fresher">Fresher (0 years)</option>
          <option value="0-1">0-1 years</option>
          <option value="1-3">1-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Skills & Technologies</Label>
        <p className="text-sm text-gray-600">Select your areas of expertise</p>
        <div className="flex flex-wrap gap-2">
          {skillOptions.map((skill) => (
            <Badge
              key={skill}
              variant={selectedSkills.includes(skill) ? "default" : "outline"}
              className="cursor-pointer hover:bg-blue-100"
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation">Why do you want to join Growify?</Label>
        <Textarea
          id="motivation"
          placeholder="Tell us about your learning goals and what motivates you..."
          value={formData.motivation}
          onChange={(e) => handleInputChange('motivation', e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="referral">How did you hear about us? (Optional)</Label>
        <select
          id="referral"
          value={formData.referral}
          onChange={(e) => handleInputChange('referral', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Source</option>
          <option value="google">Google Search</option>
          <option value="social-media">Social Media</option>
          <option value="friend">Friend/Colleague</option>
          <option value="advertisement">Advertisement</option>
          <option value="blog">Blog/Article</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Join Growify</h1>
            <p className="text-gray-600">Create your account to start learning</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Educational Background"}
              {currentStep === 3 && "Skills & Interests"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Let's start with your basic details"}
              {currentStep === 2 && "Tell us about your educational background"}
              {currentStep === 3 && "Help us personalize your learning experience"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                      Next Step
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      Complete Registration
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Terms and Privacy */}
        <div className="mt-6 text-center text-sm text-gray-600">
          By registering, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}