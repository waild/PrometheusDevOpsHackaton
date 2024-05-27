import {
  App,
  SlackCommandMiddlewareArgs,
  AllMiddlewareArgs,
  KnownBlock,
} from '@slack/bolt';
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

  async helpHandler({
    command,
    say,
    respond,
  }: SlackCommandMiddlewareArgs & AllMiddlewareArgs<any>) {
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
  }

  async deleteHandler({
    command,
    say,
    respond,
  }: SlackCommandMiddlewareArgs & AllMiddlewareArgs<any>) {
    const text = command.text.trim();
    const [environment] = text.split(' ');
    await respond({
      text: 'Here are the available commands:',
      // https://app.slack.com/block-kit-builder
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `You invoked the /delete command, environment: ${environment} deleted`,
          },
        },
      ],
    });
  }

  async createHandler({
    command,
    say,
    respond,
  }: SlackCommandMiddlewareArgs & AllMiddlewareArgs<any>) {
    const text = command.text.trim();
    const [environment, source] = text.split(' ');
    await respond({
      text: 'Here are the available commands:',
      // https://app.slack.com/block-kit-builder
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `You invoked the /create command, environment: ${environment} created from ${source}}`,
          },
        },
      ],
    });
  }

  async getHandler({
    command,
    ack,
    say,
    respond,
  }: SlackCommandMiddlewareArgs & AllMiddlewareArgs<any>) {
    try {
      const namespaces = await this.k8sApi.listNamespace();
      console.dir(namespaces);
      // await say(JSON.stringify(namespaces));
      await respond({
        text: 'Here are the available namespaces:',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `You invoked the /get command`,
            },
          },
        ],
        // https://app.slack.com/block-kit-builder
        /*blocks: namespaces.body.items.map<KnownBlock>((x): KnownBlock => {
          return {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `/${x.metadata}`,
            },
          };
        }),*/
      });
    } catch (err) {
      console.error(err);
      await respond({
        text: 'Here are the available namespaces:',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `You invoked the /get command, but we have some error with cluster: ${(<Error>err).message}`,
            },
          },
        ],
      });
    }
  }

  async listen(port: number) {
    const commandName = new RegExp(`/${this.commandPrefix}*`);
    this.app.command(commandName, async (slackCommandMiddlewareArgs) => {
      const { command, ack, say, respond } = slackCommandMiddlewareArgs;
      await ack();
      console.dir(command);
      switch (command.command) {
        case `/${this.commandPrefix}help`:
          await this.helpHandler(slackCommandMiddlewareArgs);
          break;
        case `/${this.commandPrefix}delete`:
          await this.deleteHandler(slackCommandMiddlewareArgs);
          break;
        case `/${this.commandPrefix}get`:
          await this.getHandler(slackCommandMiddlewareArgs);
          break;
        default:
          say(`Unknown command: ${command.command}, plz check.`);
      }
    });

    await this.app.start(port);
  }
}
