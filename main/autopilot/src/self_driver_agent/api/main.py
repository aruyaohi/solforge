# # from langchain_huggingface import ChatHuggingFace
# # from langchain_community.llms import HuggingFaceHub
# # from dotenv import load_dotenv
# # import os

# # # Load .env file
# # load_dotenv()
# # hf_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")

# # # Create Hugging Face LLM client using the new param name
# # llm = ChatHuggingFace(
# #     llm="meta-llama/Meta-Llama-3-8B-Instruct",  # ✅ this is required
# #     huggingfacehub_api_token=hf_token,
# #     model_kwargs={"temperature": 0.6}
# # )

# # response = llm.invoke("How do I get to Ikeja mall from Yaba?")
# # print(response)
# from langchain_huggingface import HuggingFaceEndpoint
# from langchain_community.llms import HuggingFaceHub  # ✅ REQUIRED
# from dotenv import load_dotenv
# load_dotenv()
# import os

# llm = HuggingFaceEndpoint(
#     repo_id="meta-llama/Llama-3.1-8B",
#     task="text-generation",
#     huggingfacehub_api_token=os.getenv("HUGGINGFACEHUB_API_TOKEN"),  # ✅ Token required
#     temperature= 0.6
# )

# response = llm.invoke("What do you call a person who works on humans in the hospital?")
# print(response)
from langgraph.prebuilt import create_react_agent
from langchain.tools import tool
from langchain_huggingface import HuggingFaceEndpoint,ChatHuggingFace
from dotenv import load_dotenv
import os

# Load your Hugging Face API key
load_dotenv()
HF_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")

# Set up the LLaMA 3 LLM via Hugging Face
hr_llm = HuggingFaceEndpoint(
    repo_id="meta-llama/Meta-Llama-3-8B-Instruct",
    task="text-generation",
    huggingfacehub_api_token=HF_TOKEN,
    temperature=0.6,
)

chat =  ChatHuggingFace(llm=hr_llm)
# === Define agent tools ===
@tool
def plan_route(destination: str) -> str:
    """Plans a route to the given destination."""
    return f"Calculating route to {destination}..."

@tool
def find_mcdonalds_along_route() -> str:
    """Finds a McDonald's along the route to the destination."""
    return "Found a McDonald's 2km before destination. Adding stop."

@tool
def drive_now() -> str:
    """Starts the self-driving car."""
    return "🚗 Starting drive..."


# === Create LangGraph agent ===
agent = create_react_agent(
    model=hr_llm,
    tools=[plan_route, find_mcdonalds_along_route, drive_now],
    prompt="You are a smart driving assistant for a self-driving car. Interpret user instructions and decide how to act using tools."
)

# === Run Agent ===
result = agent.invoke({
    "messages": [
        {"role": "user", "content": "Take me from Yaba to Ikeja Mall but stop at the nearest McDonald's first."}
    ]
})

print(result)
