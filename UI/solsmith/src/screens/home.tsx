import React, { useState, useEffect } from 'react';
import { Code, Zap, Shield, Rocket, ChevronRight, Sparkles, Terminal, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Home() {
   const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard'); // Navigate to the dashboard page
  };
  const [isVisible, setIsVisible] = useState(false);
  const [codeText, setCodeText] = useState('');
  const [currentFeature, setCurrentFeature] = useState(0);

  const fullCode = `pub struct CreateToken {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
}`;

  const features = [
    { icon: Bot, title: "AI-Powered", desc: "Natural language to smart contracts" },
    { icon: Zap, title: "Lightning Fast", desc: "Generate contracts in seconds" },
    { icon: Shield, title: "Secure", desc: "Battle-tested code patterns" },
    { icon: Rocket, title: "Deploy Ready", desc: "Optimized for Solana mainnet" }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Typewriter effect
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullCode.length) {
        setCodeText(fullCode.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    // Feature rotation
    const featureInterval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 3000);

    return () => {
      clearInterval(typeInterval);
      clearInterval(featureInterval);
    };
  }, []);

  return (
    <div className="min-h-screen text-gray-100 w-full overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 w-full bg-gray-850">
        <div className="max-w-full mx-auto  sm:px-6 lg:px-20">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-orange-400">
                SolSmith
              </span>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 w-full">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-20 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-[#151515d1] border border-gray-600 rounded-full px-4 py-2 text-sm">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-300">Smart Contract Forge Powered by AI</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="text-white">
                    Forge Solana
                  </span>
                  <br />
                  <span className="text-orange-400">
                    Smart Contracts
                  </span>
                  <br />
                  <span className="text-white">
                    with AI
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Transform natural language prompts into production-ready Solana smart contracts. 
                  SolSmith is your AI-powered forge for crafting secure, optimized blockchain code.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-semibold transition-colors flex items-center justify-center space-x-2">
                  <span>Start Building</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                onClick={handleClick}
                className="px-8 py-4 rounded-md border border-gray-600 hover:border-orange-400 hover:bg-gray-700 transition-all flex items-center justify-center space-x-2">
                  <Terminal className="w-5 h-5" />
                  <span>View Demo</span>
                </button>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg bg-gray-750 border transition-all duration-500 ${
                      currentFeature === index 
                        ? 'border-orange-400 text-orange-400 shadow-lg shadow-orange-400/10' 
                        : 'border-gray-600 text-gray-300'
                    }`}
                  >
                    <feature.icon className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">{feature.title}</div>
                      <div className="text-sm opacity-75">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Preview */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/10 rounded-lg blur-xl"></div>
                <div className="relative bg-[#151515] border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-850 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-400 text-sm">contract.rs</span>
                    <div className="w-16"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="text-gray-500 text-sm font-mono">// Generated from: "Create a token with name and symbol"</div>
                      <pre className="text-green-400 font-mono text-sm leading-relaxed">
                        <code>{codeText}</code>
                        <span className="animate-pulse text-orange-400">|</span>
                      </pre>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span>Security validated</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Zap className="w-4 h-4 text-orange-400" />
                        <span>Deploy ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-20">
        <button className="bg-orange-500 hover:bg-orange-600 p-4 rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all transform hover:scale-110 group">
          <Code className="w-6 h-6 group-hover:rotate-12 transition-transform text-white" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}