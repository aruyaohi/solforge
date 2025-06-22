# 🚗 autopilot-agent

A self-driving car agent simulator that explores how large language models (LLMs), specifically OpenAI’s GPT models, can be leveraged to take agentic actions in the context of autonomous driving.

---

## 🧠 What is autopilot-agent?

`autopilot-agent` is an AI agent simulation project that showcases how LLMs can guide self-driving car behavior through natural language commands and contextual reasoning. The agent can understand instructions like:

- “Follow the red car in front.”
- “Drive to the nearest McDonald's so I can grab a bite.”
- “Place an order for pizza as we head home and ensure it's delivered in 5 minutes.”

Future versions will expand on this to support even more personalized, multi-step actions during simulated drives.

This project is ideal for developers and AI enthusiasts looking to explore AI agents and autonomous vehicle simulations.

---

## ⚙️ Technologies & Packages Used

- Python 3.11
- [LangGraph](https://github.com/langchain-ai/langgraph)
- [LangChain](https://www.langchain.com/)
- [LangChain OpenAI](https://github.com/langchain-ai/langchain/tree/master/libs/langchain-openai)
- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [Waymo Waymax](https://github.com/waymo-research/waymax) – for car simulation
- Python Dotenv
- Docker + Docker Compose
- Poetry (for dependency and environment management)

---

## 📁 Project 

autopilot-agent/
│
├── src/
│ └── autopilot/
│ └── main.py # Main entry point
│
├── .env # Environment variables
├── pyproject.toml # Poetry config
├── Dockerfile
├── docker-compose.yml
└── README.md


### Prerequisites

- Python 3.11+
- [Poetry](https://python-poetry.org/)
- Docker & Docker Compose

### Running the App

To build and start the containerized app:

```bash
docker compose up --build



# Features
🔄 Natural language-based driving commands

🚘 Integration with Waymo’s waymax for realistic car simulation

🧠 Use of LLMs for reasoning and decision-making

🧩 Agentic design using LangGraph and LangChain

⚙️ Modular backend structure for future extensibility

# 🛠️ Future Plans
Add voice interface for real-time command input

Build a frontend dashboard to visualize car movements

Add more complex decision-making scenarios

Integrate map APIs for real-world routing

📜 License
MIT License

🙏 Acknowledgements
OpenAI

Waymo Research

LangChain & LangGraph

🧑‍💻 Author
Aruya Emmanuel
✉️ omariontechnologies@gmail.com
<<<<<<< HEAD
🐙 GitHub: aruyaohi
=======
🐙 GitHub <!-- Replace with actual username -->
>>>>>>> 8bc85336114456fd71599d2c4b121e45ea708fec
