let express = require('express');

router = express.Router();


//@route    GET api/profile/test
//@desc     Tests profile route
//@access   Public
router.get('/test', (req, res ) => {
    res.status(200).json({msg: 'profile works'})
});



module.exports = router;