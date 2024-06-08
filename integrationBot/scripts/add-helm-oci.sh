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
TAG="${2:-'latest'}"
TEMP_DIR="temp"

rm -rf "$TEMP_DIR"
git clone "https://$GITHUB_TOKEN@github.com/$GITHUB_USER/$GITHUB_REPO" "$TEMP_DIR"

cd "$TEMP_DIR" || { echo "Failed to change to directory $TEMP_DIR"; exit 1; }

cat <<EOF > "$GITHUB_REPO_CONFIG_PATH/$ENVIRONMENT_NAME-ns.yaml"
apiVersion: v1
kind: Namespace
metadata:
  name: "$ENVIRONMENT_NAME"
EOF

flux create source oci "$ENVIRONMENT_NAME-source" \
  --url=$OCI_SOURCE \
  --interval=10m \
  --namespace="$ENVIRONMENT_NAME" \
  --tag=$TAG  \
  --export > "$GITHUB_REPO_CONFIG_PATH/$ENVIRONMENT_NAME-source.yaml"

flux create hr "$ENVIRONMENT_NAME-release" \
  --interval=10m \
  --chart-ref=OCIRepository/"$ENVIRONMENT_NAME-source" \
  --namespace="$ENVIRONMENT_NAME" \
  --export > "$GITHUB_REPO_CONFIG_PATH/$ENVIRONMENT_NAME-release.yaml"

git add .
# Commit the changes
git commit -m "Added new environment $ENVIRONMENT_NAME for $SOURCE"

# Push the changes to the remote repository
git push origin main

# Remove the local copy of the repository (optional)
cd ..
rm -rf "$TEMP_DIR"