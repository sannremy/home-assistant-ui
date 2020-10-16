#!/bin/bash

source .env.local

echo "Building..."

yarn build

echo "Deploying to Home Assistant..."

lftp -u $HA_FTP_USERNAME,$HA_FTP_PASSWORD $HA_FTP_HOST << EOF
mirror -R out/ /config/www
bye
EOF

echo "Done."
