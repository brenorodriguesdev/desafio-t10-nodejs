export const participationPath = {
  post: {
    tags: ['Participation'],
    summary: 'API para criar participation',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createParticipationParams'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Participation criado'
      }
    }
  },
  get: {
    tags: ['Participation'],
    summary: 'API para retornar todos os participations',
    responses: {
      200: {
        description: 'Participations retornados'
      }
    }
  }
}
