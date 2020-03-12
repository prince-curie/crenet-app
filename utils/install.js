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
      throw Error(`You have created a ${stackUse} by this name.`)
    }

    fs.mkdirSync(proposedLocation, { recursive: true }, (err) => {
      if (err) throw Error(err)
    })

    process.chdir(proposedLocation)
    console.log(`${process.cwd()}\\${projectName}`)
    return proposedPath
  },

  twoFrameworksApp: (stackUse, projectName) => {
    const proposedProjectLocation = `c:/crenet/${stackUse}/${date.getFullYear()}/${projectName}`
    const relativeProjectLocation = path.relative(process.cwd(), proposedProjectLocation)
    const isProjectLocationAvailable = fs.existsSync(relativeProjectLocation)

    if (isProjectLocationAvailable === true) {
      throw Error(`You have created a ${stackUse} by that name.`)
    }

    fs.mkdirSync(proposedProjectLocation, { recursive: true }, (err) => {
      if (err) throw Error(err)
    })

    process.chdir(relativeProjectLocation)
    console.log(process.cwd())
    return process.cwd()
  }
}

module.exports = InstallLocation
