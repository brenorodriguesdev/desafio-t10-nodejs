export const createParticipationParamsSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    participation: {
      type: 'integer'
    }
  },
  required: ['firstName', 'lastName', 'participation']
}
