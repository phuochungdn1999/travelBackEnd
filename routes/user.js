const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');


const router = express.Router()
//truyen page so 1 vao
//chi dung cho admin
router.get('/users/getall',auth ,function(req, res, next) {
    
    console.log("admin",req.user.isAdmin);
    const admin = req.user.isAdmin;
    if(admin === true){
        try {
        const perPage = parseInt(req.query.limit || 5)
        const page = parseInt(req.query.page || 1)
            User
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, user) {
            User.count().exec(function(err, count) {
                if (err) return next(err);
                res.status = 200;
                res.send({
                    user: user,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
        } catch (error) {
            res.status(400).send({
                error:"Paging error"
            });
        }
        
    }else{
        res.status(405).send({
                error:"Only admin is permitted to access"
        });
    }
    
})

router.post('/users', async (req, res,next) => {
    // Create a new user
        User.findOne({username:req.body.username},(err,userCheck)=>{
            console.log('Okee');
            console.log(userCheck);
            if(userCheck){
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                err = 'User already exists';
                res.json({err});
                return;
            }
        })
        
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
        
    
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        console.log(req.body);
        const { username, password } = req.body;
        const user = await User.findByCredentials(username, password);
        console.log("user",user);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken();
        res.send({message:"Login success",
             user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }

})

router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    console.log(req.user.password);
    res.send(req.user);
})
router.post('/users/me/password', auth, async(req, res) => {
    var id = req.user._id;
    console.log('Id',id);
    User.findById({_id:id}).then((user)=>{
        if(user!=null && req.body.password!=null){
            user.password = req.body.password;
            
            user.save().then((user)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            },(error)=>next(error));
            
        }
    })
})
router.post('/users/me/update', auth, async(req, res) => {
    var id = req.user._id;
    console.log('Id',id);
    User.findById({_id:id}).then((user)=>{
        if(user!=null && req.body!=null){
            
            if( req.body.firstname!=null)
                user.firstname = req.body.firstname;
            if( req.body.lastname!=null)
                user.lastname = req.body.lastname;
            user.save().then((user)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            },(error)=>next(error));
            
        }
    })
})
//logout loi; dung /logoutall
router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    console.log("test111");
    try {
        console.log("test22222");
        console.log("user1",user);
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        console.log("user2",user);
        res.send('Log out successfully');
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;