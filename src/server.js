import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routes from './routes.js'
import cookieParser from 'cookie-parser'
 
const app = express()
 
app.use(cookieParser())
app.use(bodyParser.json())

app.use(routes)
 
// Connect to MongoDB:
// mongoose.connect(
//   `mongodb://localhost/travelwebDB`,
//   { useNewUrlParser: true }
// )
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
})
 
app.listen(3000, () => {
  console.log('Web server is listening on port 3000.')
})