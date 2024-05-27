import { spawn } from 'child_process';
import path from 'path';

const exec = (cmd: string, args: string[] = []) =>
  new Promise((resolve, reject) => {
    console.log(`Started: ${cmd} ${args.join(' ')}`);
    const app = spawn(cmd, args, { stdio: 'inherit' });
    app.on('close', (code) => {
      if (code !== 0) {
        const err = new Error(`Invalid status code: ${code}`);
        return reject(err);
      }
      return resolve(code);
    });
    app.on('error', reject);
  });

const run = async (scriptName: string) => {
  const scriptPath = path.join(__dirname, `./${scriptName}.sh`);
  await exec('bash', [scriptPath]);
};

export { run };
