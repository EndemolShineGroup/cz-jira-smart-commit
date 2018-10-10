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
      name: '@endemolshinegroup/jira-project',
    };
  });

  it('creates valid prompts', () => {
    const result = createPrompts({ config, pkg });
    expect(result).toHaveLength(6);
  });
});
