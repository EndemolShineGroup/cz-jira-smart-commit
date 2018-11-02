import validateIssues from './validateIssues';

describe('#validateIssues', () => {
  it('prevents commits if no issue IDs specified', () => {
    expect(validateIssues()).toContain('specify issue IDs');
  });

  it('prevents commits to the master and develop branches', () => {
    expect(validateIssues('DEVELOP')).toContain('should not commit directly');
    expect(validateIssues('MASTER')).toContain('should not commit directly');
  });

  it('allows commits with a single issue ID', () => {
    expect(validateIssues('CZ-12')).toBeTruthy();
  });

  it('allows commits with a multiple issue IDs, comma-separated', () => {
    expect(validateIssues('CZ-12,CZ-13,CZ-14')).toBeTruthy();
  });

  it('allows commits with a multiple issue IDs, space-separated', () => {
    expect(validateIssues('CZ-12 CZ-13 CZ-14')).toBeTruthy();
  });
});
