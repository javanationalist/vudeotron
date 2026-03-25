/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Star, GraduationCap, Atom, FlaskConical, Calculator, Binary } from 'lucide-react';

// Mock data for winners
const WINNERS = [
  { id: 1, name: "Ahmad Fauzi", school: "SMA Negeri 1 Jakarta", category: "Matematika", medal: "Emas" },
  { id: 2, name: "Siti Aminah", school: "SMA Kristen 1 BPK Penabur", category: "Fisika", medal: "Emas" },
  { id: 3, name: "Budi Santoso", school: "SMA Negeri 3 Yogyakarta", category: "Kimia", medal: "Perak" },
  { id: 4, name: "Dewi Lestari", school: "SMA Negeri 5 Surabaya", category: "Biologi", medal: "Perak" },
  { id: 5, name: "Rizky Pratama", school: "SMA Taruna Nusantara", category: "Informatika", medal: "Perunggu" },
  { id: 6, name: "Lani Wijaya", school: "SMA Negeri 8 Jakarta", category: "Astronomi", medal: "Emas" },
];

const CATEGORIES = [
  { name: "Matematika", icon: <Calculator className="w-8 h-8" /> },
  { name: "Fisika", icon: <Atom className="w-8 h-8" /> },
  { name: "Kimia", icon: <FlaskConical className="w-8 h-8" /> },
  { name: "Biologi", icon: <Star className="w-8 h-8" /> },
  { name: "Informatika", icon: <Binary className="w-8 h-8" /> },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = WINNERS.length + 1; // +1 for the intro slide

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000); // Change slide every 8 seconds
    return () => clearInterval(timer);
  }, [totalSlides]);

  return (
    <div className="min-h-screen bg-[#050b1a] text-white overflow-hidden font-sans selection:bg-yellow-500 selection:text-black">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {currentSlide === 0 ? (
            <IntroSlide />
          ) : (
            <WinnerSlide winner={WINNERS[currentSlide - 1]} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Marquee */}
      <div className="absolute bottom-0 w-full bg-blue-950/80 backdrop-blur-md border-t border-yellow-500/30 py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center space-x-12 px-4">
              <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Selamat Kepada Para Pemenang</span>
              <span className="text-white/60">•</span>
              <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Olimpiade Sains Nasional 2026</span>
              <span className="text-white/60">•</span>
              <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Membangun Generasi Emas Indonesia</span>
              <span className="text-white/60">•</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

function IntroSlide() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center text-center px-6 md:px-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-6 md:mb-8"
      >
        <div className="relative inline-block">
          <Trophy className="w-20 h-20 md:w-32 md:h-32 text-yellow-500" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 md:-inset-4 border-2 border-dashed border-yellow-500/30 rounded-full"
          />
        </div>
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg md:text-2xl lg:text-3xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase text-yellow-500 mb-2 md:mb-4"
      >
        Malam Penganugerahan
      </motion.h2>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-tight md:leading-none mb-6 md:mb-8"
      >
        Olimpiade Sains <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600">
          Nasional 2026
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="grid grid-cols-3 sm:flex sm:space-x-8 gap-4 sm:gap-0 mt-8 md:mt-12"
      >
        {CATEGORIES.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-1 md:space-y-2 opacity-50">
            <div className="scale-75 md:scale-100">{cat.icon}</div>
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold">{cat.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function WinnerSlide({ winner }: { winner: typeof WINNERS[0] }) {
  const medalColor = winner.medal === "Emas" ? "text-yellow-400" : winner.medal === "Perak" ? "text-slate-300" : "text-amber-600";
  const medalBg = winner.medal === "Emas" ? "bg-yellow-400/10 border-yellow-400/30" : winner.medal === "Perak" ? "bg-slate-300/10 border-slate-300/30" : "bg-amber-600/10 border-amber-600/30";

  return (
    <div className="relative h-screen flex items-center justify-center px-6 md:px-20 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full max-w-7xl">
        {/* Left Side: Visual */}
        <div className="relative flex justify-center order-2 md:order-1">
          <motion.div
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className={`relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl md:rounded-3xl border-2 flex flex-col items-center justify-center ${medalBg} backdrop-blur-xl shadow-2xl shadow-yellow-500/10`}
          >
            <Medal className={`w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 ${medalColor} mb-2 md:mb-4`} />
            <span className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-widest ${medalColor}`}>
              {winner.medal}
            </span>
            
            {/* Decorative Stars */}
            <Star className="absolute top-4 left-4 md:top-6 md:left-6 w-4 h-4 md:w-6 md:h-6 text-yellow-500/40 animate-pulse" />
            <Star className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-6 h-6 md:w-8 md:h-8 text-yellow-500/40 animate-pulse delay-75" />
          </motion.div>
          
          {/* Background Glow */}
          <div className={`absolute inset-0 blur-[60px] md:blur-[100px] opacity-30 rounded-full ${winner.medal === "Emas" ? "bg-yellow-500" : "bg-slate-400"}`} />
        </div>

        {/* Right Side: Info */}
        <div className="flex flex-col space-y-4 md:space-y-6 text-center md:text-left items-center md:items-start order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center space-x-2 md:space-x-3 px-3 py-1.5 md:px-4 md:py-2 bg-blue-900/40 border border-blue-500/30 rounded-full w-fit"
          >
            <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
            <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-blue-300">Pemenang Kategori {winner.category}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
          >
            {winner.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg sm:text-2xl md:text-3xl text-white/70 font-light italic"
          >
            {winner.school}
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-1 w-24 md:w-32 bg-gradient-to-r from-yellow-500 to-transparent origin-center md:origin-left"
          />
        </div>
      </div>
    </div>
  );
}
