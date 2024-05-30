#!/bin/bash

REPO_URL="waild/PrometheusDevOpsHackaton"
TARGET_DIR="repo"
NEW_DIR="new_folder"   

# Load .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
else
  echo ".env file not found!"
  exit 1
fi

git clone "https://$GITHUB_TOKEN@github.com/$REPO_URL" "$TARGET_DIR"

cd "$TARGET_DIR" || { echo "Failed to change to directory $TARGET_DIR"; exit 1; }

# TEST…
mkdir -p "$NEW_DIR"

# Add the new directory to Git
git add "$NEW_DIR"

# Commit the changes
git commit -m "Added new directory $NEW_DIR"

# Push the changes to the remote repository
git push origin main

# Remove the local copy of the repository (optional)
cd ..
rm -rf "$TARGET_DIR"

echo "Script executed successfully!"
