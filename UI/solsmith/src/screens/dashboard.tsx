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
  Rocket,
  ChevronDown,
  Search,
  Star,
  Zap
} from 'lucide-react';

interface SidebarItem {
  icon: React.ComponentType<{className?: string}>;
  label: string;
  id: string;
  info: string;
}

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Fundamentals' | 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  description: string;
  points: number;
}

export default function Dashboard() {
  const [prompt, setPrompt] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Solana');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Fundamentals');
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const sidebarItems: SidebarItem[] = [
    { icon: Code, label: 'Agent', id: 'contracts', info: "Generate smart contracts on the fly with prompts" },
    { icon: Book, label: 'Auditor', id: 'audit', info: "Audit smart contracts using up-to-date models" },
    { icon: Rocket, label: 'Deploy', id: 'deployment', info: "Manage deployment and deployed contracts" },
    { icon: Settings, label: 'Settings', id: 'settings', info: "Manage app preferences" },
  ];


  const handleSubmit = () => {
    if (prompt.trim()) {
      const userMessage = { type: 'user' as const, content: prompt };
      setConversations(prev => [...prev, userMessage]);
      setIsGenerating(true);
      
      setTimeout(() => {
        const aiResponse = {
          type: 'ai' as const,
          content: `// ${selectedLanguage} Smart Contract Generated
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
        // Custom logic for: "${prompt}"
        // Difficulty: ${selectedDifficulty}
        
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
      <div className="group fixed left-0 top-0 h-full w-16 lg:w-16 bg-[#1a1a1a] border-r border-gray-700/30 flex flex-col transition-all duration-300 z-50">
        <div className="p-4 border-b border-gray-700/30 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 transition-all duration-300">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-300 hover:bg-[#1a1a1a]/50 hover:text-red-400 transition-all duration-200 group/item relative"
                  title={item.label}
                >
                  <item.icon className="w-5 h-5 group-hover/item:scale-110 transition-transform flex-shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-16 flex-1 flex">
      </div>
    </div>
  );
}