#!/usr/bin/env bash

if [ $# -eq 0 ]; then
    echo "No arguments supplied, please provide the houzz folder name, Eg: jukwaa, houzz-saas-graph"
    exit 1
fi

HOUZZ_DIR=$HOME/houzz/$1

# Exit if the supplied folder doesn't exist in $HOME/houzz
if [ ! -d "$HOUZZ_DIR" ]; then
    echo "$HOUZZ_DIR doesn't exist"
    exit 1
fi

GRAPHIQL_DIR=$HOUZZ_DIR/apps/graphouzz-middlelayer/graphiql
# Creates the graphouzz-ui folder if it doesn't exist
if [ -d "$HOUZZ_DIR/apps/graphouzz-middlelayer" ]; then
    mkdir -p $GRAPHIQL_DIR
elif [ -d "$HOUZZ_DIR/apps/graphql" ]; then
    GRAPHIQL_DIR=$HOUZZ_DIR/apps/graphql/graphiql
    mkdir -p $GRAPHIQL_DIR
fi

# Copy package.json and src files over to graphouzz-ui folder
echo $GRAPHIQL_DIR
rsync -avr $HOME/houzz/graphouzz-ui/src/* $GRAPHIQL_DIR --exclude=$HOME/houzz/graphouzz-ui/src/main.jsx && echo "Successfully copied graphouzz-ui files"

