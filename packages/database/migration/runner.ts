import { promisify } from 'util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = promisify(require('child_process').exec);

export const handler = async ({ command }: any) => {
  try {
    const { stdout, stderr } = await exec(command);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    return {
      stderr,
      stdout,
    };
  } catch (e) {
    console.error(e);
    throw new e();
  }
};
