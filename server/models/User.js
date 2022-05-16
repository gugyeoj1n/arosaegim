const mongoose = require('../node_modules/mongoose')
const bcrypt = require('../node_modules/bcrypt')
const saltRounds = 10
const jwt = require('../node_modules/jsonwebtoken')

const userSchema = mongoose.Schema({
	userName: {
		type: String,
		unique: true
	},
	password: {
		type: String
	},
	token: {
		type: String
	}
})

userSchema.pre('save', function ( next ) {
    const user = this

    if ( user.isModified('password') ) {
        bcrypt.genSalt(saltRounds, function ( err, salt ) {
            if ( err ) return next(err)
            bcrypt.hash(user.password, salt, function ( err, hash ) {
                if ( err ) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, ( err, isMatch ) => {
        if ( err ) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.gerToken = function(cb) {
    const user = this
    const token = jwt.sign(user.userName, '1234')

    user.token = token
    user.save(( err, user ) => {
        if ( err ) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    const user = this
    jwt.verify(token, '1234', ( err, decoded ) => {
        user.findOne({ "userName": decoded }, (err, user) => {
            if ( err ) return cb( err )
            cb(null, user)
        })
    })
}
const User = mongoose.model('user', userSchema)

module.exports = { User }