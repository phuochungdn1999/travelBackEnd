import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
 
const Schema = mongoose.Schema

const PlaceSchema = new Schema({
    id: String,
    name: String,
    country: String,
    imageURL:String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

PlaceSchema.plugin(mongoosePaginate)

export default mongoose.model('Place', PlaceSchema)