// Messy script I have been using to demo the bug and verify the fix

const swcInvocations = +process.argv[2];
const setTimeoutMs = +process.argv[3];

process.on('beforeExit', () => {
  console.log('beforeExit emitted');
});

process.on('exit', () => {
  console.log('exit emitted');
  console.log(JSON.stringify(performance.toJSON(), null, 2));
});

if(!Number.isNaN(setTimeoutMs)) {
  console.log(`setting ${setTimeoutMs}ms timeout`);
  setTimeout(() => {
    console.log(`firing ${setTimeoutMs}ms timeout`);
  }, setTimeoutMs);
}

console.time('require("@swc/wasm")');
const swc = require('@swc/wasm');
console.timeEnd('require("@swc/wasm")');

// any JS file; doesn't have to be this one.  Just want to make SWC actually do some work in case this affects
// V8's optimization heuristics.
const src = require('fs').readFileSync(__filename, 'utf8');

console.time(`invoke swc ${ swcInvocations } times`);
for(let i = 0; i < swcInvocations; i++) {
  swc.transformSync(src, {});
}
console.timeEnd(`invoke swc ${ swcInvocations } times`);
