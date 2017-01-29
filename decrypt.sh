#!/bin/bash

plainfile=$(mktemp)
binfile=$(mktemp)
< encrypted.${1} > ${binfile} base64 -D

aws kms decrypt \
  --ciphertext-blob fileb://${binfile} \
  --query Plaintext \
  --output text \
  | base64 -D \
  | tee ${plainfile}

mv ${plainfile} ${1}
rm -f ${binfile}
