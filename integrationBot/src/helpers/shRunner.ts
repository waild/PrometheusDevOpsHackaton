import { spawn } from 'child_process';
import path from 'path';

const exec = (cmd, args = []) =>
  new Promise((resolve, reject) => {
    console.log(`Started: ${cmd} ${args.join(' ')}`);
    const app = spawn(cmd, args, { stdio: 'inherit' });
    app.on('close', (code) => {
      if (code !== 0) {
        err = new Error(`Invalid status code: ${code}`);
        err.code = code;
        return reject(err);
      }
      return resolve(code);
    });
    app.on('error', reject);
  });

const run = async (scriptName: string) => {
  await exec('bash', [path.join(__dirname, `./${scriptName}.sh`)]);
};

export { run };
