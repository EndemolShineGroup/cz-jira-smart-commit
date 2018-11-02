import createPrompts from './lib/createPrompts';
import formatCommit from './lib/formatCommit';
import { CommitizenConfig, Prompter } from './lib/types';
import { loadConfig } from './lib/util';

const pkg = require('../package.json');

let config: CommitizenConfig;
try {
  config = loadConfig();
} catch (error) {
  process.stderr.write(
    `Could not load project's Commitizen configuration from ${process.cwd()}.`,
  );
}

export const prompter: Prompter = (cz, commit) => {
  const prompts = createPrompts({ config, pkg });

  return cz
    .prompt(prompts)
    .then(formatCommit)
    .then(commit);
};
