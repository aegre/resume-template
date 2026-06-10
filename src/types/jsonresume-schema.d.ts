declare module "@jsonresume/schema" {
  type ValidationError = {
    property?: string
    message?: string
    stack?: string
  }

  export function validate(
    resume: unknown,
    callback: (errors: ValidationError[] | null, valid: boolean) => void
  ): void

  export const schema: object
  export const jobSchema: object
}
