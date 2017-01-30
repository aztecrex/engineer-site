#!/bin/bash

echo "[TRACE] starting decrypt"

plainfile=$(mktemp)
binfile=$(mktemp)

echo "[TRACE] binfile=${binfile}"
echo "[TRACE] plainfile=${plainfile}"

< ${1}.encrypted > ${binfile} base64 -D

echo "[TRACE] converted to binary"

aws kms decrypt \
  --ciphertext-blob fileb://${binfile} \
  --query Plaintext \
  --output text \
  | base64 -D \
  | tee ${plainfile}

echo "[TRACE] decrypted"

mv ${plainfile} ${1}

echo "[TRACE] moved"

rm -f ${binfile}

echo "[TRACE] deleted"
