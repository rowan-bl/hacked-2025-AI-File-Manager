import os
import sys
from dotenv import load_dotenv
import requests
import json
import fileIndex

load_dotenv()

OLLAMA_URL = os.getenv("OLLAMA_URL")

print(OLLAMA_URL)
print(json.dumps(fileIndex.index_from_directory(r"C:\Users\rbzom\OneDrive\Documents\My Games"), indent=2))

headers = {
    "content-type": "application/json"
}

data = {
    "model": "deepseek-r1:8b",
    "prompt": "Why is the sky blue",
    "stream": False
}
response = requests.post(OLLAMA_URL,headers=headers, data=json.dumps(data))

if response.status_code == 200:
    print('response code = 200')
    response_text = response.text
    data = json.loads(response_text)
    actual_response = data["response"]
    print(actual_response)
else:
    print("error", response.status_code)
