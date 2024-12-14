'use client'

import React, { useState } from 'react'
import { Lock, User, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null); 
  const [pin, setPin] = useState(['', '', '', '', '', '', '']);
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const fullPin = pin.join('');
    
    if (!fullPin) {
      setError('Please enter your PIN.')
      return
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          pin: fullPin,
          role: selectedRole 
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Login failed');
        return;
      }

      const data = await response.json();
      // Redirect based on role
      window.location.href = selectedRole === 'admin' ? '/admin' : '/';

    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    }
  }

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newPin = [...pin];
    newPin[index] = value;

    if (value && index < pin.length - 1) {
      document.getElementById(`pin-${index + 1}`).focus();
    }

    setPin(newPin);
  };

  // If role is not selected, show role selection
  if (!selectedRole) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-blue-100">
        <Card className="w-[400px] bg-blue-800 bg-opacity-50 backdrop-blur-md border-blue-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-blue-100">
              Welcome to Water Course
            </CardTitle>
            <CardDescription className="text-center text-blue-200">
              Please select your role to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-500 flex items-center justify-center space-x-2"
              onClick={() => setSelectedRole('student')}
            >
              <User className="mr-2" />
              Student Login
            </Button>
            <Button 
              className="w-full h-16 text-lg bg-cyan-600 hover:bg-cyan-500 flex items-center justify-center space-x-2"
              onClick={() => setSelectedRole('admin')}
            >
              <Shield className="mr-2" />
              Admin Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // PIN input form
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-blue-100">
      <Card className="w-[400px] bg-blue-800 bg-opacity-50 backdrop-blur-md border-blue-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-100 flex items-center justify-center">
            <Lock className="mr-2 h-6 w-6" />
            {selectedRole === 'admin' ? 'Admin Login' : 'Student Login'}
          </CardTitle>
          <CardDescription className="text-center text-blue-200">
            Enter your PIN to access the {selectedRole === 'admin' ? 'admin panel' : 'course materials'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between space-x-2">
              {pin.map((digit, index) => (
                <div key={index} className="flex-1">
                  <Label htmlFor={`pin-${index}`} className="sr-only">PIN Digit {index + 1}</Label>
                  <Input
                    id={`pin-${index}`}
                    type="password"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="text-center bg-blue-700 bg-opacity-50 text-blue-100 border-blue-600 placeholder-blue-300"
                    placeholder="•"
                  />
                </div>
              ))}
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4 bg-red-900 bg-opacity-50 border-red-700">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-500">
              Log In
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full mt-2"
              onClick={() => setSelectedRole(null)}
            >
              Back to Role Selection
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-blue-300 text-sm">
          <p className="w-full">Forgot PIN? Contact your administrator</p>
        </CardFooter>
      </Card>
    </div>
  )
}
