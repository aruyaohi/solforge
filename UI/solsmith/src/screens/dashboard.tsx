import React, { useState } from 'react';
import { 
  Code, 
  Bot, 
  Home,
  Trophy, 
  Book, 
  Users, 
  Settings,
  Send,
  Sparkles,
  Copy,
  Download,
  Rocket
} from 'lucide-react';

interface SidebarItem {
  icon: React.ComponentType<{className?: string}>;
  label: string;
  id: string;
}

export default function Dashboard() {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [conversations, setConversations] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const sidebarItems: SidebarItem[] = [
    { icon: Code, label: 'Agent', id: 'contracts' },
    { icon: Book, label: 'Auditor', id: 'audit' },
    { icon: Rocket, label: 'Deploy', id: 'deployment' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  const handleSubmit = () => {
    if (prompt.trim()) {
      const userMessage: {type: 'user' | 'ai', content: string} = { type: 'user', content: prompt };
      setConversations(prev => [...prev, userMessage]);
      setIsGenerating(true);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: {type: 'user' | 'ai', content: string} = {
          type: 'ai',
          content: `// Solana Smart Contract Generated
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod ${prompt.toLowerCase().replace(/\s+/g, '_')}_contract {
    use super::*;
    
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let contract = &mut ctx.accounts.contract;
        contract.authority = ctx.accounts.authority.key();
        contract.bump = *ctx.bumps.get("contract").unwrap();
        
        msg!("Contract initialized successfully!");
        Ok(())
    }
    
    pub fn execute_function(ctx: Context<ExecuteFunction>) -> Result<()> {
        // Your custom logic here based on: "${prompt}"
        
        msg!("Function executed successfully!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 1,
        seeds = [b"contract"],
        bump
    )]
    pub contract: Account<'info, ContractState>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ExecuteFunction<'info> {
    #[account(
        mut,
        seeds = [b"contract"],
        bump = contract.bump,
        has_one = authority
    )]
    pub contract: Account<'info, ContractState>,
    
    pub authority: Signer<'info>,
}

#[account]
pub struct ContractState {
    pub authority: Pubkey,
    pub bump: u8,
}`
        };
        
        setConversations(prev => [...prev, aiResponse]);
        setIsGenerating(false);
      }, 2000);
      
      setPrompt('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen w-full text-gray-100 flex">
      {/* Sidebar */}
      <div className="group fixed left-0 top-0 h-full w-16 lg:w-16 lg:hover:w-64 backdrop-blur-sm border-r border-gray-700/50 flex flex-col transition-all duration-300 ease-in-out z-50">
        {/* Logo */}
        <div className="p-4 lg:group-hover:p-6 border-b border-[#171717] transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-gray-300 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              SolSmith
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 lg:group-hover:p-4 transition-all duration-300">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-3 py-3 lg:group-hover:px-4 rounded-xl text-gray-300 hover:bg-[#171717] hover:text-orange-400 transition-all duration-200 group/item relative"
                  title={item.label}
                >
                  <item.icon className="w-5 h-5 group-hover/item:scale-110 transition-transform flex-shrink-0" />
                  <span className="opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {item.label}
                  </span>
                  {/* Tooltip for collapsed state */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 lg:group-hover:hidden group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-16 flex flex-col min-h-screen w-4xl mx-auto">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {conversations.length === 0 ? (
              <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Welcome to SolSmith AI
                  </h3>
                  <p className="text-gray-400">
                    Describe your smart contract idea and I'll generate professional Solana code for you.
                  </p>
                </div>
              </div>
            ) : (
              conversations.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-4xl ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-3 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.type === 'user' 
                          ? 'bg-orange-500' 
                          : 'bg-gradient-to-r from-orange-500 to-red-500'
                      }`}>
                        {msg.type === 'user' ? (
                          <span className="text-white font-semibold text-sm">JD</span>
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl p-4 ${
                        msg.type === 'user' 
                          ? 'text-white' 
                          : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'
                      }`}>
                        {msg.type === 'user' ? (
                          <p className="text-white">{msg.content}</p>
                        ) : (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-gray-400">Generated Smart Contract</span>
                              <div className="flex space-x-2">
                                <button className="p-1 text-gray-400 hover:text-orange-400 transition-colors rounded hover:bg-gray-700/50">
                                  <Copy className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-orange-400 transition-colors rounded hover:bg-gray-700/50">
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="rounded-lg p-4 border border-gray-700/50">
                              <pre className="text-sm text-gray-300 overflow-x-auto">
                                <code>{msg.content}</code>
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {isGenerating && (
              <div className="flex justify-start">
                <div className="max-w-4xl">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-gray-400 text-sm">Generating your smart contract...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your smart contract... (e.g., 'Create a token with minting and burning capabilities')"
                  className="w-full backdrop-blur-sm border border-gray-600/50 rounded-2xl px-6 py-4 pr-16 text-white placeholder-gray-400 focus:border-orange-400/50 focus:outline-none focus:ring-2 focus:ring-orange-400/20 resize-none transition-all duration-200"
                  rows={3}
                  disabled={isGenerating}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || isGenerating}
                  className="absolute right-3 bottom-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{prompt.length}/2000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}