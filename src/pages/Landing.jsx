import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Search,
  MessageSquare,
  Home as HomeIcon,
  CheckCircle,
  Users,
  Globe,
  Filter,
  Lock,
  LayoutDashboard,
  MapPin,
  Zap,
  MessageCircle,
  Target,
  Clock,
} from "lucide-react";
import Spline from "@splinetool/react-spline";
import {motion, useScroll, useTransform} from "framer-motion";

// Asset imports — required for Vite production builds
import landingVideo from "../assets/videos/landing_page.mp4";
import house1Img from "../assets/images/house1.jpg";
import house2Img from "../assets/images/house2.jpg";
import house3Img from "../assets/images/house3.jpg";
import house4Img from "../assets/images/house4.jpg";
import house5Img from "../assets/images/house5.jpg";
import house6Img from "../assets/images/house6.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={landingVideo} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-12 opacity-0 animate-fade-in">
            <HomeIcon className="h-10 w-10 text-orange-400" />
            <h1 className="text-3xl font-light tracking-wide">MySublet</h1>
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-center mb-8 max-w-5xl leading-tight opacity-0 animate-fade-in-up animation-delay-200">
            Sublease from real people
            <br />
            <span className="text-orange-400">with confidence</span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-center mb-16 text-white/90 font-light opacity-0 animate-fade-in-up animation-delay-400">
            The safest way to sublease in Germany
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animation-delay-600">
            <Link
              to="/listings"
              className="group bg-white text-black px-10 py-4 text-base font-medium hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              Find your home
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/create-listing"
              className="bg-transparent text-white px-10 py-4 text-base font-medium hover:bg-white/10 transition-all border border-white/60"
            >
              List your place
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 animate-bounce-slow animation-delay-1000">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-scroll-down"></div>
          </div>
        </div>
      </section>

      {/* Why MySublet Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-neutral-900 to-black text-white overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light mb-8 text-white">
              Why MySublet?
            </h2>
            <div className="text-2xl md:text-3xl font-light text-white mb-6 leading-relaxed">
              Real People. Verified. Zero Stress. City-wide reach.
            </div>

            <div className="mt-12 text-left space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Finding a safe sublet in Germany is usually a mess — small
                WhatsApp groups, building chats, university groups, Facebook
                chaos, and endless "Is this still available?" messages.
              </p>
              <p className="font-medium text-white">
                MySublet changes everything.
              </p>
              <p>
                Instead of limiting your search to your dorm, your building, or
                a tiny community group…
                <br />
                <span className="font-medium text-orange-400">
                  👉 we connect you with the entire city
                </span>{" "}
                — verified, trusted, scam-free.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
                {[
                  {icon: Zap, text: "faster matches", color: "text-orange-400"},
                  {icon: MessageCircle, text: "zero back-and-forth", color: "text-blue-400"},
                  {icon: Target, text: "real results", color: "text-green-400"},
                  {icon: Clock, text: "less time wasted", color: "text-purple-400"}
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{delay: 0.1 * i}}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div className="text-xl font-light text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {item.text}
                    </div>
                  </motion.div>
                ))}
              </div>


              <p className="text-2xl font-light text-white pt-8 text-center">
                MySublet is the first place where you list once, and the whole
                city sees it.
              </p>
            </div>
          </div>
        </div>
      </section>
         {/* Journey Section */}
      <JourneySection />


      {/* Key Benefits Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light mb-6 text-white">
              Key Benefits
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Everything you need for stress-free subletting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30">
                <Globe className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                City-Wide Reach
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Stop limiting your search to small groups. Your listing reaches
                the entire city instantly.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>List once, city sees it</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>10x faster matches</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>No more ping-pong messaging</span>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                100% Verified Users
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Manual ID verification for every user. Zero scammers, zero fake
                profiles.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>No anonymous profiles</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>No scam listings</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>No fake landlords</span>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                Safe & Legal
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                All listings comply with German subletting regulations.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Landlord permission verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Anmeldung information</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Clear rental conditions</span>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                Built for You
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Perfect for students, expats, interns, and short-term renters
                across Germany.
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <span>• Erasmus students</span>
                <span>• Young professionals</span>
                <span>• Interns</span>
                <span>• Digital nomads</span>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30">
                <Search className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                Smart Search
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Search across major German cities with powerful filters.
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <span>• Berlin</span>
                <span>• Munich</span>
                <span>• Hamburg</span>
                <span>• Frankfurt</span>
                <span>• Düsseldorf</span>
                <span>• & more</span>
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30">
                <Lock className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">
                Verified Listings
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Manual screening removes suspicious prices, fake photos, and
                scam patterns.
              </p>
              <div className="text-sm text-gray-300">
                If something feels unsafe → we remove it immediately.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="relative py-32 bg-gradient-to-b from-black to-[#0e0e0e] overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-light text-center mb-20 text-white">
            Key Features at a Glance
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <div className="group relative rounded-2xl overflow-hidden h-[500px]">
              <img 
                src={house1Img} 
                alt="Manual Verification"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90"></div>
              
              <div className="relative h-full flex flex-col justify-between p-8">
                <div>
                  <div className="w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center mb-4 relative">
                    <Shield className="w-7 h-7 text-white" />
                    <div className="absolute -inset-3 border-2 border-dashed border-orange-400 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                  </div>
                  <div className="absolute top-8 right-8 opacity-20">
                    <CheckCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Mandatory Manual Verification</h3>
                  <p className="text-gray-300 text-lg">Every user is verified → zero scammers.</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-2xl overflow-hidden h-[500px]">
              <img 
                src={house2Img} 
                alt="City-Wide Listings"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90"></div>
              
              <div className="relative h-full flex flex-col justify-between p-8">
                <div>
                  <div className="w-16 h-16 rounded-full border-4 border-cyan-500 flex items-center justify-center mb-4 relative">
                    <HomeIcon className="w-7 h-7 text-white" />
                    <div className="absolute -inset-3 border-2 border-dashed border-cyan-400 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                  </div>
                  <div className="absolute top-8 right-8 space-y-2">
                    <MapPin className="w-8 h-8 text-cyan-400 opacity-60" />
                    <MapPin className="w-6 h-6 text-cyan-400 opacity-40 ml-4" />
                    <MapPin className="w-8 h-8 text-cyan-400 opacity-60 ml-8" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Verified City-Wide Listings</h3>
                  <p className="text-gray-300 text-lg">Don't limit yourself to your building group — reach the entire city.</p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-2xl overflow-hidden h-[500px]">
              <img 
                src={house3Img} 
                alt="Smart Filters"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90"></div>
              
              <div className="relative h-full flex flex-col justify-between p-8">
                <div>
                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center mb-4 relative">
                    <Filter className="w-7 h-7 text-white" />
                    <div className="absolute -inset-3 border-2 border-dashed border-green-400 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                  </div>
                  <div className="absolute top-8 right-8 opacity-20">
                    <div className="space-y-2">
                      <div className="w-12 h-2 bg-white rounded"></div>
                      <div className="w-16 h-2 bg-white rounded"></div>
                      <div className="w-10 h-2 bg-white rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Smart Filters</h3>
                  <p className="text-gray-300 text-lg">Find matching sublets quickly without messaging 50 people.</p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative rounded-2xl overflow-hidden h-[500px]">
              <img 
                src={house4Img} 
                alt="Secure Messaging"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90"></div>
              
              <div className="relative h-full flex flex-col justify-between p-8">
                <div>
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center mb-4 relative">
                    <Lock className="w-7 h-7 text-white" />
                    <div className="absolute -inset-3 border-2 border-dashed border-emerald-400 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                  </div>
                  <div className="absolute top-8 right-8 opacity-20">
                    <MessageCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Secure In-App Messaging</h3>
                  <p className="text-gray-300 text-lg">No WhatsApp spam. No outside links.</p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group relative rounded-2xl overflow-hidden h-[500px]">
              <img 
                src={house5Img} 
                alt="Host Dashboard"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90"></div>
              
              <div className="relative h-full flex flex-col justify-between p-8">
                <div>
                  <div className="w-16 h-16 rounded-full border-4 border-purple-500 flex items-center justify-center mb-4 relative">
                    <LayoutDashboard className="w-7 h-7 text-white" />
                    <div className="absolute -inset-3 border-2 border-dashed border-purple-400 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                  </div>
                  <div className="absolute top-8 right-8 space-y-1 opacity-30">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                      <div className="w-8 h-2 bg-white rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                      <div className="w-6 h-2 bg-white rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Host Dashboard</h3>
                  <p className="text-gray-300 text-lg">Manage listing, verifications, and requests easily.</p>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group relative rounded-2xl overflow-hidden h-[500px]">
              <img 
                src={house6Img} 
                alt="Built for Germany"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90"></div>
              
              <div className="relative h-full flex flex-col justify-between p-8">
                <div>
                  <div className="w-16 h-16 rounded-full border-4 border-pink-500 flex items-center justify-center mb-4 relative">
                    <Globe className="w-7 h-7 text-white" />
                    <div className="absolute -inset-3 border-2 border-dashed border-pink-400 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Built for Germany</h3>
                  <p className="text-gray-300 text-lg">Local rules, German/English support, real local understanding.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Spline Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 w-full h-full scale-125">
          <Spline
            scene="https://prod.spline.design/d7i6vdDweRKeKmhV/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* Reduced overlay for better visibility */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-8 drop-shadow-2xl">
            Ready to find your next home?
          </h2>
          <p className="text-xl font-light mb-12 text-white/90 drop-shadow-lg">
            Join thousands of verified users across Germany
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="bg-white text-black px-10 py-4 text-base font-medium hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2 shadow-2xl"
            >
              Browse Listings
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/create-listing"
              className="bg-transparent text-white px-10 py-4 text-base font-medium hover:bg-white/20 transition-all border border-white/80 backdrop-blur-sm shadow-xl"
            >
              List Your Place
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
            opacity: 0;
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
            opacity: 1;
          }
        }
        @keyframes scroll-down {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(12px);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
        @keyframes grid-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4rem);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-scroll-down {
          animation: scroll-down 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

function JourneySection() {
  const containerRef = React.useRef(null);
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      title: "Create your profile",
      desc: "Verify your identity with our secure manual screening process.",
      icon: Users,
      side: "left"
    },
    {
      title: "Browse or List",
      desc: "Find your perfect sublet or list your place to the entire city.",
      icon: HomeIcon,
      side: "right"
    },
    {
      title: "Connect safely",
      desc: "Chat with verified users through our secure in-app messaging.",
      icon: MessageSquare,
      side: "left"
    },
    {
      title: "Move in with confidence",
      desc: "Enjoy a scam-free subletting experience in Germany.",
      icon: CheckCircle,
      side: "right"
    }
  ];

  return (
    <section ref={containerRef} className="relative py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="text-4xl md:text-5xl font-light text-center mb-32 text-white"
        >
          The SubLease Journey
        </motion.h2>

        <div className="relative">
          {/* Vertical Path */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/10 rounded-full">
            <motion.div
              style={{height: pathHeight}}
              className="w-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </div>

          <div className="space-y-32">
            {steps.map((step, i) => (
              <JourneyStep key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyStep({step}) {
  const ref = React.useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [step.side === "left" ? -100 : 100, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <div ref={ref} 
    className={`relative flex items-center ${
      step.side === "left" ? "justify-start" : "justify-end"
      } md:px-12`}>
      {/* Dot on path */}
      <motion.div
        style={{scale: scrollYProgress}}
        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full z-20 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
      />

      <motion.div
        style={{x, opacity, scale}}
        className="w-full md:w-[45%] p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:bg-white/[0.05] transition-colors"
      >
        <div className="flex items-center gap-6 mb-6">
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <step.icon className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-light text-white">{step.title}</h3>
        </div>
        <p className="text-lg text-gray-400 font-light leading-relaxed">
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
}

function FeatureCard({feature}) {
  const ref = React.useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <motion.div
      ref={ref}
      style={{scale, opacity, y}}
      className="group relative rounded-[3rem] overflow-hidden h-[600px] border border-white/10 bg-neutral-900"
    >
      <motion.img
        style={{scale: imgScale}}
        src={feature.img}
        alt={feature.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 group-hover:via-black/60 transition-all duration-500"></div>

      <div className="relative h-full flex flex-col justify-between p-10">
        <div>
          <div className={`w-16 h-16 rounded-2xl border-2 border-${feature.color}-500/50 bg-${feature.color}-500/10 backdrop-blur-xl flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-500`}>
            <feature.icon className="w-8 h-8 text-white" />
            <div className={`absolute -inset-2 border border-dashed border-${feature.color}-400/30 rounded-2xl animate-spin-slow`}></div>
          </div>
        </div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{delay: 0.2}}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            {feature.title}
          </h3>
          <p className="text-base text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {feature.desc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}