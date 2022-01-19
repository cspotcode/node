// Issue described here:
// https://github.com/nodejs/node/issues/36616#issuecomment-757929741

// Any sufficiently large .wasm file
const wasmPath = require.resolve('@swc/wasm/wasm_bg.wasm');

const fs = require('fs');

// Workaround #36616
const timerId = setInterval(() => {}, 60000);

process.on('exit', () => {
  console.log(new Date(), 'process exit');
});

process.on('beforeExit', () => {
  console.log(new Date(), 'process beforeExit');
});

WebAssembly.compile(fs.readFileSync(wasmPath)).then(() => {
  console.log(new Date(), 'compiled (liftoff)');
  clearInterval(timerId);
  if (process.env.EXPLICIT_EXIT) process.exit();
});

console.log(new Date(), 'WebAssembly.compile()');
