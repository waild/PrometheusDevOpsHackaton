#!/bin/bash
ENVIRONMENT_NAME=$1
SOURCE=$2
TEMP_DIR="temp"

rm -rf "$TEMP_DIR"
git clone "https://$GITHUB_TOKEN@github.com/$GITHUB_USER/$GITHUB_REPO" "$TEMP_DIR"

cd "$TEMP_DIR" || { echo "Failed to change to directory $TEMP_DIR"; exit 1; }

flux create source helm podinfo \
    --namespace="$ENVIRONMENT_NAME" \
    --url="$SOURCE" \
    --interval=10m \
    --export > "$GITHUB_REPO_CONFIG_PATH/$ENVIRONMENT_NAME.yaml"

git add "$GITHUB_REPO_CONFIG_PATH/$ENVIRONMENT_NAME.yaml"
# Commit the changes
git commit -m "Added new environment $ENVIRONMENT_NAME for $SOURCE"

# Push the changes to the remote repository
git push origin main

# Remove the local copy of the repository (optional)
cd ..
rm -rf "$TEMP_DIR"
