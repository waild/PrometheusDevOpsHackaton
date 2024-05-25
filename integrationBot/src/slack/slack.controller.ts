import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SlackService } from './slack.service';

@Controller('slack')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  @Post('events')
  async handleEvent(@Req() req: Request, @Res() res: Response) {
    await (this.slackService as any).app.receiver.router(req, res);
  }
}
