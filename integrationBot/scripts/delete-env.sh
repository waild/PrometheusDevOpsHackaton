#!/bin/bash

for ARGUMENT in "$@"
do
   KEY=$(echo $ARGUMENT | cut -f1 -d=)

   KEY_LENGTH=${#KEY}
   VALUE="${ARGUMENT:$KEY_LENGTH+1}"

  if [ -n "${VAR}" ]; then
      export "$KEY"="${VALUE:''}"
  fi
   
done

ENVIRONMENT_NAME=$1
TEMP_DIR="temp"

#printenv 

rm -rf "$TEMP_DIR"
git clone "https://$GITHUB_TOKEN@github.com/$GITHUB_USER/$GITHUB_REPO" "$TEMP_DIR"

cd "$TEMP_DIR" || { echo "Failed to change to directory $TEMP_DIR"; exit 1; }

git rm "$GITHUB_REPO_CONFIG_PATH/$ENVIRONMENT_NAME-*.yaml"
# Commit the changes
git commit -m "Removed new environment $ENVIRONMENT_NAME"

# Push the changes to the remote repository
git push origin main

# Remove the local copy of the repository (optional)
cd ..
rm -rf "$TEMP_DIR"