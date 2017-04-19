import { slice, split } from 'mudash'

export default function provider(nativeContext) {
  let name = 'default'
  //TODO BRN: figure out if we're in azure, openwhisk, google or default
  if (process.env.AWS_DEFAULT_REGION) {
    name = 'aws'
  }
  let info = {}
  if (name === 'aws') {
    if (nativeContext) {
      info = parseAWSARN(nativeContext.invokedFunctionArn)
    }
  }
  return {
    info,
    name
  }
}

//arn:aws:<service>:<region>:<account_id>:<resource>
function parseAWSARN(arn) {
  const [
    service,
    region,
    accountId,
    resource
  ] = slice(split(arn, ':'), 2)
  return {
    service,
    region,
    accountId,
    resource
  }
}
