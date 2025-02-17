import os
import json
import pathlib
import shutil

def index_from_directory(root_path):
    index = {}
    files = []
    with os.scandir(root_path) as entries: # iterate through directory enteries
        for entry in entries:
            if entry.is_dir(): # if folder
                index[entry.name] = index_from_directory(os.path.join(root_path, entry.name)) # recursively call
            else: # if file
                filename = entry.name
                parts = filename.split(".", 1)
                if len(parts) == 1: 
                    name_part = filename
                    ext_part = ""
                else:
                    name_part, ext_part = parts
                    if not name_part:
                        name_part = filename
                        ext_part = ""
                files.append({
                    "name": name_part,
                    "extension": ext_part
                })
    index["files"] = files
    return index

def count_files(data):
    total_files = 0
    def _count_recursive(data): # idk if there is a better way to do this, just made most sense to me at 4am 
        nonlocal total_files
        if "files" in data:
            total_files += len(data["files"])
        for key, value in data.items():
            if isinstance(value, dict): # is it a subdirectory
                _count_recursive(value)

    _count_recursive(data)
    return total_files



# print(json.dumps({"root":index_from_directory(r"C:\Users\rbzom\OneDrive\Desktop\TEST DATA")}, indent=2))
#Will move or delete a file depending on the type given, will have to modify to make more sense with the information coming in from deepseek
<<<<<<< Updated upstream
def move_files(data, current_path, root):
=======
def move_files(data, current_path ,root = "C:\\test_folder"):
>>>>>>> Stashed changes
    
    for folder, files in data.items():
        current_path = os.path.join(root, folder)
        pathlib.Path(current_path).mkdir(parents=True, exist_ok=True) #if the filepath doesnt exist, create it, otherwise does nothing

<<<<<<< Updated upstream
        if isinstance(files, dict):
            move_files(files, current_path, root)
        elif isinstance(files, list):
            for name, ext in files:
                name_ext = name + ext
                source_file = os.path.join(root, name_ext)
                destination = os.path.join(current_path, name_ext)
=======
        if "files" in files and isinstance(files["files"], list):
            for file_info in files["files"]:
                file_name = f"{file_info['name']}.{file_info['extension']}"
                source_file = os.path.join(root, file_name)
                destination = os.path.join(current_path, file_name)
>>>>>>> Stashed changes

                if os.path.exists(source_file):
                    shutil.move(source_file, destination)
                    print(f"moved: {source_file} -> {destination}")
                else:
                    print("crap it didnt move")
<<<<<<< Updated upstream

                
                
    

    # if type == "empty_dir":
    #     try:
    #         os.rmdir(root_file_path)
    #     except Exception:
    #         print("No directory to delete or directory still has files within it")

# test_data = {'Documents': {'Text Files': ['test txt.txt', 'random_test_text_document.txt'], 'Word Documents': ['test word doc.docx']}}
# move_files(test_data)
=======
>>>>>>> Stashed changes
