import os
import json

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
