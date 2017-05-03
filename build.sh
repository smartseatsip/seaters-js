#!/usr/bin/env bash

VERSION=`node -e "console.log(require('./package.json').version)"`
NAME="seaters-sdk";
TMP_DIST="tmp/deploy";

echo "building ${NAME} version ${VERSION}"

npm install
npm run gulp clean
npm run gulp build:bundle
npm run gulp build:mock-bundle
#TODO run all tests
rm -rf tmp
mkdir -p tmp/seaters-sdk
cp dist/seaters*.bundle.* tmp/seaters-sdk/
cp -r examples tmp/seaters-sdk/
cd tmp
#tar -czf "${NAME}-${VERSION}.tgz" seaters-sdk
# fix version for now - too many redeploys
tar -czf "${NAME}-1.0.0.tgz" seaters-sdk
cd ..
