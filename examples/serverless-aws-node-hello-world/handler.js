import fdk from 'fdk'

const hello = fdk()
  .handler(() => "Hello World")

export hello
