import _assign from 'lodash/assign.js'
import pkg from 'express';
const { Router } = pkg;
import User from '../src/models/users.js'
import Place from '../src/models/places.js'
import Food from '../src/models/foods.js'
import Hotel from '../src/models/hotels.js'
 
const router = Router()
 
const handlePageError = (res, e) => res.setStatus(500).send(e.message)
 
router.get('/users', (req, res) => {
  User.find().then((user) => {
    res.send({user});
  }, (e) => {
    res.status(400).send(e);
  });
});
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
      await User.findByIdAndUpdate(req.params.id, req.body)
 
      return res.json({ message: 'Updated user successfully!' })
    } catch (e) {
      return handlePageError(res, e)
    }
  }
)

router.delete('/users/:id', (req, res) => {
  var query = { id: req.params.id };
  User.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid username supplied');
      }
    res.send(raw);
  });
});

router.get('/places', (req, res) => {
  Place.find().then((place) => {
    res.send({place});
  }, (e) => {
    res.status(400).send(e);
  });
});
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
        await Place.findByIdAndUpdate(req.params.id, req.body)
   
        return res.json({ message: 'Updated place successfully!' })
      } catch (e) {
        return handlePageError(res, e)
      }
    }
  )

  router.delete('/places/:id', (req, res) => {
    var query = { id: req.params.id };
    Place.findOneAndRemove(query, 
      (e, raw) => {
        if (e) {
          res.status(400).send('Invalid place supplied');
        }
      res.send(raw);
    });
  });

  router.get('/foods', (req, res) => {
    Food.find().then((food) => {
      res.send({food});
    }, (e) => {
      res.status(400).send(e);
    });
  });

  router.get('/foods/:placeID', (req, res) => {
    var placeID = req.params.placeID;
  
    Food.find({placeID:placeID}).then((food) => {
      res.send(food);
    }, (e) => {
      res.status(400).send(e);
    });
  });
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
        await Food.findByIdAndUpdate(req.params.id, req.body)
   
        return res.json({ message: 'Updated food successfully!' })
      } catch (e) {
        return handlePageError(res, e)
      }
    }
  )

  router.delete('/foods/:id', (req, res) => {
    var query = { id: req.params.id };
    Food.findOneAndRemove(query, 
      (e, raw) => {
        if (e) {
          res.status(400).send('Invalid food supplied');
        }
      res.send(raw);
    });
  });

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
        await Hotel.findByIdAndUpdate(req.params.id, req.body)
   
        return res.json({ message: 'Updated hotel successfully!' })
      } catch (e) {
        return handlePageError(res, e)
      }
    }
  )

  router.delete('/hotels/:id', (req, res) => {
    var query = { id: req.params.id };
    Hotel.findOneAndRemove(query, 
      (e, raw) => {
        if (e) {
          res.status(400).send('Invalid hotel supplied');
        }
      res.send(raw);
    });
  });
export default router