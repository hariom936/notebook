const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET  = 'EngineerHariom@1245';



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

    try {
        //check whether the user  with this email exists already....

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry this user email id already exists.." })
        }
        //using bcrypt js
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });

        const data = {
            user:{
                id: user.id
            }
        }
        
        const authtoken =  jwt.sign(data, JWT_SECRET)

        res.json({authtoken})
    } catch {
        console.error(errors.message);
        res.status(500).send("Some error occured...")
    }
})

module.exports = router