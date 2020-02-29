const inquirer = require('inquirer');

const makeInquiry = (stackQuestion, stackchoices, useCaseQuestion, useCaseChoices) => {
  return inquirer.prompt([{
    type: 'list',
    name: 'useCase',
    message: useCaseQuestion,
    choices: useCaseChoices
    },
    {
    type: 'list',
    name: 'stackEnquiry',
    message: stackQuestion,
    choices: stackchoices 
  }])
}

module.exports = makeInquiry
