import os from 'os';

import formatCommit from './formatCommit';

import * as FIXTURE from './__fixtures__/commitAnswers';

describe('#formatCommit', () => {
  it('should be a function', () => {
    expect(typeof formatCommit).toEqual('function');
  });

  it('should perform a full commit', () => {
    const message = [
      'build(api): This took waaaaay too long',
      FIXTURE.formattedBody,
      'CZ-234 CZ-235 #done',
    ].join(os.EOL + os.EOL);
    const result = formatCommit(FIXTURE);
    expect(result).toEqual(message);
  });

  it('should commit without any issue IDs', () => {
    const message = [
      'build(api): This took waaaaay too long',
      FIXTURE.formattedBody,
    ].join(os.EOL + os.EOL);
    const result = formatCommit({
      ...FIXTURE,
      isIssueAffected: false,
    });
    expect(result).toEqual(message);
  });

  it('should commit without a scope', () => {
    const message = [
      'build: This took waaaaay too long',
      FIXTURE.formattedBody,
      'CZ-234 CZ-235 #done',
    ].join(os.EOL + os.EOL);
    const result = formatCommit({
      ...FIXTURE,
      scope: undefined,
    });
    expect(result).toEqual(message);
  });

  it('should commit without a body', () => {
    const message = [
      'build(api): This took waaaaay too long',
      'CZ-234 CZ-235 #done',
    ].join(os.EOL + os.EOL);
    const result = formatCommit({
      ...FIXTURE,
      body: undefined,
    });
    expect(result).toEqual(message);
  });

  it('should use the defaults if type and/or workflow are not defined', () => {
    const result = formatCommit({
      issues: FIXTURE.issues,
      subject: FIXTURE.subject,
    });
    const message = [
      'feat: This took waaaaay too long',
      'CZ-234 CZ-235 #in-progress',
    ].join(os.EOL + os.EOL);
    expect(result).toEqual(message);
  });
});
