import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
 
const Schema = mongoose.Schema
 
const FoodSchema = new Schema({
    id: String,
    name: String,
    placeID: String,
    price:String,
    star_rating: String,
    description: String,
    imageURL:String
  }, {
      timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at'
      }
  })

FoodSchema.plugin(mongoosePaginate)
 
export default mongoose.model('Food', FoodSchema)