import os
import sys
from dotenv import load_dotenv
import requests
import json
import fileIndex

load_dotenv()

OLLAMA_URL = os.getenv("OLLAMA_URL")

file_system_index = json.dumps(fileIndex.index_from_directory(r"C:\Users\rbzom\OneDrive\Documents\TestData"), indent=2)
prompt = "i want to sort my files by program name, can you do this"


headers = {
    "content-type": "application/json"
}

data = {
    "model": "deepseek-r1:8b",
    "prompt": f"""
      You are an intelligent file system assistant. You have been provided with the current file system index in JSON format, which lists available files along with their names and extensions. Use this index as context when determining the actions required to fulfill the user's instruction.

        File system index:
        {file_system_index}

        User Instruction: "{prompt}"

        I want you to sort the current File system index, and return back a json file that has the contents organized.
        You are allowed to make new folders, and remove empty folders that contents are moved from.

        If the folder specified by the user is empty, we will want to 

        Provide only the updated JSON output.
    """,
    "stream": False
}

print(data)

response = requests.post(OLLAMA_URL,headers=headers, data=json.dumps(data))

if response.status_code == 200:
    print('response code = 200')
    response_text = response.text
    data = json.loads(response_text)
    actual_response = data["response"]
    print(actual_response)
else:
    print("error", response.status_code)
