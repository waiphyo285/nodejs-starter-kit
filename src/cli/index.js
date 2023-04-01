const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const args = yargs(hideBin(process.argv)).argv
const User = require('@controllers/users/index')

const printHelp = function () {
    console.log(`
    Help usage:
    --index  list users
    --show   find user by {ID}
    --help   print help
  `)
}

const valid = args.index || args.show

if (args.help || !valid) {
    printHelp()
    process.exit(1)
}

if (args.index) {
    User.listUsers()
        .then((data) => {
            console.log('Cli Data ', data)
        })
        .catch((err) => {
            console.log('Cli Error ', err)
        })
        .finally(() => {
            process.exit(1)
        })
}

if (args.show) {
    User.findUserById(args.show)
        .then((data) => {
            console.log('Cli Data ', data)
        })
        .catch((err) => {
            console.log('Cli Error ', err)
        })
        .finally(() => {
            process.exit(1)
        })
}

/**
 * cd here and type the following commands
 *
 * 1. node index
 * 2. node index --index
 * 3. node index --show=623210497fc2cb28840d1448
 *
 */
