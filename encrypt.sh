#!/bin/bash

aws kms encrypt \
  --key-id alias/secrets \
  --plaintext file://${1}\
  --query CiphertextBlob \
  --output text > ${1}.encrypted
