const { exec, execSync, spawn, spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer');
const date = new Date()

let installationAnswer


module.exports = function (argument) {
  if (argument[3] == null) {
    return require('../utils/noProjectName')()

  } else {
    const projectName = argument[3]
    inquirer.prompt([{
      type: 'list',
      name: 'installation',
      message: 'What form of set up do you need?',
      choices: ["fullstack adonis app", 'vue and adonis app', 'vue app', 'react app', 'react and adonis app']
    }])
      .then(answers => {
        installationAnswer = answers.installation;
        console.log(installationAnswer);


        if (installationAnswer == 'vue app') {
          exec('vue --version', (error, stdout, stderr) => {
            if (error, stderr) {
              execSync('npm install -g @vue/cli', (error, stdout, stderr) => {
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

            const childProcess = spawn('vue', ['create', `${projectName}`], {
              stdio: ['inherit', 'inherit', 'inherit'],
              shell: true
            })

            return
          })
        } else if (installationAnswer == 'react app') {
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

          const creatingReactApp = spawn('npx', ['create-react-app', `${projectName}`], {
            stdio: ['inherit', 'inherit', 'inherit'],
            shell: true
          })
          return

        } else if (installationAnswer == 'vue and adonis app') {
          exec('vue --version', (error, stdout, stderr) => {
            if (error, stderr) {
              execSync('npm install -g @vue/cli', (error, stdout, stderr) => {
                if (error || stderr) {
                  return console.error(`error: ${error} \n stderr: ${stderr}`);
                }

              })
            }

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
      })
  }
}