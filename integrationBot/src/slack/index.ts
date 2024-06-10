import {
  App,
  SlackCommandMiddlewareArgs,
  AllMiddlewareArgs,
  KnownBlock,
  RichTextElement,
  RichTextSection,
} from '@slack/bolt';
import KubeClientFactory from '../k8s';
import { run } from '../helpers/shRunner';
import k8s from '@kubernetes/client-node';
import argParser from 'minimist';

export default class SlackBot {
  private app: App;
  private commandPrefix: string;
  private k8sApi: k8s.CoreV1Api;
  private defaultNs = [
    'kube-system',
    'kube-public',
    'kube-node-lease',
    'default',
    'flux-system',
  ];
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
    // https://app.slack.com/block-kit-builder
    await respond({
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'List of command which you can invoke to control your envs:',
            emoji: true,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '/get',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '/create *[environment-name]* *[source]*',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '/delete *[environment-name]*',
          },
        },
      ],
    });
  }

  async deleteHandler(
    {
      command,
      say,
      respond,
    }: SlackCommandMiddlewareArgs & AllMiddlewareArgs<any>,
    args: argParser.ParsedArgs,
  ) {
    const [environment] = args._;
    await run('delete-env', [environment]);
    await respond({
      // https://app.slack.com/block-kit-builder
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'Environment deletion initiated!',
            emoji: true,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `The environment: *${environment}* will be deleted shortly. Please check status in few minutes.`,
          },
        },
      ],
    });
  }

  async createHandler(
    {
      command,
      say,
      respond,
    }: SlackCommandMiddlewareArgs & AllMiddlewareArgs<any>,
    args: argParser.ParsedArgs,
  ) {
    const [environment, source] = args._;
    await run('add-helm-oci', [environment, source]);
    await respond({
      // https://app.slack.com/block-kit-builder
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'Environment creation initiated!',
            emoji: true,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `The environment: *${environment}* will be created shortly. Please check status in few minutes.`,
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
    const namespaces = await this.k8sApi.listNamespace();
    const nss = namespaces.body.items
      .filter((x) => !!x.metadata)
      .map((x): string => x.metadata?.name || '')
      .filter((x) => !!x && !this.defaultNs.includes(x));

    if (nss.length > 0) {
      const resolvedPodInfos = await Promise.all(
        nss.map((ns) => this.k8sApi.listNamespacedPod(ns)),
      );

      await respond({
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: 'List of existing environments:',
              emoji: true,
            },
          },
          ...nss.map<KnownBlock>((x, index): KnownBlock => {
            return {
              type: 'rich_text',
              elements: [
                {
                  type: 'rich_text_section',
                  elements: [
                    {
                      type: 'text',
                      text: `environment: ${x}\n`,
                    },
                  ],
                },
                {
                  type: 'rich_text_list',
                  style: 'bullet',
                  elements: [
                    ...resolvedPodInfos[index].body.items.map(
                      (y): RichTextSection => {
                        return {
                          type: 'rich_text_section',
                          elements: [
                            {
                              type: 'link',
                              url: 'https://slack.com/',
                              text: `${y.metadata?.name} : `,
                              style: {
                                bold: true,
                              },
                            },
                            {
                              type: 'text',
                              text: `${y.spec?.containers[0].image}`,
                            },
                          ],
                        };
                      },
                    ),
                  ],
                },
              ],
            };
          }),
          ...nss.map<KnownBlock>((x, index): KnownBlock => {
            return {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `environment *${x}*: ${resolvedPodInfos[
                  index
                ].body.items.map((y) => {
                  return `${y.metadata?.name} - ${y.spec?.containers[0].image}`;
                })}`,
              },
            };
          }),
        ],
      });
    } else {
      await respond({
        text: 'Here are the available namespaces:',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `There no any environments;`,
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

      const args = argParser(command.text.trim().split(' '));

      try {
        switch (command.command) {
          case `/${this.commandPrefix}help`:
            await this.helpHandler(slackCommandMiddlewareArgs);
            break;
          case `/${this.commandPrefix}delete`:
            await this.deleteHandler(slackCommandMiddlewareArgs, args);
            break;
          case `/${this.commandPrefix}create`:
            await this.createHandler(slackCommandMiddlewareArgs, args);
            break;
          case `/${this.commandPrefix}get`:
            await this.getHandler(slackCommandMiddlewareArgs);
            break;
          default:
            await this.helpHandler(slackCommandMiddlewareArgs);
        }
      } catch (err) {
        console.error(err);
        await respond({
          text: 'Something went wrong:',
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `Something went wrong please try again later: ${(<Error>err).message}`,
              },
            },
          ],
        });
      }
    });

    await this.app.start(port);
  }
}
