import { slice, split } from 'mudash'

export default function provider(nativeContext) {
  let name = 'default'
  //TODO BRN: figure out if we're in azure, openwhisk, google or default
  if (process.env.AWS_DEFAULT_REGION) {
    name = 'aws'
  }
  return {
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
