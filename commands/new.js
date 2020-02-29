const { exec, execSync, spawn, spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const date = new Date()
const Install = require('../utils/install')
const run = require('../utils/run')


module.exports = async function (argument) {
  try {
    if (argument[3] == null) {
      return require('../utils/noProjectName')()

    } else {
      const projectName = argument[3]

      const makeInquiry = require('../utils/inquiry')
      let installationAnswer = await makeInquiry(
        'What stack will be used?',
        ["fullstack adonis app", 'vue and adonis app', 'vue app', 'react app', 'react and adonis app'],
        'What is the stack for?', ["Project", "Practice"]
      )

      let ancestorFolder = installationAnswer.useCase
      let techStack = installationAnswer.stackEnquiry

      if (techStack == 'vue app') {
        await run.useExecSync('vue --version')
          .then(res => console.log(res.toString()))
          .catch((err) => {
            run.useSpawn('npm', ['i', '-g', '@vue/cli'])
          })

        Install.singleFrameworkApp(ancestorFolder, projectName)

        return await run.useSpawn('vue', ['create', `${projectName}`])

      } else if (techStack == 'react app') {
        Install.singleFrameworkApp(ancestorFolder, projectName)

        return await run.useSpawn('npx', ['create-react-app', `${projectName}`])
    } else if (techStack == 'vue and adonis app') {
        await run.useExecSync('vue --version')
          .then(res => console.log(res.toString()))
          .catch((err) => {
            run.useSpawn('npm', ['i', '-g', '@vue/cli'])
          })

          const proposedProjectLocation = `c:/crenet/projects/${date.getFullYear()}/${projectName}`
          const relativeProjectLocation = path.relative(process.cwd(), proposedProjectLocation)
          const isProjectLocationAvailable = fs.existsSync(relativeProjectLocation)
          if (isProjectLocationAvailable === true) {
            return console.log('You have created a project by that name.');
          }
          fs.mkdirSync(proposedProjectLocation, { recursive: true }, (err) => {
            if (err) return err;
          });
          process.chdir(relativeProjectLocation)
          console.log(process.cwd());

          const vueAppCreatingProcess = spawnSync('vue', ['create', 'app'], {
            stdio: ['inherit', 'inherit', 'inherit'],
            shell: true
          })
          console.log('App created')
          execSync('adonis --version', (error, stdout, stderr) => {
            if (error, stderr) {
              execSync('npm i -g @adonisjs/cli', (error, stdout, stderr) => {
                if (error || stderr) {
                  return console.error(`error: ${error} \n stderr: ${stderr}`);
                }
              })
            }
          })

          const adonisApiCreatingProcess = spawn('adonis', ['new', 'api', '--api-only'], {
            stdio: ['inherit', 'inherit', 'inherit'],
            shell: true
          })
        })

      } else if (installationAnswer == 'fullstack adonis app') {
        exec('adonis --version', (error, stdout, stderr) => {
          if (error, stderr) {
            execSync('npm i -g @adonisjs/cli', (error, stdout, stderr) => {
              if (error || stderr) {
                return console.error(`error: ${error} \n stderr: ${stderr}`);
              }

            })
          }

          const proposedProjectPath = `c:/crenet/projects/${date.getFullYear()}/${projectName}`
          const proposedProjectLocation = `c:/crenet/projects/${date.getFullYear()}`
          const relativeProjectPath = path.relative(process.cwd(), proposedProjectPath)
          const isProjectPathAvailable = fs.existsSync(relativeProjectPath)
          if (isProjectPathAvailable === true) {
            return console.log('You have created a project by that name.');
          }
          fs.mkdirSync(proposedProjectLocation, { recursive: true }, (err) => {
            if (err) return err;
          });
          process.chdir(proposedProjectLocation)
          console.log(process.cwd());

          const adonisAppCreatingProcess = spawn('adonis', ['new', `${projectName}`], {
            stdio: ['inherit', 'inherit', 'inherit'],
            shell: true
          })
        })
      } else if (installationAnswer == 'react and adonis app') {
        const proposedProjectLocation = `c:/crenet/projects/${date.getFullYear()}/${projectName}`
        const relativeProjectLocation = path.relative(process.cwd(), proposedProjectLocation)
        const isProjectLocationAvailable = fs.existsSync(relativeProjectLocation)
        if (isProjectLocationAvailable === true) {
          return console.log('You have created a project by that name.');
        }
        fs.mkdirSync(proposedProjectLocation, { recursive: true }, (err) => {
          if (err) return err;
        });
        process.chdir(relativeProjectLocation)
        console.log(process.cwd());

        const reactAppCreatingProcess = spawnSync('npx', ['create-react-app', 'app'], {
          stdio: ['inherit', 'inherit', 'inherit'],
          shell: true
        })

        execSync('adonis --version', (error, stdout, stderr) => {
          if (error, stderr) {
            execSync('npm i -g @adonisjs/cli', (error, stdout, stderr) => {
              if (error || stderr) {
                return console.error(`error: ${error} \n stderr: ${stderr}`);
              }
            })
          }
        })

        const adonisApiCreatingProcess = spawn('adonis', ['new', 'api', '--api-only'], {
          stdio: ['inherit', 'inherit', 'inherit'],
          shell: true
        })
        return
      }
    }
  } catch (error) {
    return console.log(error.message)
  }
  
}