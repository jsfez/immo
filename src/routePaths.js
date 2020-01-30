export const getHomePath = () => '/'

// User paths
export const getLoginPath = () => '/connexion'
export const getLogoutPath = () => '/deconnexion'
export const getRegisterPath = () => '/inscription'

// Property paths
export const getNewPropertyPath = () => '/opportunite/ajout'
export const getEditPropertyPath = (propertyId = ':propertyId') =>
  `/opportunite/edition/${propertyId}`
