import fs from 'fs';
import os from 'os';
import path from 'path';

const conventionalCommitTypes: ConventionalCommitTypes = require('conventional-commit-types');
import _ from 'lodash';

import {
  CommitizenConfig,
  ConventionalCommitTypes,
  PackageJson,
} from './types';

export function addEOL(message: string) {
  return `${message}${os.EOL}`;
}

export function findLongest(strings: string[]): number {
  // const keys = Object.keys(object);

  return (
    _.max(
      _.map(strings, (key) => {
        return key.length;
      }),
    ) || 0
  );
}

export function formatGitBranchName(branchName: string = '') {
  return branchName
    .replace('feature/', '') // Get rid of `feature/` prefix
    .replace('fix/', '') // Get rid of `fix/` prefix
    .toLocaleUpperCase(); // Uppercase issue IDs
}

// Look for `.czrc` and require it
export function loadConfig(projectPath: string = process.cwd()) {
  const configPath = path.join(projectPath, '.czrc');
  try {
    const file = fs.readFileSync(configPath);
    return JSON.parse(file.toString('utf8'));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(
      `Could not load project's Commitizen configuration from ${configPath}.`,
    );
  }
}

export function createCommitTypeChoices() {
  const keys = Object.keys(conventionalCommitTypes.types);
  const choicesMaxLength = findLongest(keys) + 1;
  return _.map(conventionalCommitTypes.types, function(type, key) {
    return {
      name: _.padEnd(key + ':', choicesMaxLength) + ' ' + type.description,
      value: key,
    };
  });
}

export function createScopeChoices(config: CommitizenConfig, pkg: PackageJson) {
  const userDefinedScopes = _.get(config[pkg.name], `scopes`, {});
  const scopeChoicesMaxLength = findLongest(Object.keys(userDefinedScopes)) + 1;
  return _.map(userDefinedScopes, function(description, scope) {
    return {
      name: _.padEnd(scope + ':', scopeChoicesMaxLength) + ' ' + description,
      value: scope,
    };
  });
}
