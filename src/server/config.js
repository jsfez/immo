import convict from 'convict'

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  server: {
    sessionSecret: {
      doc: 'Session secret',
      format: String,
      default: 'the secret is here',
    },
    port: {
      doc: 'The server port number',
      format: 'port',
      default: 3000,
      env: 'PORT',
    },
  },
  pg: {
    connection: {
      host: {
        doc: 'Postgres user',
        format: String,
        default: 'localhost',
      },
      user: {
        doc: 'Postgres user',
        format: String,
        default: 'prisma',
      },
      database: {
        doc: 'Postgres database',
        format: String,
        default: 'prisma',
      },
    },
  },
})

export default config
