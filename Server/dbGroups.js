import mongoose from 'mongoose'
//defining our data schema
const groupSchema=mongoose.Schema({
    
    groupName: String,
    createdBy: String,
})
export default mongoose.model('groups',groupSchema)//collection name,data structure