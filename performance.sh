#!/bin/bash

url="$1"


curl -w @report-format.txt -o /dev/null -s "$url"

