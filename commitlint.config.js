module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'FEATURE',
      'FIX',
      'DOCS',
      'REFACTOR',
      'TEST',
      'CI',
      'HOTFIX',
      'CHORE',
      'RELEASE',
      'SP',
      'BUGREPORT',
      'MERGE',
      'STYLES',
      'CONFIGURATION',
    ]],
    'type-case': [2, 'always', 'upper-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100]
  }
};
