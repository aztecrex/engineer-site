#!/bin/bash

uname=$(uname);

if [ "$uname" = "Darwin" ]; then
  decode_opt="-D"
else
  decode_opt="-d"
fi

plainfile=$(mktemp)
binfile=$(mktemp)

< ${1}.encrypted > ${binfile} base64 "$decode_opt"

aws kms decrypt \
  --ciphertext-blob fileb://${binfile} \
  --query Plaintext \
  --output text \
  | base64 "$decode_opt" \
  | tee ${plainfile}

mv ${plainfile} ${1}

rm -f ${binfile}
