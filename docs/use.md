```js
import { use } from 'fdk'

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
