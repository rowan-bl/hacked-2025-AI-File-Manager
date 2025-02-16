import os
import json

def index_from_directory(root_path):
    index = {}
    files = []
    with os.scandir(root_path) as entries: # iterate through directory enteries
        for entry in entries:
            if entry.is_dir(): # if folder
                index[entry.name] = index_from_directory(os.path.join(root_path, entry.name)) #recursively call
            else: # if file
                files.append(entry.name)
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


file_system_index = {"root":index_from_directory(r"C:\Users\rbzom\OneDrive\Documents\TestData")}
count = count_files(file_system_index)
print( f"{file_system_index} \n {count}")