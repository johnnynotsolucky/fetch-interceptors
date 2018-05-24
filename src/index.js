const withInterceptors = (fetchF, ...interceptors) => (input, init) => {
  return fetchF(input, init).then(response =>
    interceptors.reduce(
      (acc, interceptor) =>
        interceptor({
          request: { input, init },
          ...acc,
        }),
      response
    )
  )
}

export default withInterceptors
