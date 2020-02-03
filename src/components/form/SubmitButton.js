import React from 'react'
import { Button } from '../Button'
import { useFormState } from 'react-final-form'

export function SubmitButton({ children, submittingLabel, ...props }) {
  const { valid, submitting } = useFormState({
    subscription: { valid: true, submitting: true },
  })

  return (
    <Button
      type="submit"
      onClick={() => valid}
      disabled={submitting}
      mx={0}
      {...props}
    >
      {submitting ? submittingLabel : children}
    </Button>
  )
}
