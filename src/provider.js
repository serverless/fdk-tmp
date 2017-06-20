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
    dud1,
    dud2,
    service,
    region,
    accountId,
    resource
  ] = arn
  return {
    service,
    region,
    accountId,
    resource
  }
}
