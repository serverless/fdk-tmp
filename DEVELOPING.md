# Developing

## Required Tooling
- node4.3.2+
- yarn0.21.0+

## Getting started

#### Check out from github
```bash
git clone https://github.com/serverless/fdk.git
```

#### Install dev dependencies
``` bash
cd ./fdk
yarn install
```


## Try out changes

#### In a test project
You'll want to test changes to the `fdk` occasionally in a test project. To do so, follow these steps...

1) Have the `fdk` code checked out from github and dev dependencies installed.
2) Install the fdk from path to your project.
```
cd path/to/your/project
npm install ../path/to/fdk
```
3) The `fdk` will auto build before installing.
4) Run your code!

## Linting
```bash
npm run lint
```
