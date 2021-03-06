let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true},
    hash: String,
    salt: String,
    firstname: String,
    lastname: String,
    birthDate: Date,
    country: String,
    threads: [{type: mongoose.Schema.Types.ObjectId, red: 'Thread'}]

}, {
    toJSON: {
        transform: function(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.hash;
            delete ret.salt;
        }
    }
});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(32).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function (password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
    return this.hash == hash;
}

UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.PROJECT_BACKEND_SECRET);
};

mongoose.model('User', UserSchema);