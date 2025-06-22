from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph
from langgraph.graph.message import add_messages
from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI

# Load environment variable
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if api_key:
    print(api_key)

# Initialize LLM
llm = ChatOpenAI(api_key=api_key, model="gpt-4-13")

# Define state shape
class ChatState(TypedDict):
    messages: Annotated[list, add_messages]

# Define simple chat function
def simple_chat(state: ChatState) -> ChatState:
    # Upon research it has become aparent to me that docstrings are very important, so i'll add one.
    """This is a node that adds """
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

# Build the graph
builder = StateGraph(ChatState) # so basically here we are instantiating the state graph object.
builder.add_node("chat", simple_chat)
builder.set_entry_point("chat")
builder.set_finish_point("chat")
graph = builder.compile()

# Run it
if __name__ == "__main__":
    initial_state = {
        "messages": [{"role": "user", "content": "Hello! What is LangGraph?"}]
    }
    result = graph.invoke(initial_state)
    print(result["messages"][-1]["content"])
