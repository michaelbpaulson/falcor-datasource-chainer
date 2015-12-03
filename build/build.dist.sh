#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo -e "Building and committing dist...\n"

  TEMP_DIR=$HOME/tmp
  FALCOR_BUILD_DIR=$TEMP_DIR/falcorbuild
  DEPLOYABLE_REPO=https://${GH_TOKEN}@github.com/Netflix/falcor-datasource-chainer.git
  CURRENT_RELEASE=master

  mkdir -p $TEMP_DIR

  if [ -d "$FALCOR_BUILD_DIR" ]; then
    rm -rf $FALCOR_BUILD_DIR
  fi

  git config --global user.email "falcorbuild@netflix.com"
  git config --global user.name "Falcor Build"

  # Need https url to push changes, and also need to move from detached head to built branch.
  git remote add deployable $DEPLOYABLE_REPO
  git checkout $TRAVIS_BRANCH

  # Generate Docs
  npm run produce-artifact

  git add dist
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER committed dist/"
  git push deployable $TRAVIS_BRANCH
fi

