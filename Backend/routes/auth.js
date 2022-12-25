const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



//create a user : POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email id with using @').isEmail(),
    body('password', 'password must be 5 characters...').isLength({ min: 5 }),
], async (req, res) => {
    //if there are errors, return bed request and the errors...
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{

    
    //check whether the user  with this email exists already....
    let user =  await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "Sorry this user email id already exists.."})
    }
    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      })
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    // res.json({error: 'Please enter a unique value for email', message: err.message})})
    res.json(user)
    }catch{
        console.error(error.message);
        res.status(500).send("Some error occured...")
    }
})

module.exports = router