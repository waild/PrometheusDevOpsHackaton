import { App, KnownBlock } from '@slack/bolt';
import KubeClientFactory from '../k8s';
import k8s from '@kubernetes/client-node';

export default class SlackBot {
  private app: App;
  private commandPrefix: string;
  private k8sApi: k8s.CoreV1Api;

  constructor() {
    this.commandPrefix = process.env.COMMAND_PREFIX || '';
    this.app = new App({
      token: process.env.SLACK_BOT_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET || '',
      socketMode: true,
      appToken: process.env.SLACK_BOT_SOCKET_TOKEN,
    });
    this.k8sApi = KubeClientFactory.getClient();
  }

  async listen(port: number) {
    this.app.command(
      `/${this.commandPrefix}help`,
      async ({ command, ack, say, respond }) => {
        await ack();
        await respond({
          text: 'Here are the available commands:',
          // https://app.slack.com/block-kit-builder
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `/${this.commandPrefix}get`,
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `/${this.commandPrefix}create *[environment-name]* *[source]*`,
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `/${this.commandPrefix}delete *[environment-name]*`,
              },
            },
          ],
        });
      },
    );

    this.app.command(
      `/${this.commandPrefix}get`,
      async ({ command, ack, say, respond }) => {
        await ack();
        try {
          const namespaces = await this.k8sApi.listNamespace();
          await say(JSON.stringify(namespaces));

          /*await respond({
            text: 'Here are list of namespaces:',
            blocks: namespaces.body.items.map((x): KnownBlock => {
              return {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `${x.kind}: ${x.metadata}: ${x.status}`,
                },
              };
            }),
          });*/
        } catch (err) {
          console.error(err);
        }
        await say('You invoked the /get command');
      },
    );

    this.app.command(
      `/${this.commandPrefix}delete`,
      async ({ command, ack, say }) => {
        await ack();
        await say('You invoked the /delete command');
      },
    );

    this.app.command(
      `/${this.commandPrefix}create`,
      async ({ command, ack, say }) => {
        await ack();
        await say('You invoked the /create command');
      },
    );

    await this.app.start(port);
  }
}
