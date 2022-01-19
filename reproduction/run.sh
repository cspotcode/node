#!/usr/bin/env bash
set -euxo pipefail

# This script runs 3x reproductions demonstrating a few flavors of this bug.
# I recommend using it as an example and instead running the following commands manually.

# Assuming you've built node from source and the binary resides here:
local_node=../out/Release/node

yarn
node ./from-gh-issue.js
node ./from-gh-issue-2.js
node ./messy.js 100

"$local_node" ./from-gh-issue.js
"$local_node" ./from-gh-issue-2.js
"$local_node" ./messy.js 100
