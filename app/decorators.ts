export function handleErrors() {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args)
      } catch (error) {
        const context = args.find((arg) => arg.response)
        const response = context?.response

        if (!response) {
          return response.status(500).json({ message: 'Internal server error' })
        }

        if (error.code === 'E_ROW_NOT_FOUND') {
          return response.notFound({ message: 'Resource not found' })
        }

        if (error.messages) {
          return response.badRequest(error.messages)
        }

        return response.status(500).json({ message: 'Internal server error' })
      }
    }

    return descriptor
  }
}

export function HandleErrors() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const methodNames = Object.getOwnPropertyNames(constructor.prototype)

    methodNames.forEach((methodName) => {
      if (methodName === 'constructor') return

      const descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, methodName)
      if (!descriptor || typeof descriptor.value !== 'function') return

      const originalMethod = descriptor.value
      descriptor.value = async function (...args: any[]) {
        try {
          return await originalMethod.apply(this, args)
        } catch (error) {
          const context = args.find((arg) => arg.response)
          const response = context?.response

          if (!response) {
            return response.status(500).json({ message: 'Internal server error' })
          }

          if (error.code === 'E_ROW_NOT_FOUND') {
            return response.notFound({ message: 'Resource not found' })
          }

          if (error.messages) {
            return response.badRequest(error.messages)
          }

          return response.status(500).json({ message: 'Internal server error' })
        }
      }

      Object.defineProperty(constructor.prototype, methodName, descriptor)
    })

    return constructor
  }
}
