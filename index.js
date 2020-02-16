#!/usr/bin/env node

const { exec, execSync } = require('child_process')
const inquirer = require('inquirer');

let installatinAnswer

inquirer.prompt([{
  type: 'list',
  name: 'installation',
  message: 'What form of set up do you need?',
  choices: ["fullstack adonis app", 'vue and adonis', 'vue app']
}])
.then(answers => {
  installationAnswer = answers.installation;
})

// exec('vuex --version', (error, stdout, stderr) => {
//   if (error, stderr) {
//     execSync('npm install -g @vue/cli', (error, stdout, stderr) => {
//       if(error || stderr) {
//         return console.error(`error: ${error} \n stderr: ${stderr}`);
//       }
//       console.log(`stdout: ${stdout}`);
//     })
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
//   return 
// })