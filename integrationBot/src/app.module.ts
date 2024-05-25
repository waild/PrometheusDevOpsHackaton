import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [SlackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
