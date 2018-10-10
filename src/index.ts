import createPrompts from './createPrompts';
import formatCommit from './formatCommit';
import { Prompter } from './types';
import { loadConfig } from './util';

import pkg from '../package.json';

const config = loadConfig();
const prompts = createPrompts({ config, pkg });

export const prompter: Prompter = (cz, commit) => {
  cz.prompt(prompts)
    .then(formatCommit)
    .then(commit);
};
