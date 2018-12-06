#!/bin/sh

dst_path="./components/docs/docs.mdx"

curl -o "${dst_path}" https://raw.githubusercontent.com/5t111111/nextjs-docs-ja-omegat/master/target/docs.mdx
