#!/bin/sh

pushd $NEXT_SITE_REPOSITORY_PATH > /dev/null
latest_commit=$(git log --pretty=format:'%h' -n 1 -- components/docs/docs.mdx)
echo $latest_commit
popd > /dev/null

