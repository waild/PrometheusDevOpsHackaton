import { Injectable, OnModuleInit } from '@nestjs/common';
import { App, ExpressReceiver } from '@slack/bolt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SlackService implements OnModuleInit {
  private app: App;

  constructor() {
    const receiver = new ExpressReceiver({
      signingSecret: process.env.SLACK_SIGNING_SECRET,
    });

    this.app = new App({
      token: process.env.SLACK_BOT_TOKEN,
      receiver,
    });
  }

  async onModuleInit() {
    this.app.command('/get', async ({ command, ack, say }) => {
      await ack();
      await say('You invoked the /get command');
    });

    this.app.command('/delete', async ({ command, ack, say }) => {
      await ack();
      await say('You invoked the /delete command');
    });

    this.app.command('/create', async ({ command, ack, say }) => {
      await ack();
      await say('You invoked the /create command');
    });

    await this.app.start(Number(process.env.PORT) || 3000);
    console.log('⚡️ Bolt app is running!');
  }
}
