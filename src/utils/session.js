import jwt from 'jsonwebtoken'
export const APP_SECRET = 'op-prisma-graphql-project'

function getUserIdFromAuthorization(Authorization) {
  const token = Authorization.replace('Bearer ', '')
  const { userId } = jwt.verify(token, APP_SECRET)
  return userId
}

export function getUserIdOrThrowError(context) {
  const Authorization = context.request.get('Authorization')
  if (!Authorization) {
    throw new Error('Not authenticated')
  }
  return getUserIdFromAuthorization(Authorization)
}

export function getUserIdIfExist(context) {
  const Authorization = context.request.get('Authorization')
  if (!Authorization) {
    return null
  }
  return getUserIdFromAuthorization(Authorization)
}

function generateCode(codeLen) {
  return Math.random()
    .toString(36)
    .substring(2, codeLen + 2)
}

function generateToken() {
  return generateCode(13) + generateCode(13)
}

export function generateSalt() {
  return generateToken()
}
