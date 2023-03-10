const bcrypt = require('bcrypt')

const hashPassword = (_, next) => {
    const password = _.password
    const callNext = (res) => next(res)
    const userPass = (hash) => ((_.password = hash), callNext())
    const checkErr = (err, val, fn) => (err ? callNext(err) : fn(val))
    const hashPass = (salt) =>
        bcrypt.hash(password, salt, (err, hash) =>
            checkErr(err, hash, userPass)
        )
    const checkHash = (round) =>
        bcrypt.genSalt(round, (err, salt) => checkErr(err, salt, hashPass))
    const checkPass = (pass, fn) => (!pass ? callNext() : fn(10))
    return checkPass(password, checkHash)
}

module.exports = hashPassword
