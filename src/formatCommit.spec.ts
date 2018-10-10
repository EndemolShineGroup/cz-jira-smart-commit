import os from 'os';

import formatCommit from './formatCommit';

describe('#formatCommit', () => {
  const issues = 'CZ-234 CZ-235';
  const workflow = 'done';
  const subject = 'This took waaaaay too long';
  const type = 'build';
  const scope = 'api';
  const body =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  const formattedBody = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
    'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
    'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in',
    'culpa qui officia deserunt mollit anim id est laborum.',
  ].join(os.EOL);

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
      issues,
      workflow,
      type,
      scope,
      subject,
      body,
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
