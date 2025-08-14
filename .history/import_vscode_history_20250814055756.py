import os
import json
import shutil
import subprocess
from datetime import datetime
from urllib.parse import unquote, urlparse
from collections import defaultdict

# ========================
# CONFIGURATION
# ========================
VSC_HISTORY_PATH = r"C:\\Users\\admin\\AppData\\Roaming\\Code\\User\\History"
PROJECT_PATH = r"D:\\Project Vaultify"
REPO_URL = "https://github.com/Shrey18Raj/vaultify.git"
BRANCH = "main"

# List of selected folders to import
FOLDERS_TO_IMPORT = [
    "-59e373ae", "-4234800b", "-7dbb342a", "115a6ae0", "-25cf7424", "3f010a6",
    "-78a31f47", "-55204a9b", "-11a3cffb", "-4b83d227", "-6e5bc4ee", "-48854ae2",
    "-2547c6fa", "6deed8e3", "-4a301229", "6b025a96", "60caf929", "-235f49a3",
    "-6c3d28ba", "-764b78b8", "fb3702b", "-14678fac", "68efa86d", "543915e8",
    "5438fb9c", "17652d74", "20c8d7c1", "65fcfb05", "6ad9d5c9", "6a0ef55e", "6e7d609a"
]

# ========================
# HELPER FUNCTIONS
# ========================
def git_init():
    if not os.path.isdir(os.path.join(PROJECT_PATH, ".git")):
        subprocess.run(["git", "init"], cwd=PROJECT_PATH)
        subprocess.run(["git", "branch", "-M", BRANCH], cwd=PROJECT_PATH)
        subprocess.run(["git", "remote", "add", "origin", REPO_URL], cwd=PROJECT_PATH)

def commit_files(file_paths, commit_date, message):
    for file_path in file_paths:
        subprocess.run(["git", "add", file_path], cwd=PROJECT_PATH)
    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = commit_date
    env["GIT_COMMITTER_DATE"] = commit_date
    subprocess.run(["git", "commit", "-m", message], cwd=PROJECT_PATH, env=env)

# ========================
# MAIN SCRIPT
# ========================
git_init()

for folder in FOLDERS_TO_IMPORT:
    history_folder = os.path.join(VSC_HISTORY_PATH, folder)
    if not os.path.isdir(history_folder):
        print(f"⚠ Folder not found: {history_folder}, skipping...")
        continue

    # Find JSON metadata file
    json_files = [f for f in os.listdir(history_folder) if f.endswith(".json")]
    if not json_files:
        print(f"⚠ No JSON file in {history_folder}, skipping...")
        continue

    json_path = os.path.join(history_folder, json_files[0])

    # Load JSON safely
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            meta = json.load(f)
    except json.JSONDecodeError as e:
        print(f"⚠ Skipping invalid JSON file: {json_path} ({e})")
        continue

    # Decode original file path
    resource_url = meta.get("resource")
    if not resource_url:
        print(f"⚠ No resource path in {json_path}, skipping...")
        continue

    parsed = urlparse(resource_url)
    original_path = unquote(parsed.path).lstrip("/")
    target_path = os.path.join(PROJECT_PATH, os.path.relpath(original_path, os.path.splitdrive(original_path)[0] + os.sep))
    os.makedirs(os.path.dirname(target_path), exist_ok=True)

    # Group snapshots by day
    day_groups = defaultdict(list)  # key = 'YYYY-MM-DD', value = list of snapshots
    for entry in meta.get("entries", []):
        snap_file = os.path.join(history_folder, entry["id"])
        if not os.path.isfile(snap_file):
            continue
        day = datetime.fromtimestamp(entry["timestamp"] / 1000).strftime("%Y-%m-%d")
        day_groups[day].append((entry["timestamp"], snap_file))

    # Replay commits grouped by day
    for day, snaps in sorted(day_groups.items()):
        # Sort snapshots within the day by timestamp
        snaps.sort(key=lambda x: x[0])
        files_added = []
        for _, snap_file in snaps:
            shutil.copy2(snap_file, target_path)
            files_added.append(os.path.relpath(target_path, PROJECT_PATH))
        commit_date = datetime.fromtimestamp(snaps[-1][0] / 1000).strftime("%Y-%m-%d %H:%M:%S")
        commit_files(files_added, commit_date, f"Restore {os.path.basename(original_path)} changes for {day}")

    print(f"✅ Finished importing history for folder: {folder}")

# Push all commits to GitHub
subprocess.run(["git", "push", "-u", "origin", BRANCH], cwd=PROJECT_PATH)
print("✅ All selected folders imported and pushed to GitHub.")