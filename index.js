#!/usr/bin/env node

const { exec, execSync } = require('child_process')
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
    const projectName = argument[4]
    inquirer.prompt([{
      type: 'list',
      name: 'installation',
      message: 'What form of set up do you need?',
      choices: ["fullstack adonis app", 'vue and adonis', 'vue app']
    }])
    .then(answers => {
      installationAnswer = answers.installation;
      if(installationAnswer == 'vue app') {
        exec('vue --version', (error, stdout, stderr) => {
          if (error, stderr) {
            execSync('npm install -g @vue/cli', (error, stdout, stderr) => {
              if(error || stderr) {
                return console.error(`error: ${error} \n stderr: ${stderr}`);
              }
              
              console.log(`stdout: ${stdout}`);
            })
          }
          exec('vue create app')
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
          return 
        })
      }
      
    })
  }
}
