const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
    title: { type: String },
    sender: { type: Schema.Types.String },
    role: { type: Schema.Types.String },
    project: { type: Schema.Types.ObjectId, ref: 'project' },
    desc: { type: String },
    date: { type: Date, default: Date.now() }
}, {
    versionKey: false
});

module.exports = mongoose.model('message', messageSchema);
