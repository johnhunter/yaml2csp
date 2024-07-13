import yaml from 'js-yaml';
import fs from 'node:fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import parser from './parser.js';

yargs(hideBin(process.argv))
  .command(
    'parse [file]',
    'parse a CSP config',
    (yargs) => {
      return yargs.positional('file', {
        describe: 'yaml file to parse',
        alias: 'f',
      });
    },
    (argv) => {
      const src = fs.readFileSync(argv.file, 'utf8');
      const rulesObject = yaml.load(src);

      if (typeof rulesObject !== 'object') {
        throw new Error(`File is not a valid CSP config: '${argv.file}'`);
      }

      const results = parser(rulesObject);

      if (argv.out) {
        fs.writeFileSync(argv.out, results);
      } else {
        console.log(results);
      }
    }
  )
  .option('out', {
    alias: 'o',
    description: 'The output file (otherwise output to stdout)',
  })
  .alias('v', 'version')
  .alias('h', 'help')
  .demandCommand()
  .recommendCommands()
  .strict()
  .parse();
