import { spawn } from 'child_process';
import path from 'path';

const exec = (cmd: string, args: string[] = []) =>
  new Promise((resolve, reject) => {
    console.log(`Started: ${cmd} ${args.join(' ')}`);
    console.dir(process.env);
    const app = spawn(cmd, args, {
      stdio: 'inherit',
      env: {
        ...process.env,
      },
    });
    app.on('close', (code) => {
      if (code !== 0) {
        const err = new Error(`Invalid status code: ${code}`);
        return reject(err);
      }
      return resolve(code);
    });
    app.on('error', reject);
  });

const run = async (scriptName: string, args: string[]) => {
  const scriptPath = `./scripts/${scriptName}.sh`;
  await exec('bash', [scriptPath, ...args]);
};

export { run };
