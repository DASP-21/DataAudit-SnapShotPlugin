const mongoose = require('mongoose');
const {Schema} = mongoose;

let changeLogSchema = new Schema({

    cdcId: {
        type: Schema.Types.ObjectId,
        ref: 'CDC'
    },

    change_log:[{
        version: Number,
        timestamp:{
                type: Date,
                default: Date.now()
        },
        content: String, //FOR COMPRESSED BINARY

        entity: {
            type: String,
            default: '',
        },
    }]

})

module.exports = mongoose.model('ChangeLog', changeLogSchema);