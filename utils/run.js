const { execSync, spawn } = require('child_process')

const run = {
  useExecSync: async (argument) => {
    return execSync(argument, (error, stdout, stderr) => {
      if (error || stderr) {
        return error || stderr
      }
      return stdout.toString()
    })
  },

  useSpawn: (argument, options) => spawn(argument, options, {
    stdio: ['inherit', 'inherit', 'inherit'],
    shell: true
  })
}

module.exports = run
