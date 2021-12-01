const mongoose = require('mongoose');
const {Schema} = mongoose;
// capture format for CDC

/* Note To Team:
'content' is temporarily considered to be a String data.
Schema for 'content' could be modified at a later stage if needed. 
// file ->[EXTERNAL SERVICE]-> ().bin 101110101010101010010101010100101
*/ 
let cdcSchema = new Schema({
    data_id:{
        type: Number,
        require: true,
    },
    timestamp:{
        type: Date,
        default: Date.now()
    },
    content: String,
    // change_log:[{
    //     version: Number,
    //     timestamp:{
    //          type: Date,
    //          default: Date.now()
    //     },
    //     content: String //FOR COMPRESSED BINARY
    // }]
    
    change_log:{
        type: Schema.Types.ObjectId,
        ref: 'ChangeLog',
    },
    is_active: {
        type: Boolean,
        default: true,
    }
});


module.exports = mongoose.model('CDC', cdcSchema);