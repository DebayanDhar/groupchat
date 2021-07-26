import mongoose from 'mongoose'
//defining our data schema
const groupchatSchema=mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    group: String,
    received: Boolean,
})
export default mongoose.model('messagecontents',groupchatSchema)//collection name,data structure