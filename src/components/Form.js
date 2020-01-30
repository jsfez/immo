import React from 'react'
import { FORM_ERROR } from 'final-form'
import {
  Form as FinalForm,
  FormSpy,
  Field,
  useField,
  useFormState,
} from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import createFocusDecorator from 'final-form-focus'
import arrayMutators from 'final-form-arrays'
import { Alert } from './Alert'
import { Button } from './Button'

export { FORM_ERROR }
export { FormSpy, Field, useField, useFormState, FieldArray }

export function trimStringValues(fields) {
  return Object.keys(fields).reduce((formattedFields, fieldName) => {
    formattedFields[fieldName] =
      typeof value === 'string' ? fields[fieldName].trim() : fields[fieldName]
    return formattedFields
  }, {})
}

export function FormSuccessAlert(props) {
  const { submitSucceeded } = useFormState({
    subscription: { submitSucceeded: true },
  })
  return submitSucceeded ? <Alert variant="success" {...props} /> : null
}

export function FormErrorAlert(props) {
  const { submitError } = useFormState({ subscription: { submitError: true } })
  return submitError ? (
    <Alert variant="danger" {...props}>
      {submitError}
    </Alert>
  ) : null
}

export function SubmitButton({ children, submittingLabel, ...props }) {
  const { valid, submitting } = useFormState({
    subscription: { valid: true, submitting: true },
  })

  return (
    <Button
      type="submit"
      onClick={() => valid}
      disabled={submitting}
      {...props}
    >
      {submitting ? submittingLabel : children}
    </Button>
  )
}

export const DEFAULT_FORM_ERROR_MESSAGE = 'Oups une erreur est survenue.'

export const Form = React.forwardRef(
  (
    {
      children,
      subscription = {},
      mutators = {},
      decorators = [],
      onSubmit,
      ...props
    },
    ref,
  ) => {
    const focusOnErrors = React.useMemo(() => createFocusDecorator(), [])

    return (
      <FinalForm
        decorators={[...decorators, focusOnErrors]}
        mutators={{ ...arrayMutators, ...mutators }}
        subscription={subscription}
        onSubmit={async (...args) => {
          try {
            return await onSubmit(...args)
          } catch (error) {
            return { [FORM_ERROR]: error || DEFAULT_FORM_ERROR_MESSAGE }
          }
        }}
        {...props}
      >
        {renderProps => {
          if (ref) {
            ref.current = renderProps.form
          }
          return (
            <form noValidate onSubmit={renderProps.handleSubmit}>
              {typeof children === 'function'
                ? children(renderProps)
                : children}
            </form>
          )
        }}
      </FinalForm>
    )
  },
)
