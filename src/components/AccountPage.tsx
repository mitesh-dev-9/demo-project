import { useState } from 'react';
import { User } from '../types';
import { UserCircle, Save, Mail, Phone, Building2, MapPin, FileText } from 'lucide-react';

interface AccountPageProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export default function AccountPage({ user, onUpdateUser }: AccountPageProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    setTimeout(() => {
      onUpdateUser({
        name: formData.get('name') as string,
        company: formData.get('company') as string,
        address: formData.get('address') as string,
        phone: formData.get('phone') as string,
        note: formData.get('note') as string,
      });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-8 right-8 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-scale-in z-50">
            <Save className="w-5 h-5" />
            <span className="font-medium">Changes saved successfully!</span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Edit Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-scale-in hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <UserCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Account Information</h1>
                <p className="text-sm text-gray-500">Update your personal details</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-gray-400" />
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-gray-300"
                  required
                />
              </div>
              
              <div className="group">
                <label htmlFor="company" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  defaultValue={user.company}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-gray-300"
                  required
                />
              </div>
              
              <div className="group">
                <label htmlFor="address" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  defaultValue={user.address}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-gray-300"
                  required
                />
              </div>
              
              <div className="group">
                <label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  defaultValue={user.phone}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-gray-300"
                  required
                />
              </div>

              <div className="group">
                <label htmlFor="note" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  Note
                </label>
                <textarea
                  id="note"
                  name="note"
                  defaultValue={user.note}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-gray-300 resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-[#6b9d3e] to-[#5a8534] hover:from-[#5a8534] hover:to-[#4a7324] text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Display Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 animate-scale-in hover:shadow-xl transition-shadow" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col items-center">
              <div className="relative mb-8 group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-48 h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center shadow-xl">
                  <UserCircle className="w-32 h-32 text-gray-500" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Overview</h2>
              <p className="text-gray-500 text-sm mb-6">Your current information</p>
              
              <div className="w-full space-y-3">
                <div className="bg-white rounded-lg p-4 border-2 border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <UserCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Name</p>
                      <p className="text-gray-900 font-semibold">{user.name}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-2 border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Company</p>
                      <p className="text-gray-900 font-semibold">{user.company}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-2 border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Address</p>
                      <p className="text-gray-900 font-semibold text-sm">{user.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-2 border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Phone</p>
                      <p className="text-gray-900 font-semibold">{user.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-2 border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Note</p>
                      <p className="text-gray-900 font-semibold">{user.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
