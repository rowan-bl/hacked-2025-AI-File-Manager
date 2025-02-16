import os
import json

def index_from_directory(root_path):
    index = {}
    files = []
    with os.scandir(root_path) as item:
        for entry in item:
            if entry.is_dir():
                index[entry.name] = index_from_directory(os.path.join(root_path, entry.name))
            else:
                files.append(entry.name)
    index["files"] = files
    return index