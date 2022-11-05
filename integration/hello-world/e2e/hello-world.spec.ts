import { readFileSync } from 'fs';
import { Axios } from 'axios';

describe('hello world', () => {
  const { AtlasLambdaStack } = JSON.parse(readFileSync('integration/hello-world/env.json', 'utf-8'));
  const axios = new Axios(
    {
      baseURL: AtlasLambdaStack.apiUrl
    }
  );
  test('test hello world api', async () => {
    const helloWorld = 'Hello World';
    const response = await axios.get('hello-world')
      expect(response.status).toBe(200);
      expect(response.data).toBe(helloWorld);
  });
});
