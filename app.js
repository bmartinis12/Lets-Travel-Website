let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
require('dotenv').config();
let Post = require("./models/post.model").Post;
let postsRouter = require('./routes/posts.route');
let callbackRouter = require('./routes/callback-requests.route');
let emailsRouter = require('./routes/emails.route');
let usersRouter = require('./routes/users.route');
let auth = require('./controllers/auth.js');

// Set EJS veiw engine

app.set('view engine', 'ejs');

// Connect to database

mongoose.connect(process.env.DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});


// Middleware

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

let fileStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})

app.use(multer({storage: fileStorage}).single('imageFile'));

// posts routes 

app.use('/posts', postsRouter);

// callback routes 

app.use('/callback-requests', callbackRouter);

// email routes 
app.use('/emails', emailsRouter);

// users routes
app.use('/users', usersRouter)

// Landmark route

app.get('/landmark', async (req, res) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    res.render('landmark', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        country: post.country,
        text: post.text
    });
});

// admin/user routes 

app.get('/admin', (req, res) => {
    let token = req.cookies['auth_token'];
    if(token !== null && auth.checkToken(token)){
        res.render('admin');
    } else {
       res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    let token = req.cookies['auth_token'];
    if(token !== null && auth.checkToken(token)){
        res.redirect('/admin');
    }  else {
        res.render('login');
    }
})

// get .env routes

app.get('/apikey', (req, res) => {
    res.send(process.env.APIKEY);
})

app.get('/secret', (req, res) => {
    res.send(process.env.SECRET);
})

// Load sever on port 3000

let port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}.....`));