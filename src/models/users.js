import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
 
const Schema = mongoose.Schema
 
const UserSchema = new Schema({
  id: String,
  name: String,
  username: String,
  password:String,
  type: String,
  status: String,
  createDay:Date
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

UserSchema.plugin(mongoosePaginate)
 
export default mongoose.model('User', UserSchema)
