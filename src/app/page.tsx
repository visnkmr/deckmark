"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [heroText, setHeroText] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const tabId = sessionStorage.getItem("tabId") || 
                  Date.now().toString() + Math.random().toString(36).substring(2);
    sessionStorage.setItem("tabId", tabId);
    
    const saved = localStorage.getItem(`hero-${tabId}`);
    if (saved) {
      setHeroText(saved);
      setTimeout(() => {
        document.title = saved;
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (heroText) {
      const tabId = sessionStorage.getItem("tabId");
      if (tabId) {
        localStorage.setItem(`hero-${tabId}`, heroText);
      }
      setTimeout(() => {
        document.title = heroText;
      }, 50);
    }
  }, [heroText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setHeroText(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <>
      <Head>
        <title>{heroText || "Hero Name"}</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
        <div className="text-center max-w-4xl w-full">
          {heroText ? (
            <div className="space-y-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-tight animate-pulse">
                {heroText}
              </h1>
              <form onSubmit={handleSubmit} className="mt-12">
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter a new name..."
                    className="flex-1 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full bg-white text-purple-900 font-semibold hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <h2 className="text-3xl md:text-4xl text-white/80 font-light">
                Enter your hero name
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your name..."
                  className="flex-1 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-white text-purple-900 font-semibold hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  Create Hero
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
