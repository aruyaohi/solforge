import os
import requests
from dotenv import load_dotenv

# --- Groq API Setup ---
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")

if api_key is None:
    print("Error: GROQ_API_KEY environment variable not set. Please set it in your .env file or environment.")
    exit(1) # Exit if API key is missing

print("Groq API Key loaded.")

# write call function
def call_groq_llama3(prompt):
    url = "https://api.groq.com/openai/v1/chat/completions"


    headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"  
    }

# --- Groq API Interaction (Example: Get a joke from LLM) ---
    groq_payload = {
    "model": "llama-3.1-8b-instant", # Using llama-3.1 as it's the latest in Groq
    "messages": [
        {"role": "system", "content" : 
         ( "You're a solidity expert. Only return valid Solidity code."
            "Do not include any explanation. Use OpenZeppelin where needed."
            "Ensure the code compiles and includes comments. also make sure the code follows due regulations and good practice"                                
        )},
        {"role": "user", "content": prompt}
        ],
    "temperature": 0.2,
    }

    print("\n--- Sending request to Groq API ---")
    groq_response = requests.post(url, headers=headers, json=groq_payload)

    if groq_response.status_code == 200:
        groq_result = groq_response.json()
        llm_response_content = groq_result["choices"][0]["message"]["content"]
        print(f"LLM Response: {llm_response_content}")
    else:
        print(f"Error from Groq API: {groq_response.status_code} - {groq_response.text}")
        llm_response_content = "LLM interaction failed."

if __name__ == "__main__":
    user_input = "Write a smart contract for a basic ERC220 token named HackathonToken with 1 million supply."
    solidity_code = call_groq_llama3(user_input)
    print(solidity_code)
