export default (input?: string) => {
  if (!input) {
    return 'Must specify subject';
  }
  if (input.length > 70) {
    return 'Subject should be 70 or less characters';
  }
  return true;
};
