import { promisify } from 'util';
const exec = promisify(require('child_process').exec);

export const handler = async ({ command }: any,) => {
    try {
        const { stdout, stderr } = await exec(command);
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    } catch (e) {
        console.error(e);
    }
};