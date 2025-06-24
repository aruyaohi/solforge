# 🔨 Solsmith

**Solsmith** is an AI-powered no-code platform that transforms natural language prompts into production-ready **Solana smart contracts**. It combines a powerful LLM backend (`solsmith-agent`) with a sleek, Monaco-powered in-browser IDE built using **Vite**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

- 🧠 **Prompt-to-Code Smart Contract Generation**  
  Generate secure Solana (Anchor-based) smart contracts from natural language prompts.

- ⚓ **Anchor Framework Compatibility**  
  All generated contracts follow Solana’s Anchor framework conventions.

- 🖥️ **Built-in Rust IDE**  
  Integrated Monaco editor with syntax highlighting, real-time editing, and code formatting.

- ⚡ **Modern UI Stack**  
  Built with Vite, React, Tailwind CSS, and TypeScript for optimal developer experience.

- 🧩 **Modular Architecture**  
  Clean separation between AI backend (`solsmith-agent`) and frontend UI (`UI/solsmith`).

---

## 💬 Example Prompts

> “Create a staking pool where users deposit SPL tokens and earn rewards over time.”  
> “Generate an SPL token mint contract with admin authority.”  
> “Build a vesting schedule for locked tokens using Anchor.”  

---

## 📁 Project Structure

solsmith/
├── solsmith-agent/ # 🧠 LLM-powered backend
│ ├── src/
│ │ └── solsmith/
│ │ └── main.py # Main entry point for backend logic
│ ├── Dockerfile # Dockerfile for backend container
│ ├── pyproject.toml # Poetry-managed Python dependencies
│ ├── poetry.lock # Lockfile for consistent installs
│ └── .env # (gitignored) Secrets like GROQ_API_KEY

├── UI/ # 🎨 Frontend container
│ └── solsmith/
│ ├── src/
│ │ ├── components/ # Shared React components
│ │ ├── pages/ # Route-based views
│ │ ├── assets/ # Static assets
│ │ └── main.tsx # Vite entry point
│ ├── public/ # Static HTML and assets
│ ├── tailwind.config.js # TailwindCSS config
│ ├── postcss.config.js # PostCSS config
│ ├── index.html # Main HTML template
│ ├── Dockerfile # Dockerfile for frontend
│ ├── tsconfig.json # TypeScript config
│ └── package.json # NPM dependencies and scripts

└── docker-compose.yml # 🔁 Optional: Dev orchestration for both containers

yaml
Copy
Edit

---

## 🚀 Getting Started

### 📦 Prerequisites

- Python 3.11+
- [Poetry](https://python-poetry.org/)
- Docker & Docker Compose
- Node.js (for frontend dev without Docker)

### 🐳 Running with Docker

```bash
docker compose up --build
This will build and run both the solsmith-agent backend and the UI/solsmith frontend containers.

🛣 Roadmap
🔊 Voice input for prompt-based contract generation

💡 Real-time contract linting and audit recommendations

🧪 Local Anchor testing & deployment simulation

📁 Contract history, versioning & export options

🪪 Web3 wallet integration for secure contract deployment

📜 License
MIT License

🙏 Acknowledgements
GROQ API

Anchor

[OpenAI API (optional fallback)]

Monaco Editor

👨‍💻 Author
Aruya Emmanuel
📧 omariontechnologies@gmail.com
🐙 GitHub: aruyaohi