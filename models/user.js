const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String, 
        required: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        //process.env.EMAIL_REGEX 
    },
    password: {type: String, required: true},
    home: {
        long: Number,
        lat: Number,
        radius: {
            type: Number,
            default: 10
        }
    },
    work: {
        long: Number,
        lat: Number,
        radius: {
            type: Number,
            default: 10
        }
    },
    other: {
        long: Number,
        lat: Number,
        radius: {
            type: Number,
            default: 10
        }
    },
    subs_key: {
        type: String,       /* User.save({subs_key: JSON.stringify(addresses)}) */
        default: null       /* If its null, means the user doesn't want to use the notifications feature as of now*/
    },
    contacts: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    isLive: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        long: Number,
        lat: Number
    }
});

module.exports=mongoose.model('User', userSchema);