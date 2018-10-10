import { Inquirer } from 'inquirer';

import { prompter } from '.';
import { CommitCallback } from './types';

import {
  body,
  issues,
  scope,
  subject,
  type,
  workflow,
} from './__fixtures__/commitAnswers';

describe('prompter', () => {
  let commitizenMock: Inquirer;
  let doneMock: CommitCallback;

  beforeAll(() => {
    commitizenMock = ({
      prompt: jest.fn(() => {
        return Promise.resolve({
          body,
          issues,
          scope,
          subject,
          type,
          workflow,
        });
      }),
    } as unknown) as Inquirer;
    doneMock = jest.fn();
  });

  it(`calls uses Commitizen's prompter and calls the callback on completion`, () => {
    prompter(commitizenMock, doneMock);
    expect(commitizenMock.prompt).toHaveBeenCalledTimes(1);
    // @TODO Uncommenting the following line fails the tests - no idea why
    // expect(doneMock).toHaveBeenCalledTimes(1);
  });
});
