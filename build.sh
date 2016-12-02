VERSION=`node -e "console.log(require('./package.json').version)"`
NAME="seaters-sdk";
TMP_DIST="tmp/deploy";

echo "building ${NAME} version ${VERSION}"

npm install
npm run typings install
npm run gulp update-translations
npm run gulp build:bundle
#TODO run all tests
rm -rf tmp
mkdir -p tmp/seaters-sdk
cp dist/seaters.bundle.* tmp/seaters-sdk/
cp -r examples tmp/seaters-sdk/
cp -r assets tmp/seaters-sdk/
cd tmp
tar -czf "${NAME}-${VERSION}.tgz" seaters-sdk
cd ..