import os from 'os';

import { Answers } from 'inquirer';
import compact from 'lodash.compact';
import wrap from 'word-wrap';

export default function formatCommit(answers: Answers) {
  const maxLineWidth = 80;
  const wrapOptions = {
    indent: '',
    newline: '\n',
    trim: true,
    width: maxLineWidth,
  };

  const {
    type = 'feat',
    scope = '',
    body,
    subject,
    issues,
    workflow = 'in-progress',
  } = answers;

  // Hard limit this line
  const commitHeader = `${type}${
    scope ? `(${scope})` : ''
  }: ${subject.trim()}`.slice(0, maxLineWidth);

  // Wrap these lines at 100 characters
  const commitBody = wrap(body, wrapOptions);

  // JIRA issues and workflow
  const commitFooter = `${issues} #${workflow}`;

  const message = compact([commitHeader, commitBody, commitFooter]);

  return message.join(os.EOL + os.EOL);
}
