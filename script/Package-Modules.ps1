New-Item ./tmp -ItemType Directory -Force
New-Item ./dist -ItemType Directory -Force
Copy-Item -Path ./index.js -Destination ./tmp
Copy-Item -Path ./node_modules/moment -Destination ./tmp/node_modules/moment -Recurse
Copy-Item -Path ./node_modules/moment-timezone -Destination ./tmp/node_modules/moment-timezone -Recurse

