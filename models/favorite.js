var mongoose = require('mongoose');
Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User' //population
    },
    threads: [{
        type: Schema.Types.ObjectId,
        ref: 'Thread'
    }]
}, {timestamps: true});

module.exports = mongoose.model('Favorite', favoriteSchema);