mkdir -p dist
cp README.md dist/README.md
rsync -avz --exclude *.js --exclude __tests__ --exclude node_modules src/ dist/
babel src -d dist --source-maps
