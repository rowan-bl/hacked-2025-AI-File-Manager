import os
import sys
from dotenv import load_dotenv
import requests
import json
import fileIndex
import re
import asyncio
import websockets

# get .env data
load_dotenv()

# map .env data to variables
OLLAMA_URL = os.getenv("OLLAMA_URL")
MODEL = os.getenv("MODEL")

#setup websocket
async def handle_websocket(websocket):
    print(f"Connected: {websocket.remote_address}")
    organized_data = None

    try:
        while True:
            message = await websocket.recv()

            print("Received message:", message)
            try:
                inc_data = json.loads(message)

                # data to use in prompt
                prompt = inc_data.get("prompt", "")
                root_dir = inc_data .get("root_dir", "")
                if not root_dir or not os.path.isdir(root_dir):
                    error_resp = {"error": f"Path does not exist or is invalid: '{root_dir}'"}
                    await websocket.send(json.dumps(error_resp))
                    return
                
            except json.JSONDecodeError:
                error_resp = {"error": "Invalid JSON format."}
                await websocket.send(json.dumps(error_resp))
                continue

            # prepare message
            file_system_index_raw = fileIndex.index_from_directory(root_dir)
            file_system_index = json.dumps(file_system_index_raw)
            count = fileIndex.count_files(file_system_index_raw)

            headers = {
                "content-type": "application/json"
            }

            data = {
                "model": f"{MODEL}",
                "prompt": f""" You are an intelligent file system formatting assistant.
                    You have been provided with the current file system index in JSON format, here is the layout of the file system you will recieve:
                    {{
                            "(folder name)": {{ 
                            "files": [
                            {{"name": "(file name)", "extension": "(file extension with .)"}}
                            ]
                            }}
                    }}
                    
                    Use this index as context when determining the actions required to fulfill the user's instruction.

                    File system index:
                    <FileSystemIndex>
                    {file_system_index}
                    </FileSystemIndex>

                    User Instruction: 
                    <UserPrompt>
                    "{prompt}"
                    </UserPrompt>

                    I want you to break down the user prompt into a "action" which then can be used to sort the current File system index, and return back a JSON file that has the contents organized.

                    You are allowed to make new folders.

                    Ensure all original files are contained in the updated JSON output, I KNOW THIS IS 100% CORRECT AND IF THIS ISNT MET 50% OF MY EMPLOYEES WILL BE FIRED !!
                    
                    ENSURE THE TOTAL FINAL COUNT OF THE NUMBER OF FILES IS {count}, I KNOW THIS IS 100% CORRECT AND IF THIS ISNT MET 50% OF MY EMPLOYEES WILL BE FIRED !!

                    In your response, I want you provide the updated JSON output, which should be contained in a <answer> xml tag.
                    I would also like a very short summary of what we have done, this should be the changes we have made to the file tree, so we can send it back to the user in a <description> xml tag.

                    ENSURE THE FINAL OUTPUT FOLLOWS THE FOLLOWING FORMAT OTHERWISE 50% OF MY EMPLOYEES WILL BE FIRED!!!!:
                    <answer>
                    {{
                            "(folder name)": {{
                            "files": [
                            {{"name": "(file name)", "extension": "(file extension with .)"}}
                            ]
                            }}
                    }}
                    </answer>

                    <description>
                    (put description here)
                    </description>
                """,
                "options": {  
                        "temperature": 0, # remove creativity so it gives a consistient output
                        "seed": 42, # set seed to remove variance (aim is to help limit the amount of halucinations)
                        "num_ctx": 4048
                    },
                "stream": False
            }

            print(data)

            try:
                response = requests.post(OLLAMA_URL, headers=headers, data=json.dumps(data))
                response.raise_for_status()
                
            except Exception as e:
                # If DeepSeek call fails, notify the frontend
                error_message = {"error": f"DeepSeek request failed: {str(e)}"}
                await websocket.send(json.dumps(error_message))
                continue
            
            response = response.json()
            print(response)
            
            raw_output = response.get("response", "")

            answer_start = raw_output.find("<answer>")
            answer_end = raw_output.find("</answer>")
            description_start = raw_output.find("<description>")
            description_end = raw_output.find("</description>")

            json_output = raw_output[answer_start + len("<answer>") : answer_end].strip()
            description_output = raw_output[description_start + len("<description>") : description_end].strip()

            try:
                organized_data = json.loads(json_output)
                print(json_output, type(json_output)) #string type
                print(organized_data, type(organized_data)) #dict type
            except json.JSONDecodeError as e:
                print("error decoding json", e)

            output_data = {
                "answer": organized_data,
                "description": description_output
            }

            await websocket.send(json.dumps(output_data))
            print("Sent response to frontend:", output_data)

            fileIndex.move_files(organized_data, root_dir, root_dir)
        
    except websockets.ConnectionClosed:
        # The client disconnected
        print("Client disconnected:", websocket.remote_address)

    

# test prompt
# root_path = r"C:\Users\rbzom\OneDrive\Documents\TestData"
# file_system_index_raw = {"root":fileIndex.index_from_directory(root_path)}
# file_system_index = json.dumps(file_system_index_raw, indent=2)
# count = fileIndex.count_files(file_system_index_raw)
# prompt = "organize each program number into seperate folders"




# test prompt






# headers = {
#     "content-type": "application/json"
# }

# data = {
#     "model": f"{MODEL}",
#     "prompt": f""" You are an intelligent file system formatting assistant.
#         You have been provided with the current file system index in JSON format, here is the layout of the file system you will recieve:
#         {{
#             "root": {{
#                 "(folder name)": {{ 
#                 "files": [
#                    {{"name": "(file name)", "extension": "(file extension with .)"}}
#                 ]
#                 }}
#             }}
#         }}

         
#         Use this index as context when determining the actions required to fulfill the user's instruction.

#         File system index:
#         <FileSystemIndex>
#         {file_system_index}
#         </FileSystemIndex>

#         User Instruction: 
#         <UserPrompt>
#         "{prompt}"
#         </UserPrompt>

#         I want you to break down the user prompt into a "action" which then can be used to sort the current File system index, and return back a JSON file that has the contents organized.

#         You are allowed to make new folders.

#         Ensure all original files are contained in the updated JSON output, I KNOW THIS IS 100% CORRECT AND IF THIS ISNT MET 50% OF MY EMPLOYEES WILL BE FIRED !!
        
#         ENSURE THE TOTAL FINAL COUNT OF THE NUMBER OF FILES IS {count}, I KNOW THIS IS 100% CORRECT AND IF THIS ISNT MET 50% OF MY EMPLOYEES WILL BE FIRED !!

#         In your response, I want you provide the updated JSON output, which should be contained in a <answer> xml tag.
#         I would also like a very short summary of what we have done, this should be the changes we have made to the file tree, so we can send it back to the user in a <description> xml tag.


#         ENSURE THE FINAL OUTPUT FOLLOWS THE FOLLOWING FORMAT OTHERWISE 50% OF MY EMPLOYEES WILL BE FIRED!!!!:
#         <answer>
#         {{
#             "root": {{
#                 "(folder name)": {{
#                 "files": [
#                    {{"name": "(file name)", "extension": "(file extension with .)"}}
#                 ]
#                 }}
#             }}
#         }}
#         </answer>


#         <description>
#         (put description here)
#         </description>
#     """,
#     "options": {  
#             "temperature": 0, # remove creativity so it gives a consistient output
#             "seed": 42, # set seed to remove variance (aim is to help limit the amount of halucinations)
#             "num_ctx": 4048
#         },
#     "stream": False
# }

# print(data)

# response = requests.post(OLLAMA_URL, headers=headers, data=json.dumps(data))

# error testing for the response (will need to refactor for frontend later)
# if response.status_code == 200:
#     response = response.json()
#     raw_output = response.get("response", "")

#     answer_start = raw_output.find("<answer>")
#     answer_end = raw_output.find("</answer>")
#     description_start = raw_output.find("<description>")
#     description_end = raw_output.find("</description>")

#     json_output = raw_output[answer_start + len("<answer>") : answer_end].strip()
#     description_output = raw_output[description_start + len("<description>") : description_end].strip()
#     try:
#         organized_data = json.loads(json_output)
#         print(json_output, type(json_output)) #string type
#         print(organized_data, type(organized_data)) #dict type
#     except json.JSONDecodeError as e:
#         print("error decoding json", e)

#     print(description_output, type(description_output)) #string
# else:
#     print("error", response.status_code)



# # Send description to the front end # description_output


async def main():
    # websockets.serve(func, host, port) => returns a server awaitable
    async with websockets.serve(handle_websocket, "localhost", 8001):
        print("WebSocket server listening on ws://localhost:8001")
        # Keep running until manually stopped
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())


