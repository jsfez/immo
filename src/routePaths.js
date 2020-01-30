export const getHomePath = () => '/'
export const getNewPropertyPath = () => '/property/add'
export const getEditPropertyPath = (propertyId = ':propertyId') =>
  `/property/edit/${propertyId}`
export const getLoginPath = () => '/login'
export const getLogoutPath = () => '/logout'
export const getRegisterPath = () => '/signup'
