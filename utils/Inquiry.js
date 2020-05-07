const inquirer = require('inquirer');

const makeInquiry = (stackQuestion, stackChoices, useCaseQuestion, useCaseChoices) => {
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
    choices: stackChoices 
  }])
}

module.exports = makeInquiry
