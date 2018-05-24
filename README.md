# fetch() Response Interceptors

Wrap JavaScript's `fetch()` to add response interceptors.

```javascript
import withInterceptors from 'fetch-interceptors'

const wrappedFetch = withInterceptors(
  fetch,
  ({ request, ...response }) => {
    return {
      ...response,
      // moar props
    }
  },
  response => {
    // 🤒
    return response
  }
)

wrappedFetch('https://httpbin.org/get?foo=bar')
  .then(response => {
    console.log(response)
    // { "foo": "bar" }
  })
```
