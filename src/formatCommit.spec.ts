import os from 'os';

import formatCommit from './formatCommit';

describe('#formatCommit', () => {
  // const message = 'sample commit message';
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

  // it('should not commit without a workflow', () => {
  //   expect(const result = formatCommit((result) => {
  //     return result;
  //   }, {issues, type, subject})).to.throw(new Error('A workflow must be defined'));
  //   // const result = formatCommit((result) => {
  //   //   expect(result).to.throw(new Error('A workflow must be defined'));
  //   // }, {issues, type, subject});
  // });
  // // it('should commit without a subject', () => {
  // //   const result = formatCommit((result) => {
  // //     expect(result).toEqual('CZ-234 CZ-235 #done')
  // //   }, {issues, workflow});
  // // });
});
