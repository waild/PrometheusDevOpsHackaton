import SlackBotApp from './slack';
import * as dotenv from 'dotenv';
import { getEnv } from './helpers/envHelpers';
dotenv.config();

async function bootstrap() {
  const app = new SlackBotApp();
  await app.listen(Number(process.env.PORT) || 3000);
  console.log('⚡️ Bolt app is running!');
}
function checkEnvVariables() {
  getEnv('SLACK_BOT_SOCKET_TOKEN');
  getEnv('SLACK_SIGNING_SECRET');
  getEnv('SLACK_BOT_TOKEN');
}
checkEnvVariables();
bootstrap();
