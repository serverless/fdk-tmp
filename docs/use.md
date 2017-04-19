```js
import { use } from '@serverless/fdk'

const middleware = use(
  (next) => (data) => {

  },
  (next) => (data) => {

  },
  (next) => (data) => {

  }
)

middleware
  .then((result) => console.log(result))
```
