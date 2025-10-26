export const TEST_INFO = {
  INFO: {
      firstName: 'Saru',
      lastName: 'Swami',
      zipCode: '2167'
  },
} as const;

export type InfoType = keyof typeof TEST_INFO;