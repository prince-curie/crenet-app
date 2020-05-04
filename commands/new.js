const Install = require('../utils/install')
const { useExecSync, useSpawn } = require('../utils/run')

module.exports = async function (argument) {
  try {
    if (argument[3] == null) {
      return require('../utils/noProjectName')()
    } else {
      const projectName = argument[3]

      const makeInquiry = require('../utils/inquiry')
      const installationAnswer = await makeInquiry(
        'What stack will be used?',
        [
          'fullstack adonis app',
          'vue and adonis app',
          'vue app',
          'react app',
          'react and adonis app'
        ],
        'What is the stack for?',
        [
          'project',
          'practice'
        ]
      )

      const ancestorFolder = installationAnswer.useCase
      const techStack = installationAnswer.stackEnquiry

      if (techStack === 'vue app') {
        Install.singleFrameworkApp(ancestorFolder, projectName)

        await useExecSync('vue --version')
          .then(res => console.log(res.toString()))
          .catch(() => {
            useSpawn('npm', ['i', '-g', '@vue/cli'])
          })

        await useSpawn('vue', ['create', `${projectName}`])
      } else if (techStack === 'react app') {
        Install.singleFrameworkApp(ancestorFolder, projectName)

        useSpawn('npx', ['create-react-app', `${projectName}`])
      } else if (techStack === 'vue and adonis app') {
        Install.twoFrameworksApp(ancestorFolder, projectName)

        await useExecSync('vue --version')
          .then(res => console.log(res.toString()))
          .catch(() => {
            useSpawn('npm', ['i', '-g', '@vue/cli'])
          })

        await useExecSync('adonis --version')
          .then(res => console.log(res.toString()))
          .catch(() => {
            useSpawn('npm', ['i', '-g', '@adonisjs/cli'])
          })

        await useSpawn('vue', ['create', 'app'])
          .on('exit', (data) => {
            if (data === 0) {
              useSpawn('adonis', ['new', 'api', '--api-only'])
            }
          })
      } else if (techStack === 'fullstack adonis app') {
        Install.singleFrameworkApp(ancestorFolder, projectName)

        await useExecSync('adonis --version')
          .then(res => console.log(res.toString()))
          .catch(() => {
            useSpawn('npm', ['i', '-g', '@adonisjs/cli'])
          })

        useSpawn('adonis', ['new', projectName, '--api-only'])
      } else if (techStack === 'react and adonis app') {
        Install.twoFrameworksApp(ancestorFolder, projectName)

        await useExecSync('adonis --version')
          .then(res => console.log(res.toString()))
          .catch(() => {
            useSpawn('npm', ['i', '-g', '@adonisjs/cli'])
          })

        useSpawn('adonis', ['new', 'api', '--api-only'])
          .on('exit', (data) => {
            if (data === 0) {
              useSpawn('npx', ['create-react-app', 'app'])
            }
          })
      }
    }
  } catch (error) {
    return console.log(`\n${error}`)
  }
}
