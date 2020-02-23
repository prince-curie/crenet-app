module.exports = function () {
  const { name, version } = require('../package.json')

  return console.log(`${name} ${version}`)
}