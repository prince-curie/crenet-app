const { spawn, execSync, exec } = require('child_process')

const run = {
  useExecSync: async (argument) => await execSync(argument, (error, stdout, stderr) => {
    if (error || stderr) {
      return error || stderr
    }
    return stdout.toString()
  }),

  useSpawn: async (argument, options) => await spawn(argument, options, {
    stdio: ['inherit', 'inherit', 'inherit'],
    shell: true
  }) 
}

module.exports = run
