const Install = require('../utils/install')
const run = require('../utils/run')
const { rmdirSync } = require('fs')

module.exports = async function (argument) {
  try {
    if (argument[3] == null) {
      return require('../utils/noProjectName')()
    } else {
      const projectName = argument[3]

      const makeInquiry = require('../utils/inquiry')
      const installationAnswer = await makeInquiry(
        'What stack will be used?',
        ['fullstack adonis app', 'vue and adonis app', 'vue app', 'react app', 'react and adonis app'],
        'What is the stack for?', ['project', 'practice']
      )

      const ancestorFolder = installationAnswer.useCase
      const techStack = installationAnswer.stackEnquiry

      if (techStack === 'vue app') {
        Install.singleFrameworkApp(ancestorFolder, projectName)

        await run.useExecSync('vue --version')
          .then(res => console.log(res.toString()))
          .catch((err) => {
            console.log(err)
            run.useSpawn('npm', ['i', '-g', '@vue/cli'])
          }).then(res => res)
          .catch(err => {
            throw err
          })

        return await run.useSpawn('vue', ['create', `${projectName}`])
          .then(res => res)
          .catch(err => {
            throw err
          })
      } else if (techStack === 'react app') {
        Install.singleFrameworkApp(ancestorFolder, projectName)

        return await run.useSpawn('npx', ['create-react-app', `${projectName}`])
      } else if (techStack === 'vue and adonis app') {
        Install.twoFrameworksApp(ancestorFolder, projectName)

        await run.useExecSync('vue --version')
          .then(res => console.log(res.toString()))
          .catch((err) => {
            console.log(err)
            run.useSpawn('npm', ['i', '-g', '@vue/cli'])
          })

        await run.useExecSync('adonis --version')
          .then(res => console.log(res.toString()))
          .catch((err) => {
            console.log(err)
            run.useSpawn('npm', ['i', '-g', '@adonisjs/cli'])
          })

        await run.useSpawn('vue', ['create', 'app'])
        const createApi = await run.useSpawn('adonis', ['new', 'api', '--api-only'])
        createApi.catch(err => { throw err })
      } else if (techStack === 'fullstack adonis app') {
        const { useSpawn } = run
        const installationDirectory = Install.singleFrameworkApp(ancestorFolder, projectName)

        await run.useExecSync('adonis --version')
          .then(res => console.log(res.toString()))
          .catch((err) => {
            console.log(err)
            run.useSpawn('npm', ['i', '-g', '@adonisjs/cli'])
          })
        await useSpawn('adonis', ['new', `${projectName}`])
          .then(res => res)
          .catch(err => {
            console.log('deleted')
            rmdirSync(installationDirectory)
            throw err
          })
      } else if (techStack === 'react and adonis app') {
        const installationDirectory = Install.twoFrameworksApp(ancestorFolder, projectName)

        await run.useExecSync('adonis --version')
          .then(res => console.log(res.toString()))
          .catch((err) => {
            console.log(err)
            run.useSpawn('npm', ['i', '-g', '@adonisjs/cli'])
          })

        await run.useSpawn('adonis', ['new', 'api', '--api-only'])
          .then(res => res)
          .catch(err => {
            rmdirSync(installationDirectory)
            console.log('deleted')
            throw err
          })

        await run.useSpawn('npx', ['create-react-app', 'app'])
          .then(res => res)
          .catch(err => {
            rmdirSync(installationDirectory)
            console.log('deleted')
            throw err
          })
        return
      }
    }
  } catch (error) {
    console.log('an eror occured')
    return console.log(error.message)
  }
}
