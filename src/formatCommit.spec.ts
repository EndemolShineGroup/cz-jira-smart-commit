import os from 'os';

import formatCommit from './formatCommit';

import {
  body,
  formattedBody,
  issues,
  scope,
  subject,
  type,
  workflow,
} from './__fixtures__/commitAnswers';

describe('#formatCommit', () => {
  it('should be a function', () => {
    expect(typeof formatCommit).toEqual('function');
  });

  it('should perform a full commit', () => {
    const message = [
      'build(api): This took waaaaay too long',
      formattedBody,
      'CZ-234 CZ-235 #done',
    ].join(os.EOL + os.EOL);
    const result = formatCommit({
      body,
      issues,
      scope,
      subject,
      type,
      workflow,
    });
    expect(result).toEqual(message);
  });

  it('should commit without a scope', () => {
    const message = [
      'build: This took waaaaay too long',
      formattedBody,
      'CZ-234 CZ-235 #done',
    ].join(os.EOL + os.EOL);
    const result = formatCommit({ issues, workflow, type, subject, body });
    expect(result).toEqual(message);
  });

  it('should commit without a body', () => {
    const message = [
      'build: This took waaaaay too long',
      'CZ-234 CZ-235 #done',
    ].join(os.EOL + os.EOL);
    const result = formatCommit({ issues, workflow, type, subject });
    expect(result).toEqual(message);
  });

  it('should use the defaults if type and/or workflow are not defined', () => {
    const result = formatCommit({ issues, subject });
    const message = [
      'feat: This took waaaaay too long',
      'CZ-234 CZ-235 #in-progress',
    ].join(os.EOL + os.EOL);
    expect(result).toEqual(message);
  });
});
