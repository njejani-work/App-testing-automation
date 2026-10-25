/**
 * Node.js 22.12+ can require() the ESM build synchronously, so CommonJS gets
 * every export of it. dist/cjs/package.json makes this file CommonJS.
 */
// oxlint-disable-next-line typescript/no-require-imports
module.exports = require('../index.js')
