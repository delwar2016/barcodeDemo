// Example model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
});

UserSchema.methods = {
};
UserSchema.statics = {
    get: function (area_id, cb) {
        this.findOne({ _id : area_id })
            .exec(cb);
    }
};

module.exports = mongoose.model('User', UserSchema);
