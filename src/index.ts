import { Questions } from 'inquirer';

import createPrompts from './createPrompts';
import formatCommit from './formatCommit';
import { CommitizenConfig, Prompter } from './types';
import { loadConfig } from './util';

import pkg from '../package.json';

let config: CommitizenConfig;
let prompts: Questions;
try {
  config = loadConfig();
  prompts = createPrompts({ config, pkg });
} catch (error) {
  // tslint:disable-next-line:no-console
  console.error(
    `Could not load project's Commitizen configuration from ${process.cwd()}.`,
  );
}

export const prompter: Prompter = (cz, commit) => {
  cz.prompt(prompts)
    .then(formatCommit)
    .then(commit);
};
