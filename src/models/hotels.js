import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
 
const Schema = mongoose.Schema

  const HotelSchema = new Schema({
    id: String,
    name: String,
    placeID: String,
    start: String,
    price:String,
    status:String,
    star_rating: String,
    description: String,
    imageURL:String
  }, {
      timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at'
      }
  })  
HotelSchema.plugin(mongoosePaginate)

export default mongoose.model('Hotel', HotelSchema)