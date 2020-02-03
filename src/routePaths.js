export const getHomePath = () => '/'

// Investment paths
export const getNewInvestmentPath = () => '/opportunite/ajout'

// Property paths
export const getNewPropertyPath = () => '/opportunite/ajout'
export const getEditPropertyPath = (propertyId = ':propertyId') =>
  `/opportunite/edition/${propertyId}`

// User paths
export const getLoginPath = () => '/connexion'
export const getLogoutPath = () => '/deconnexion'
export const getRegisterPath = () => '/inscription'
