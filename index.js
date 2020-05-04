const argument =  process.argv

const commands = {
  version : [ '-v' , '--version' ],
  help : [ '-h' , '--help' ],
  create : [ '-n' , '--new' ]
}

const { version, help, create, make } = commands

if (argument.length > 4 || argument.length == 2 || help.includes(argument[2].toLowerCase())) {
  return require('./commands/help')();

} else if( version.includes(argument[2].toLowerCase()) ) {
  return require('./commands/version')();

} else if (create.includes(argument[2].toLowerCase())) {
  return require('./commands/new')(argument)
}
