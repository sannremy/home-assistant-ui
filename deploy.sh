#!/bin/bash

source .env.local

echo "Building..."
yarn build

branch=$(git branch --show-current)
echo "Deploying to Home Assistant..."
lftp -u $FTP_USER,$FTP_PASSWORD $FTP_HOST << EOF
mirror -R out/ /config/www
bye
EOF
fi

echo "Done."
