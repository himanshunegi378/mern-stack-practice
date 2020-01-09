let express = require('express');

let mongoose = require('mongoose');
let bodyParser = require('body-parser');
const passport = require('passport');


//api modules imported
let users = require('./routes/api/users');
let posts = require('./routes/api/posts');
let profile = require('./routes/api/profile');






let app = express();
//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Mongo DB config key
const db = require('./config/key').mongoURI;
//Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(
        () => {
            console.log('MongoDB Connected')
        }
    )
    .catch(
        err => {
            console.log(err)
        }
    );

// passport middleware
app.use(passport.initialize());


//routes to api
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);


// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());
// //app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
