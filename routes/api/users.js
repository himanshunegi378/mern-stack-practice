let express = require('express');
let User = require('../../models/Users');
let gravatar = require('gravatar');
let bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secretKey = require('../../config/key').secretKey;
router = express.Router();

//@route    GET api/users/test
//@desc     Tests users route
//@access   Public
router.get('/test', (req, res) => {
    res.status(200).json({msg: 'users works'})
});

//@ route POST api/profile/register
//@desc Add new User to UserSchema in database
//@access public
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.status(400).json({email: 'email already exists'});
            } else {
                let avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.status(200).json(user);
                            })
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

//@ route POST api/profile/login
//@desc Login user / returning jwt token
//@access public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            //then check user
            if (!user) {
                return res.status(404).json({email: 'user not found'})
            } else {
                //check password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const payload = {id: user.id, name: user.name, avatar: user.avatar};
                            //jwt sign token
                            jwt.sign(
                                payload,
                                secretKey,
                                {expiresIn: 3600},
                                (err, token) => {
                                    return res.json({
                                        success: true,
                                        token: 'Bearer' + token
                                    })
                                }
                            )

                        } else {
                            return res.status(400).json({password: 'Password incorrect'});
                        }
                    })
            }


        })
});

//@ route POST api/profile/current
//@desc Return current user
//@access private
router.get('/current',passport.authenticate('jwt',{session: false}),(req,res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
});


module.exports = router;