#!/bin/bash


source secrets.deploy

aws cloudformation create-stack \
  --stack-name engineer-site-pipeline \
  --template-body file://deploy/pipeline.yml \
  --parameters \
    "ParameterKey=GithubRepo,ParameterValue=${GITHUB_REPO}" \
    "ParameterKey=GithubUser,ParameterValue=${GITHUB_USER}" \
    "ParameterKey=GithubToken,ParameterValue=${GITHUB_TOKEN}" \
    "ParameterKey=PipelineRole,ParameterValue=${PIPELINE_SERVICE_ROLE}" \
    "ParameterKey=BuildRole,ParameterValue=${BUILD_SERVICE_ROLE}" \
    "ParameterKey=ArtifactStore,ParameterValue=${ARTIFACT_STORE}"
