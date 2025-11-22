import React, { useState } from 'react';
import { Home, CheckCircle, Calendar, Users, Wifi, Droplet, Flame, Archive, UtensilsCrossed, Wind, Briefcase, Car, Share2, Heart, Star } from 'lucide-react';

export default function ListingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    moveIn: '',
    moveOut: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Interest expressed! The host will contact you soon.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">Modern Studio near MIT</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.9</span>
              <span>· 12 reviews</span>
            </div>
            <span>· Cambridge, MA</span>
            <button className="ml-auto flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Heart className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-2 mb-8 h-96">
          <div className="col-span-2 row-span-2 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop" 
              alt="Studio main view"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" 
              alt="Studio view 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=300&h=200&fit=crop" 
              alt="Studio view 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=300&h=200&fit=crop" 
              alt="Studio view 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2">
            {/* Property Info */}
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold">Studio in Cambridge</h2>
                <div className="flex items-center gap-1 ml-2">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium">Sarah</span>
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <span>1 bedroom</span>
                <span>·</span>
                <span>1 bathroom</span>
                <span>·</span>
                <span>0 roommates</span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="border rounded-lg p-4 text-center">
                <Home className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold text-sm">Entire place</div>
                <div className="text-xs text-gray-600">Private access</div>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <CheckCircle className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold text-sm">Furnished</div>
                <div className="text-xs text-gray-600">Ready to move</div>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold text-sm">Flexible lease</div>
                <div className="text-xs text-gray-600">3 months</div>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-semibold text-sm">0 roommates</div>
                <div className="text-xs text-gray-600">Student friendly</div>
              </div>
            </div>

            {/* About */}
            <div className="border-b pb-6 mb-6">
              <h3 className="text-xl font-bold mb-4">About this place</h3>
              <p className="text-gray-700 mb-4">
                Beautiful modern studio perfect for students. Features large windows with natural light, fully equipped kitchen, and high-speed WiFi. Walking distance to campus.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="font-semibold text-blue-900 mb-2">Important Note</div>
                <p className="text-sm text-blue-800">
                  This property is verified by CampusStay and ideal for students. Flexible on move-in dates within the first week of the month.
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-b pb-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-gray-600" />
                  <span>WiFi</span>
                </div>
                <div className="flex items-center gap-3">
                  <UtensilsCrossed className="w-5 h-5 text-gray-600" />
                  <span>Kitchen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Droplet className="w-5 h-5 text-gray-600" />
                  <span>Washer</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5 text-gray-600" />
                  <span>Air Conditioning</span>
                </div>
                <div className="flex items-center gap-3">
                  <Flame className="w-5 h-5 text-gray-600" />
                  <span>Heating</span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-600" />
                  <span>Desk</span>
                </div>
                <div className="flex items-center gap-3">
                  <Archive className="w-5 h-5 text-gray-600" />
                  <span>Closet</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-gray-600" />
                  <span>Parking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="col-span-1">
            <div className="border rounded-xl p-6 sticky top-4 shadow-lg">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold">$1200</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  Available Sep 1, 2025
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@university.edu"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Move-in</label>
                    <input
                      type="date"
                      name="moveIn"
                      value={formData.moveIn}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Move-out</label>
                    <input
                      type="date"
                      name="moveOut"
                      value={formData.moveOut}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell the host about yourself..."
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Express Interest
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  You won't be charged yet. Review details with the host first.
                </p>
              </form>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-3">How it works</h4>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li>1. Submit your interest and meet the host on a video call</li>
                  <li>2. Tour the space virtually or in person</li>
                  <li>3. Complete booking with confidence</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}