import _assign from 'lodash/assign.js'
import pkg from 'express';
const { Router } = pkg;
import User from '../src/models/users.js'
import Place from '../src/models/places.js'
import Food from '../src/models/foods.js'
import Hotel from '../src/models/hotels.js'
 
const router = Router()
 
const handlePageError = (res, e) => res.setStatus(500).send(e.message)
 
router.post(
  '/users',
  async (req, res) => {
    try {
      const user = await new User(req.body).save()
 
      return res.send({
        message: 'Created new user successfully!',
        data: user
      })
    } catch (e) {
      return handlePageError(res, e)
    }
  }
)
 
router.put(
  '/users/:id',
  async (req, res) => {
    try {
      await Post.findByIdAndUpdate(req.params.id, req.body)
 
      return res.json({ message: 'Updated user successfully!' })
    } catch (e) {
      return handlePageError(res, e)
    }
  }
)

router.post(
    '/places',
    async (req, res) => {
      try {
        const place = await new Place(req.body).save()
        
        return res.send({
          message: 'Created new place successfully!',
          data: place
        })
      } catch (e) {
        return handlePageError(res, e)
      }
    }
  )
   
  router.put(
    '/places/:id',
    async (req, res) => {
      try {
        await Post.findByIdAndUpdate(req.params.id, req.body)
   
        return res.json({ message: 'Updated place successfully!' })
      } catch (e) {
        return handlePageError(res, e)
      }
    }
  )

  router.post(
    '/foods',
    async (req, res) => {
      try {
        const food = await new Food(req.body).save()
   
        return res.send({
          message: 'Created new food successfully!',
          data: food
        })
      } catch (e) {
        return handlePageError(res, e)
      }
    }
  )
   
  router.put(
    '/foods/:id',
    async (req, res) => {
      try {
        await Post.findByIdAndUpdate(req.params.id, req.body)
   
        return res.json({ message: 'Updated food successfully!' })
      } catch (e) {
        return handlePageError(res, e)
      }
    }
  )

  router.post(
    '/hotels',
    async (req, res) => {
      try {
        const hotel = await new Hotel(req.body).save()
   
        return res.send({
          message: 'Created new hotel successfully!',
          data: hotel
        })
      } catch (e) {
        return handlePageError(res, e)
      }
    }
  )
   
  router.put(
    '/hotels/:id',
    async (req, res) => {
      try {
        await Post.findByIdAndUpdate(req.params.id, req.body)
   
        return res.json({ message: 'Updated hotel successfully!' })
      } catch (e) {
        return handlePageError(res, e)
      }
    }
  )
export default router