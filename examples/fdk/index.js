import { fdk } from '../../'

//const handler = fdk().handler((event) => { console.log(event) })

const app = fdk()
  .use((context) => { console.log('context:', context) })

console.log('app:', app)
