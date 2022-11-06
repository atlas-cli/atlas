import { readFileSync } from 'fs';
import { Axios } from 'axios';

describe('hello world', () => {
  const environment = JSON.parse(readFileSync('integration/hello-world/env.json', 'utf-8'));
  const axios = new Axios(
    {
      baseURL: environment['lambda-stack'].apiUrl
    }
  );
  test('test hello world api', async () => {
    const helloWorld = 'Hello World';
    const response = await axios.get('hello-world')
      expect(response.status).toBe(200);
      expect(response.data).toBe(helloWorld);
  });
});
