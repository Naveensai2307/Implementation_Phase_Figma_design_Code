import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ArrowLeft, Plus, User, Check, Settings, Trash2, Crown } from 'lucide-react';

export function AccountManagementPage({ user, onBack, onNavigate }) {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@example.com',
      type: 'Premium',
      isActive: true,
      avatar: '👨‍💻',
      courses: 12,
      progress: 75
    },
    {
      id: 2,
      name: 'Sarah Learning',
      email: 'sarah.learning@example.com',
      type: 'Free',
      isActive: false,
      avatar: '👩‍🎓',
      courses: 5,
      progress: 45
    }
  ]);

  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: '',
    email: '',
    type: 'Free'
  });

  const handleSwitchAccount = (accountId) => {
    setAccounts(accounts.map(account => ({
      ...account,
      isActive: account.id === accountId
    })));
  };

  const handleAddAccount = () => {
    if (newAccount.name && newAccount.email) {
      const newId = Math.max(...accounts.map(a => a.id)) + 1;
      setAccounts([...accounts, {
        id: newId,
        ...newAccount,
        isActive: false,
        avatar: '👤',
        courses: 0,
        progress: 0
      }]);
      setNewAccount({ name: '', email: '', type: 'Free' });
      setShowAddAccount(false);
    }
  };

  const handleDeleteAccount = (accountId) => {
    if (accounts.length > 1) {
      setAccounts(accounts.filter(account => account.id !== accountId));
    }
  };

  const activeAccount = accounts.find(account => account.isActive);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg lg:text-xl font-semibold">Account Management</h1>
            <p className="text-xs lg:text-sm text-gray-500">Manage your learning accounts</p>
          </div>
          <div className="w-9 h-9"></div>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Current Active Account */}
          <Card className="p-6 lg:p-8 rounded-3xl shadow-sm bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl lg:text-3xl">
                {activeAccount?.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg lg:text-xl font-semibold">{activeAccount?.name}</h3>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">Active</span>
                </div>
                <p className="text-gray-600 mb-2">{activeAccount?.email}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    activeAccount?.type === 'Premium' 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {activeAccount?.type === 'Premium' && <Crown className="w-3 h-3 inline mr-1" />}
                    {activeAccount?.type}
                  </span>
                  <span className="text-gray-600">{activeAccount?.courses} courses</span>
                  <span className="text-gray-600">{activeAccount?.progress}% avg progress</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => onNavigate('settings')}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold"
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage Current Account
            </Button>
          </Card>

          {/* All Accounts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">All Accounts</h3>
              <Button 
                onClick={() => setShowAddAccount(!showAddAccount)}
                className="h-10 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </Button>
            </div>

            {/* Add New Account Form */}
            {showAddAccount && (
              <Card className="p-6 rounded-2xl shadow-sm mb-4 border-green-200 bg-green-50">
                <h4 className="font-semibold mb-4">Add New Account</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Enter full name"
                      value={newAccount.name}
                      onChange={(e) => setNewAccount(prev => ({ ...prev, name: e.target.value }))}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={newAccount.email}
                      onChange={(e) => setNewAccount(prev => ({ ...prev, email: e.target.value }))}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Account Type</label>
                    <select 
                      value={newAccount.type}
                      onChange={(e) => setNewAccount(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-white"
                    >
                      <option value="Free">Free Account</option>
                      <option value="Premium">Premium Account</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleAddAccount}
                      className="flex-1 h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold"
                    >
                      Create Account
                    </Button>
                    <Button 
                      onClick={() => setShowAddAccount(false)}
                      variant="outline"
                      className="flex-1 h-12 rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Accounts List */}
            <div className="space-y-3">
              {accounts.map((account) => (
                <Card 
                  key={account.id} 
                  className={`p-4 lg:p-6 rounded-2xl shadow-sm transition-all cursor-pointer ${
                    account.isActive 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'hover:shadow-md hover:border-gray-300'
                  }`}
                  onClick={() => handleSwitchAccount(account.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                      {account.avatar}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{account.name}</h4>
                        {account.isActive && <Check className="w-4 h-4 text-green-500" />}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          account.type === 'Premium' 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {account.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{account.email}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>📚 {account.courses} courses</span>
                        <span>📊 {account.progress}% progress</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!account.isActive && (
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSwitchAccount(account.id);
                          }}
                          className="h-8 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                        >
                          Switch
                        </Button>
                      )}
                      
                      {accounts.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAccount(account.id);
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Account Benefits */}
          <Card className="p-6 lg:p-8 rounded-3xl shadow-sm bg-gradient-to-r from-yellow-50 to-orange-50">
            <div className="text-center">
              <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h4 className="text-lg font-semibold mb-2">Upgrade to Premium</h4>
              <p className="text-gray-600 mb-4">
                Get unlimited access to all courses, priority support, and exclusive content.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="text-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    📚
                  </div>
                  <p className="font-medium">Unlimited Courses</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🎯
                  </div>
                  <p className="font-medium">Priority Support</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    ⭐
                  </div>
                  <p className="font-medium">Exclusive Content</p>
                </div>
              </div>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white h-12 px-8 rounded-xl font-semibold">
                Upgrade Now - $19.99/month
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}