#!/usr/bin/env node

const { exec, execSync, spawn, spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer');
const date = new Date()

let installationAnswer

const argument =  process.argv

const commands = {
  version : [ '-v' , '--version' ],
  help : [ '-h' , '--help' ],
  create : [ '-n' , '--new' ],
  make :  [ "-m" , "make" ]
}

const { version, help, create, make } = commands

if(argument.length > 4 || argument.length == 2 || help.includes(argument[2].toLowerCase())) {
  return console.log(`
    Usage: crenet [version | new {project-name}]

    -h, --help      Show this screen
    -v, --version   show version
    -n, --new       creates a new project 
  `)

} else if( version.includes(argument[2].toLowerCase()) ) {
  const {name, version} = require('./package.json')

  return console.log(`${name} ${version}`)
} else if ( create.includes(argument[2].toLowerCase()) ) {
  if (argument[3] == null) {
    return console.log(`
      add the project's name
      crenet new {project-name}
    `)
  } else {
    const projectName = argument[3]
    console.log(projectName);
    
    inquirer.prompt([{
      type: 'list',
      name: 'installation',
      message: 'What form of set up do you need?',
      choices: ["fullstack adonis app", 'vue and adonis app', 'vue app']
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
        }
      })
  }
}
