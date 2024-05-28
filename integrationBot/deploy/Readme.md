
Make env file with secret's\
"slack-bot-secret.env"

put secret's to this file

echo "SLACK_SIGNING_SECRET=[...]" > slack-bot-secret.env\
echo "SLACK_BOT_TOKEN=[...]" >> slack-bot-secret.env\
echo "SLACK_BOT_SOCKET_TOKEN=[...]" >> slack-bot-secret.env

Create secret in k8s\
kubectl create secret generic slack-bot-secret --from-env-file=slack-bot-secret.env

Deploy slack-bot
kubectl apply -f deploy-tofts-slack-bot.yaml