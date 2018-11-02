import { Question } from 'inquirer';
import find from 'lodash.find';

import createPrompts from './createPrompts';
import { CommitizenConfig, PackageJson } from './types';

describe('#createPrompts', () => {
  let config: CommitizenConfig;
  let pkg: PackageJson;

  beforeEach(() => {
    config = {
      path: '@endemolshinegroup/cz-jira-smart-commit',
    };
    pkg = {
      name: '@endemolshinegroup/cz-jira-smart-commit',
    };
  });

  it('creates valid prompts', () => {
    const result = createPrompts({ config, pkg });
    expect(result).toHaveLength(7);
    const prompt = find(result, ['name', 'workflow']) as Question;
    expect(prompt.choices).toHaveLength(3);
    const scopePrompt = find(result, ['name', 'scope']) as Question;
    expect(scopePrompt.choices).toBeUndefined();
  });

  it('loads user-defined scopes if any are found', () => {
    const pullRequestsConfig = {
      ...config,
      '@endemolshinegroup/cz-jira-smart-commit': {
        scopes: {
          api: 'API',
          site: 'Site',
        },
      },
    };
    const result = createPrompts({ config: pullRequestsConfig, pkg });
    expect(result).toHaveLength(7);

    const scopePrompt = find(result, ['name', 'scope']) as Question;
    expect(scopePrompt.choices).toHaveLength(2);
  });

  it('only shows in-progress and in-review workflows when pullRequestsOnly=true', () => {
    const pullRequestsConfig = {
      ...config,
      '@endemolshinegroup/cz-jira-smart-commit': {
        pullRequestsOnly: true,
      },
    };
    const result = createPrompts({ config: pullRequestsConfig, pkg });
    expect(result).toHaveLength(7);

    const workflowPrompt = find(result, ['name', 'workflow']) as Question;
    expect(workflowPrompt.choices).toHaveLength(2);
    expect(workflowPrompt.choices).toEqual(['in-progress', 'in-review']);
  });
});
