#!/bin/bash

set -e

npm i
npm run lint:fix
npm run build
npm run format
npm run test
