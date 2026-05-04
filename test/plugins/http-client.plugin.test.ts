import { httpClientPlugin } from '../../src/plugins/http-client.plugin';

describe('plugins/http-client.plugin.ts', () => {

  test('httpClientPlugin.get() should return data from API', async () => {

    const data = await httpClientPlugin.get('https://jsonplaceholder.typicode.com/todos/1');

    console.log(data);
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: expect.any(Boolean)
    });

  });

  test('httpClientPlugin should have POST, PUT and Delete methods', () => {

    expect( typeof httpClientPlugin.post ).toBe('function');
    expect( typeof httpClientPlugin.delete ).toBe('function');
    expect( typeof httpClientPlugin.put ).toBe('function');
    expect( typeof httpClientPlugin.get ).toBe('function');

  });

  test('httpClientPlugin.post() should throw error (not implemented)', async () => {

    await expect( httpClientPlugin.post('https://api.example.com', {}) )
      .rejects.toThrow('Not implemented');

  });

  test('httpClientPlugin.put() should throw error (not implemented)', async () => {

    await expect( httpClientPlugin.put('https://api.example.com', {}) )
      .rejects.toThrow('Not implemented');

  });

  test('httpClientPlugin.delete() should throw error (not implemented)', async () => {

    await expect( httpClientPlugin.delete('https://api.example.com') )
      .rejects.toThrow('Not implemented');

  });


});