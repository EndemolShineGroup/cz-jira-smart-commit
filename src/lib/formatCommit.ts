import os from 'os';

import { Answers } from 'inquirer';
import compact from 'lodash.compact';
import wrap from 'word-wrap';

const wrapOptions = {
  indent: '',
  newline: '\n',
  trim: true,
  width: 80,
};

export default function formatCommit(answers: Answers) {
  const {
    body,
    isIssueAffected = true,
    issues,
    scope,
    subject,
    type = 'feat',
    workflow = 'in-progress',
  } = answers;

  // Hard limit this line
  const commitHeader = `${type}${
    scope ? `(${scope})` : ''
  }: ${subject.trim()}`.slice(0, wrapOptions.width);

  // Wrap these lines at 100 characters
  const commitBody = wrap(body, wrapOptions);

  // JIRA issues and workflow
  const commitFooter = isIssueAffected ? `${issues} #${workflow}` : '';

  const message = compact([commitHeader, commitBody, commitFooter]);

  return message.join(os.EOL + os.EOL);
}
