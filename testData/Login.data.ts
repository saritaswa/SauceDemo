export const TEST_USERS = {
  STANDARD: {
      username: 'standard_user',
      password: 'secret_sauce',
      description: 'Standard user with full access'
  },
  LOCKED: {
      username: 'locked_out_user',
      password: 'secret_sauce',
      description: 'Locked out user - cannot login'
  },
  PROBLEM_USER: {
      username: 'locked_out_user',
      password: 'secret_sauce',
      description: 'Locked out user - cannot login'
  },
  PERFORMANCE_GLITCH_USER: {
      username: 'locked_out_user',
      password: 'secret_sauce',
      description: 'Locked out user - cannot login'
  },
  ERROR_USER: {
      username: 'locked_out_user',
      password: 'secret_sauce',
      description: 'Locked out user - cannot login'
  },
  GLITCH_USER: {
      username: 'locked_out_user',
      password: 'secret_sauce',
      description: 'Locked out user - cannot login'
  }

} as const;

export type UserType = keyof typeof TEST_USERS;