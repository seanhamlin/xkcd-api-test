#!/usr/bin/env bash

TIMESTAMP=$(date +%s)
ENV="PROD"
LOGLEVEL="error"

# Remove any previous test run files.
rm -f fail.png
rm -f log.xml

for i in "$@"
do
case $i in
    -e=*|--env=*)
    ENV="${i#*=}"
    ;;
    -v|--verbose)
    LOGLEVEL="debug"
    ;;
    *)
    # unknown option
    ;;
esac
done

if [ "${ENV}" == "TEST" ]; then
    SITE="http://test.xkcd.com"
else
    SITE="http://xkcd.com"
fi

# Kick off CasperJS.
casperjs test tests --site="${SITE}" --timestamp=${TIMESTAMP} --logLevel="${LOGLEVEL}" --ignore-ssl-errors=true --includes=functions.js --xunit=log.xml
