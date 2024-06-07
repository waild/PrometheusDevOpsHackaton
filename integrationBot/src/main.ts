import SlackBotApp from './slack';
import * as dotenv from 'dotenv';
import { getEnv } from './helpers/envHelpers';
import requiredEnvVars from './const/requiredEnvVars';
dotenv.config();

async function bootstrap() {
  const app = new SlackBotApp();
  await app.listen(Number(process.env.PORT) || 3000);
  console.log('⚡️ Bolt app is running!');
}
function checkEnvVariables() {
  requiredEnvVars.forEach((x) => getEnv(x));
}
checkEnvVariables();
bootstrap();
