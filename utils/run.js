const { execSync, spawn /*, spawnSync */ } = require('child_process')

const run = {
  useExecSync: async (argument) => {
    const installAdonis = await execSync(argument, (error, stdout, stderr) => {
      if (error || stderr) {
        return error || stderr
      }
      return stdout.toString()
    })
    return installAdonis
  },

  useSpawn: async (argument, options) => {
    const spawnProcess = await spawn(argument, options, {
      // stdio: ['inherit', 'inherit', 'inherit'],
      shell: true
    })
    await spawnProcess.on('error', err => console.log(err.message))
    await spawnProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    await spawnProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })
    await spawnProcess.on('close', code => console.log('...>>>', code))
    await spawnProcess.on('exit', code => console.log('...>>>', code))
  }
}

module.exports = run
