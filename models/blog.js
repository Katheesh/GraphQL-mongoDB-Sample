const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const blogSchema =  new Schema({
    title: String,    
    image: String,
    status: Boolean,
    content: String,
    posted_at: String
});

module.exports = mongoose.model('Blog', blogSchema);