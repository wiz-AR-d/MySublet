import React from "react";
import {Link} from "react-router-dom";
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

export default function Landing() {

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
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
          <source src="/src/assets/videos/landing_page.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
          {/* Logo */}
          <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="flex items-center space-x-3 mb-12"
          >
            <HomeIcon className="h-10 w-10 text-white" />
            <h1 className="text-3xl font-light tracking-wide">SubLease</h1>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-center mb-8 max-w-5xl leading-tight"
          >
            Sublease from real people
            <br />
            <span className="text-blue-500">with confidence</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.4}}
            className="text-lg md:text-xl text-center mb-16 text-white/90 font-light max-w-2xl"
          >
            The safest way to sublease in Germany. Verified, trusted, and scam-free.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.6}}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link
              to="/listings"
              className="group bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-blue-500 transition-all flex items-center gap-3 shadow-2xl shadow-blue-600/20 hover:scale-105 active:scale-95"
            >
              Find your home
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/create-listing"
              className="bg-white/5 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all border border-white/10 backdrop-blur-xl hover:scale-105 active:scale-95"
            >
              List your place
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{y: [0, 10, 0]}}
          transition={{duration: 2, repeat: Infinity}}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/40 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Why SubLease Section */}
      <section className="relative py-32 bg-black text-white overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              className="text-4xl md:text-5xl font-light mb-8 text-white"
            >
              Why SubLease?
            </motion.h2>
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              className="text-xl md:text-2xl font-light text-white mb-12 leading-relaxed"
            >
              Real People. Verified. Zero Stress. City-wide reach.
            </motion.div>

            <div className="mt-12 text-left space-y-6 text-lg text-gray-300 leading-relaxed">
              <motion.p
                initial={{opacity: 0, x: -20}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
              >
                Finding a safe sublet in Germany is usually a mess — small
                WhatsApp groups, building chats, university groups, Facebook
                chaos, and endless "Is this still available?" messages.
              </motion.p>
              <motion.p
                initial={{opacity: 0, x: -20}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{delay: 0.2}}
                className="font-light text-white text-xl"
              >
                SubLease changes everything.
              </motion.p>
              <motion.p
                initial={{opacity: 0, x: -20}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{delay: 0.4}}
              >
                Instead of limiting your search to your dorm, your building, or
                a tiny community group…
                <br />
                <span className="font-light text-blue-500 text-xl mt-4 block">
                  👉 we connect you with the entire city
                </span>
              </motion.p>

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
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <JourneySection />

      {/* Key Benefits Section */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <motion.h2
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              className="text-4xl md:text-5xl font-light mb-6 text-white"
            >
              Key Benefits
            </motion.h2>
            <motion.p
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0.2}}
              className="text-lg text-gray-400 font-light"
            >
              Everything you need for stress-free subletting
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "City-Wide Reach",
                desc: "Stop limiting your search to small groups. Your listing reaches the entire city instantly.",
                items: ["List once, city sees it", "10x faster matches", "No more ping-pong messaging"],
                color: "orange"
              },
              {
                icon: Shield,
                title: "100% Verified Users",
                desc: "Manual ID verification for every user. Zero scammers, zero fake profiles.",
                items: ["No anonymous profiles", "No scam listings", "No fake landlords"],
                color: "blue"
              },
              {
                icon: CheckCircle,
                title: "Safe & Legal",
                desc: "All listings comply with German subletting regulations.",
                items: ["Landlord permission verified", "Anmeldung information", "Clear rental conditions"],
                color: "green"
              },
              {
                icon: Users,
                title: "Built for You",
                desc: "Perfect for students, expats, interns, and short-term renters across Germany.",
                items: ["Erasmus students", "Young professionals", "Interns", "Digital nomads"],
                color: "purple"
              },
              {
                icon: Search,
                title: "Smart Search",
                desc: "Search across major German cities with powerful filters.",
                items: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
                color: "pink"
              },
              {
                icon: Lock,
                title: "Verified Listings",
                desc: "Manual screening removes suspicious prices, fake photos, and scam patterns.",
                items: ["Manual screening", "Scam detection", "Safety first"],
                color: "indigo"
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: 0.1 * i}}
                className="group p-8 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500"
              >
                <div className={`w-14 h-14 mb-8 flex items-center justify-center rounded-2xl bg-${benefit.color}-500/10 border border-${benefit.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                  <benefit.icon className={`w-7 h-7 text-${benefit.color}-400`} />
                </div>
                <h3 className="text-xl font-light text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-base text-gray-400 mb-8 leading-relaxed font-light">
                  {benefit.desc}
                </p>
                <div className="space-y-3">
                  {benefit.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm text-gray-300 font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section - ADVANCED ANIMATION */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-4xl md:text-5xl font-light text-center mb-24 text-white"
          >
            Advanced Features
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                img: "/src/assets/images/house1.jpg",
                title: "Mandatory Manual Verification",
                desc: "Every user is verified → zero scammers.",
                icon: Shield,
                color: "orange"
              },
              {
                img: "/src/assets/images/house2.jpg",
                title: "Verified City-Wide Listings",
                desc: "Don't limit yourself to your building group — reach the entire city.",
                icon: HomeIcon,
                color: "cyan"
              },
              {
                img: "/src/assets/images/house3.jpg",
                title: "Smart Filters",
                desc: "Find matching sublets quickly without messaging 50 people.",
                icon: Filter,
                color: "green"
              }
            ].map((feature, i) => {
              // Create unique scroll progress for each card
              return (
                <FeatureCard key={i} feature={feature} index={i} />
              );
            })}
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
        <div className="absolute inset-0 bg-black/40 pointer-events-none backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{opacity: 0, scale: 0.9}}
            whileInView={{opacity: 1, scale: 1}}
            viewport={{once: true}}
            className="text-4xl md:text-5xl font-light mb-8 drop-shadow-2xl"
          >
            Ready to find your <span className="text-blue-500">next home?</span>
          </motion.h2>
          <motion.p
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: 0.2}}
            className="text-lg font-light mb-12 text-white/90 drop-shadow-lg"
          >
            Join thousands of verified users across Germany
          </motion.p>
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: 0.4}}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/listings"
              className="bg-blue-600 text-white px-12 py-5 rounded-2xl text-lg font-black hover:bg-blue-500 transition-all inline-flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/40 hover:scale-105 active:scale-95"
            >
              Browse Listings
              <ArrowRight className="h-6 w-6" />
            </Link>
            <Link
              to="/create-listing"
              className="bg-white/5 text-white px-12 py-5 rounded-2xl text-lg font-black hover:bg-white/10 transition-all border border-white/10 backdrop-blur-xl shadow-xl hover:scale-105 active:scale-95"
            >
              List Your Place
            </Link>
          </motion.div>
        </div>
      </section>
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
    <div ref={ref} className={`relative flex items-center ${step.side === "left" ? "justify-start" : "justify-end"} md:px-12`}>
      {/* Dot on path */}
      <motion.div
        style={{scale: scrollYProgress}}
        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full z-20 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
      />

      <motion.div
        style={{x, opacity, scale}}
        className={`w-full md:w-[45%] p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:bg-white/[0.05] transition-colors`}
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