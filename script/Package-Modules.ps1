New-Item ./tmp -ItemType Directory -Force
New-Item ./dist -ItemType Directory -Force
Copy-Item -Path ./src/index.js -Destination ./tmp
Copy-Item -Path ./node_modules/moment -Destination ./tmp/node_modules/moment -Recurse
Copy-Item -Path ./node_modules/moment-timezone -Destination ./tmp/node_modules/moment-timezone -Recurse
Compress-Archive -Path ./tmp/* -DestinationPath ./dist/package.zip -Force
Remove-Item ./tmp -Force -Recurse
