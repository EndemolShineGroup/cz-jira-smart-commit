import gitBranch from 'git-branch';
import { Questions } from 'inquirer';
import get from 'lodash.get';
import has from 'lodash.has';

import { CommitizenConfig, PackageJson } from './types';
import {
  addEOL,
  createCommitTypeChoices,
  createScopeChoices,
  formatGitBranchName,
} from './util';
import validateIssues from './validation/validateIssues';
import validateSubject from './validation/validateSubject';

interface CreatePrompts {
  config: CommitizenConfig;
  pkg: PackageJson;
}

export default ({ config, pkg }: CreatePrompts): Questions => {
  const isPullRequestsOnly = get(config, `${pkg.name}.pullRequestsOnly`, false);
  const hasUserDefinedScopes = has(config, `${pkg.name}.scopes`);

  const workflowChoices = ['in-progress', 'in-review'];
  if (!isPullRequestsOnly) {
    workflowChoices.push('done');
  }

  return [
    {
      default: formatGitBranchName(gitBranch.sync()),
      message:
        'JIRA Issue ID(s) (comma/space separated, default is branch name):',
      name: 'issues',
      type: 'input',
      validate: validateIssues,
    },
    {
      choices: workflowChoices,
      default: 'in-progress',
      message: 'Workflow command:',
      name: 'workflow',
      type: 'list',
    },
    {
      choices: createCommitTypeChoices(),
      message: `Select the type of change that you're committing:`,
      name: 'type',
      type: 'list',
    },
    {
      choices: hasUserDefinedScopes
        ? createScopeChoices(config, pkg)
        : undefined,
      message:
        'What is the scope of this change (e.g. component)? (press enter to skip)',
      name: 'scope',
      type: hasUserDefinedScopes ? 'list' : 'input',
    },
    {
      message: 'Write a short, imperative tense description of the change:',
      name: 'subject',
      type: 'input',
      validate: validateSubject,
    },
    {
      message:
        'Provide a longer description of the change: (press enter to skip)',
      name: 'body',
      type: 'input',
    },
  ].map((question) => {
    return {
      ...question,
      message: addEOL(question.message),
    };
  });
};
