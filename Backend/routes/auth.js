const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser= require('../middleware/fetchuser');

const JWT_SECRET = 'EngineerHariom@1245';



//ROUTE 1: create a user : POST "/api/auth/createuser". No login required
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
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)

        res.json({ authtoken })
    } catch {
        console.error(errors.message);
        res.status(500).send("Some error occured...")
    }
})


//ROUTE 2: Authenticate a User : POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email id with using @').isEmail(),
    body('password', 'password must be 5 characters...').exists()
], async (req, res) => {
    //if there are errors, return bed request and the errors...
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Sorry user does not exsits...." })
        }

        const passwordCompare =  await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Sorry user password does not exsits...." })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)

        res.json({authtoken})
    }
    catch (error) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error...")
    }
})
//ROUTE 3: Get Login User Details : POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
    
} catch (error) {
    console.error(error.message);
        res.status(500).send("Internal Server Error...")
}
})

module.exports = router