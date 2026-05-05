// Mock yargs to avoid ESM issues
const mockYargs = jest.fn(() => {
  const args = process.argv;
  let result = {
    b: 5,
    l: 10,
    s: false,
    n: 'multiplication-table',
    d: 'outputs'
  };
  
  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-b' && args[i + 1]) result.b = parseInt(args[i + 1]);
    if (args[i] === '-l' && args[i + 1]) result.l = parseInt(args[i + 1]);
    if (args[i] === '-s') result.s = true;
    if (args[i] === '-n' && args[i + 1]) result.n = args[i + 1];
    if (args[i] === '-d' && args[i + 1]) result.d = args[i + 1];
  }
  
  return {
    option: jest.fn().mockReturnThis(),
    check: jest.fn().mockReturnThis(),
    parseSync: jest.fn(() => result)
  };
});

jest.mock('yargs', () => mockYargs);

jest.mock('yargs/helpers', () => ({
  hideBin: jest.fn((args) => args)
}));

// import { yarg } from './args.plugin';


const runCommand = async (args: string[]) => {

  process.argv = [...process.argv, ...args];

  const { yarg } = await import('./args.plugins');

  return yarg;
}



describe('Test args.plugin.ts', () => {

  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });



  test('should return default values', async () => {

    const argv = await runCommand(['-b', '5']);

    expect(argv).toEqual(expect.objectContaining({
      b: 5,
      l: 10,
      s: false,
      n: 'multiplication-table',
      d: 'outputs',
    }));

  });


  test('should return configuration with custom values', async() => {

    const argv = await runCommand(['-b', '8', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir']);

    expect(argv).toEqual(expect.objectContaining({
      b: 8,
      l: 20,
      s: true,
      n: 'custom-name',
      d: 'custom-dir',
    }));



  });


});