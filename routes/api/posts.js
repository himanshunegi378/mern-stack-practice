let express = require('express');

router = express.Router();

//@route    GET api/posts/test
//@desc     Tests posts route
//@access   Public
router.get('/test',(req,res)=>{
    res.status(200).json({msg: 'posts works'})
});

module.exports = router;