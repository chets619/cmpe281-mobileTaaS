const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bugSchema = new Schema({
    title: { type: String },
    tester: { type: Schema.Types.ObjectId, ref: 'user' },
    severity: { type: String },
    hardware: { type: String },
    os: { type: String },
    version: { type: String },
    script: { type: String },
    desc: { type: String },
    status: { type: String, default: 'New' },
    file_url: { type: String, default: null },
    date: { type: Date, default: Date.now() }
}, {
    versionKey: false
});

module.exports = mongoose.model('bug', bugSchema);
