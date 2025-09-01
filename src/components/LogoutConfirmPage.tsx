import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { LogOut, ArrowLeft } from 'lucide-react';

export function LogoutConfirmPage({ onBack, onConfirm }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 rounded-3xl shadow-lg bg-white">
        <div className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut className="w-10 h-10 text-red-600" />
          </div>
          
          {/* Title and Message */}
          <h2 className="text-2xl font-bold mb-2">Leave Growify?</h2>
          <p className="text-gray-600 mb-8">
            Are you sure you want to log out? You'll need to sign in again to access your courses and progress.
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={onConfirm}
              className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold"
            >
              Yes, Log Out
            </Button>
            <Button 
              onClick={onBack}
              variant="outline"
              className="w-full h-12 rounded-xl font-semibold hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> Your progress is automatically saved. You can continue learning anytime by signing back in.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}