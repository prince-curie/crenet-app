const path = require('path')
const fs = require('fs')
const date = new Date()


const InstallLocation = {
  singleFrameworkApp: (stackUse, projectName) => {
    const proposedPath = `c:/crenet/${stackUse}/${date.getFullYear()}/${projectName}`
    const proposedLocation = `c:/crenet/${stackUse}/${date.getFullYear()}`
    const relativePath = path.relative(process.cwd(), proposedPath)
    const isPathAvailable = fs.existsSync(relativePath)
    if (isPathAvailable === true) {
      return console.log(`You have created a ${stackUse} by that name.`);
    }
    fs.mkdirSync(proposedLocation, { recursive: true }, (err) => {
      if (err) return err;
    });
    process.chdir(proposedLocation)
    return console.log(`${ process.cwd() }\\${ projectName }`)
  }
}

module.exports = InstallLocation