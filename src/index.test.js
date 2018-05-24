import test from 'ava'
import withInterceptors from '../'

const url = 'https://foo.com/bar'
const mockFetch = response => (input, init) => Promise.resolve(response)

test('wraps a fetch function with no interceptors', t => {
  return withInterceptors(mockFetch({ bar: 'baz' }))(url).then(response => {
    t.deepEqual(response, { bar: 'baz' })
  })
})

test('wraps a fetch function and executes an interceptor', t => {
  const interceptor = response => {
    t.deepEqual(response, {
      request: {
        input: url,
        init: { foo: 'bar' },
      },
      bar: 'baz',
    })
    return response
  }

  return withInterceptors(mockFetch({ bar: 'baz' }), interceptor)(url, {
    foo: 'bar',
  })
})

test('wraps a fetch function with multiple interceptors', t => {
  const interceptor = newResponse => response => newResponse

  return withInterceptors(
    mockFetch({ foo: 'bar' }),
    interceptor({ bar: 'baz' }),
    interceptor({ baz: 'foo' })
  )(url).then(response => {
    t.deepEqual(response, { baz: 'foo' })
  })
})
