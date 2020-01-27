import React from 'react'

const Burger = props => (
  <svg width={24} height={24} {...props}>
    <path
      d="M3 18h18v-2H3v2zM3 8h18V6H3v2zm0 5h18v-2H3v2z"
      fill="#2A303B"
      fillRule="evenodd"
    />
  </svg>
)

export default Burger
