VERSION=`node -e "console.log(require('./package.json').version)"`
NAME="seaters-sdk";
TMP_DIST="tmp/deploy";

echo "building ${NAME} version ${VERSION}"

npm install
npm run typings install
npm run gulp build:bundle
#TODO run all tests
rm -rf tmp
mkdir -p tmp
cp dist/seaters.bundle.* tmp/
cp -r examples tmp/
cp -r assets tmp/
cd tmp
find . -not -path . | tar -cvzf "${NAME}-${VERSION}.tar.gz" --files-from -
cd ..