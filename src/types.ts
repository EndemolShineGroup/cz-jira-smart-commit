import { Inquirer } from 'inquirer';

export type CommitCallback = (commitMessage: string) => void;
export type Prompter = (cz: Inquirer, commit: CommitCallback) => void;

export interface CommitizenConfig {
  [key: string]: string | AdapterConfig | undefined;
  path: string;
  '@endemolshinegroup/cz-jira-smart-commit'?: AdapterConfig;
}

export interface ConventionalCommitTypes {
  types: {
    [key: string]: {
      description: string;
      name: string;
    };
  };
}

export interface AdapterConfig {
  pullRequestsOnly?: boolean;
  scopes: {
    [key: string]: string;
  };
}

export interface PackageJson {
  name: string;
}

export interface Answers {
  type: string;
  scope: string;
  subject: string;
  body: string;
  issues: string;
  workflow: string;
}
