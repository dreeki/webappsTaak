var mongoose = require('mongoose');

var SubThreadSchema = new mongoose.Schema({
    description: String,
    date: Date,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
    toJSON: {
        transform: function(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

SubThreadSchema.pre('remove', function(next){
    this.model('Thread').update({}, {$pull: {subThreads: this._id}}, {safe: true, multi: true}, next);
});

mongoose.model('SubThread', SubThreadSchema);