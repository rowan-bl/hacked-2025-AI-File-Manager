# AI-File-Manager

## Overview
This **File Sorting Application** is a flexible, user friendly tool designed to organize your files in a directory tree of your choice based on custom text instructions from the user. The tool prompts you to select a file directory and provide sorting instructions, it then sends your folder tree structure to an LLM (Large Language Model) of your choice and pulls the files matching your sorting instructions and organizes them into new folders in the directory you initially provided after the LLM has determined the files that match your request.

---

## Features
- **Custom Sorting Instructions**: The user provides exactly how they want their files sorted and what type of files they want sorted
- **User-Friendly-Interface**: There are no distractions, with only the simple prompts to guide you through
- **Flexible File Handling**: Works with all file types

---

## Installation
1. **Prerequisites**: Ensure you have Ollama, Python (3.10.10), pip, and npm installed on your system.
3. **Download the application**: Clone the repository.
4. **Install an LLM**: run `ollama run deepseek-r1:8b` for a default installation, other models & distillations can be found through [here](https://ollama.com/library/)
5. **Install Dependancies**: run `npm install` on the electron folder in the frontend and `pip install -r requirements.txt` on the backend forlder to install the necessary dependancies.
6. **Setting up the backend**: create a file called .env within the backend folder, the .env should be contain: 
```
OLLAMA_URL=http://localhost:11434/api/generate
MODEL=deepseek-r1:8b
```

You can change the model & url to whichever model you installed using Ollama

---

## Usage

To get started, you'll need to open **two separate terminal windows**:

1. **Backend**  
   - Navigate to the `backend` folder (if necessary).  
   - Run the command:
     ```bash
     py main.py
     ```
   - This will start your backend server.

2. **Frontend (Electron)**  
   - Navigate to the `frontend/electron` folder.  
   - Run the command:
     ```bash
     npm run dev
     ```
   - This will start your frontend in development mode.

> **Note**: We haven't had time to build the project yet, so you'll need to run it in development mode for now.

---

## Examples
![Screenshot 2025-02-17 095925](https://github.com/user-attachments/assets/44fe96ae-0d0d-4094-b6f2-1beaa29ab35c)
![Screenshot 2025-02-17 100022](https://github.com/user-attachments/assets/b865c38c-3fab-49ce-ae36-ce38c60f304b)
![image](https://github.com/user-attachments/assets/7b1ee0b9-1100-42e0-9160-8a4d59d1e8b5)

---

## License
This project is distributed under the **MIT License**. See `LICENSE` for more information.

---

## Contributors
**Members:**
Aidan, Rowan, Jeevan.s, Ryan, Phillip\
hacked-2025-team-raid\
This project was create for the 2025 HackED hackathon at the UofA


