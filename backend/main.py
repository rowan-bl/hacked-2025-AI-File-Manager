import os
import sys
from dotenv import load_dotenv
import requests
import json
import fileIndex

# get .env data
load_dotenv()

# map .env data to variables
OLLAMA_URL = os.getenv("OLLAMA_URL")
MODEL = os.getenv("MODEL")

# test prompt
file_system_index_raw = {"root":fileIndex.index_from_directory(r"C:\Users\rbzom\OneDrive\Documents\TestData")}
file_system_index = json.dumps(file_system_index_raw, indent=2)
count = fileIndex.count_files(file_system_index_raw)
prompt = "i want to sort my files by program name, can you do this"

headers = {
    "content-type": "application/json"
}

data = {
    "model": f"{MODEL}",
    "prompt": f""" You are an intelligent file system formatting assistant.
        You have been provided with the current file system index in JSON format, which lists available files along with their names and extensions.
         
        Use this index as context when determining the actions required to fulfill the user's instruction.

        File system index:
        <FileSystemIndex>
        {file_system_index}
        </FileSystemIndex>

        User Instruction: 
        <UserPrompt>
        "{prompt}"
        </UserPrompt>


        I want you to sort the current File system index, and return back a JSON file that has the contents organized.

        You are allowed to make new folders, and remove empty folders that contents are moved from

        Ensure all original files are contained in the updated JSON output.
        ENSURE THE TOTAL FINAL COUNT OF THE NUMBER OF FILES IS {count}, I KNOW THIS IS 100% CORRECT AND IF THIS ISNT MET 50% OF MY EMPLOYEES WILL BE FIRED !!

        In your response, I want you provide the updated JSON output, which should be contained in a <answer> xml tag.
        I would also like a very short summary of what we have done, this should be the changes we have made to the file tree, so we can send it back to the user in a <description> xml tag.

        ENSURE THE FINAL OUTPUT FOLLOWS THE FOLLOWING FORMAT OTHERWISE 50% OF MY EMPLOYEES WILL BE FIRED!!!!:
        <answer>
        {{
            "root": {{
                "(folder name)": {{
                "files": [
                   (files listed here)
                ]
                }}
            }}
        }}
        </answer>

        <description>
        (put description here)
        </description>
    """,
    "options": {  
            "temperature": 0, # remove creativity so it gives a consistient output
            "seed": 42 # set seed to remove variance (aim is to help limit the amount of halucinations)
        },
    "stream": False
}

print(data)

response = requests.post(OLLAMA_URL, headers=headers, data=json.dumps(data))

# error testing for the response (will need to refactor to tell us if we are able to connect to our response yet)
if response.status_code == 200:
    print('response code = 200')
    response_text = response.text
    data = json.loads(response_text)
    actual_response = data["response"]
    print(actual_response)
else:
    print("error", response.status_code)
