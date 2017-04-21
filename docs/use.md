```js
import { use } from '@serverless/fdk'

const middleware = use(
  (next) => (data) => {
    return next(data)
  },
  (next) => async (data) => {
    return await next(data)
  },
  (next) => function* (data) {
    return yield next(data)
  }
)

middleware((data) => {
  console.log('optional final handler')
  return data
}).then((result) => console.log(result))
```
