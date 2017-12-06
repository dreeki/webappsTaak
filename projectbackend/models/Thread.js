var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    subThreads: [{type: mongoose.Schema.Types.ObjectId, ref: 'SubThread'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    likes: [String]
}, {
    toJSON: {
        transform: function(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

ThreadSchema.pre('remove', function(next){
    this.model('User').update({}, {$pull: {threads: this._id}}, {safe: true, multi: true}, next);
});

mongoose.model('Thread', ThreadSchema);