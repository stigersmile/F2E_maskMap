const minimist = require('minimist');

/*****************************************************
 * 變數 block
 *****************************************************/

const envOptions = {
  string: 'env',
  default: { env: 'develop' }
};
const options = minimist(process.argv.slice(2), envOptions);
exports.options = options;
