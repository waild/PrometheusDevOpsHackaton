###### 1. [Create Slack App and retrive keys](./docs/slack.md)
 We will need:
-  SLACK_SIGNING_SECRET
-  SLACK_BOT_TOKEN
-  SLACK_BOT_SOCKET_TOKEN

Add Slash Commands:
-  `/help`
-  `/get`
-  `/create`
-  `/delete`

###### 2. [Generate a GitHub Token](./docs/git.md)
 We will need:
-  GITHUB_TOKEN
-  GITHUB_USER

###### 3. [Install Flux CLI locally](https://fluxcd.io/flux/get-started/)

###### 4. [Export your Env](https://fluxcd.io/flux/get-started/)

`export GITHUB_TOKEN=<your-token>`
`export GITHUB_USER=<your-username>`
`export GITHUB_REPO=<your-flux-config-repo>`
`export GITHUB_REPO_CONFIG_PATH=<your-flux-config-repo-path>`

###### 5. [Flux bootstrap on your cluster](https://fluxcd.io/flux/get-started/#install-flux-onto-your-cluster)

`flux bootstrap github \
  --owner=$GITHUB_USER \
  --repository=$GITHUB_REPO \
  --branch=main \
  --path=$GITHUB_REPO_CONFIG_PATH \
  --personal
`
###### 6. Prepare secrets for slack bot
Make env file with secret's\
"slack-bot-secret.env"

put secret's to this file

`
echo "SLACK_SIGNING_SECRET=[...]" > slack-bot-secret.env\
echo "SLACK_BOT_TOKEN=[...]" >> slack-bot-secret.env\
echo "SLACK_BOT_SOCKET_TOKEN=[...]" >> slack-bot-secret.env\
echo "GITHUB_USER=[...]" >> slack-bot-secret.env\
echo "GITHUB_REPO=[...]" >> slack-bot-secret.env\
echo "GITHUB_REPO_CONFIG_PATH=[...]" >> slack-bot-secret.env\
echo "GITHUB_TOKEN=[...]" >> slack-bot-secret.env\
`


Create secret in k8s\
`kubectl create secret generic slack-bot-secret --from-env-file=slack-bot-secret.env`
###### 7. Bind roles to access to cluster from node
`kubectl create clusterrolebinding default-admin --clusterrole cluster-admin --serviceaccount=default:default`

###### 8. Deploy slack-bot
`kubectl apply -f ./deploy/deploy-tofts-slack-bot.yaml`

###### 9. Enjoy