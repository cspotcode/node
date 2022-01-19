// Issue described here:
// https://github.com/nodejs/node/issues/36616#issue-774212139

// Any sufficiently large .wasm file
const wasmPath = require.resolve('@swc/wasm/wasm_bg.wasm');

const fs = require("fs")
const data = fs.readFileSync(wasmPath);
WebAssembly.compile(data).then(()=>console.log("module ready"))
