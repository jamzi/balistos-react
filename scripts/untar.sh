#!/usr/bin/env sh
set -x

echo "untar ..."

export NODE_ENV=production
export NVM_BIN=$HOME/.nvm/versions/node/v6.9.0/bin

cd /var/www/balistos&& \
tar zxvf package.tgz -C . && \