const express = require('express');
const bodyParser= require('body-parser');
const bcrypt= require('bcrypt-nodejs');
const cors= require('cors');
const knex=require('knex');
const multer = require('multer');
const app = express();

//linking to the db
const db = knex({
   client: 'pg',
   connection:{
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'morccodb'     
   }
})


//multer settings
const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
      cb(null, '../marocco/visitmorocco/src/images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage });


//linking controllers
const loginController = require('./controllers/PostReq/login');
const regiterController = require('./controllers/PostReq/register');
const uploadController = require('./controllers/PostReq/upload');
const profileController = require('./controllers/GetReq/profile');
const credentialsController = require('./controllers/PostReq/credentials');
const profileinfoController = require('./controllers/GetReq/profileinfo');
const settingsController = require('./controllers/PostReq/settings');
const deletingController = require('./controllers/DeleteReq/profile');
const likeController = require('./controllers/PostReq/likeFeature');
const hotelsController = require('./controllers/GetReq/displayingHotels');
const tripsController = require('./controllers/GetReq/displayingTrips');
const articleController = require('./controllers/GetReq/article');



 app.use(cors())
 app.use(bodyParser.json());

 app.get('/', (req, res)=>{
 res.send(tempdatabase.users);
 })


//creating users account and storing login data
 app.post('/register',(req, res)=>{regiterController.registering(req, res, db, bcrypt)})

//storing and getting the users informations when registring
 app.post('/credentials' ,upload.single('file'), (req, res)=>{credentialsController.UserCreden (req, res, db)})

//fetching login users and sending response to approve logining 
 app.post('/signin',(req, res)=>{loginController.logining(req, res, db, bcrypt)})
 
//getting users posts to their profiles when login
 app.get('/profile',(req, res)=>{profileController.profiling (req, res, db)})

//getting users information when logining
 app.get('/profileinfo',(req, res)=>{profileinfoController.UserProfileInfo(req, res, db)})

//uploading pictures to the profile and displaying them 
 app.post('/upload' ,upload.single('file'), (req, res)=>{uploadController.uploading (req, res, db)})

//deleting specific/clicked posts
 app.delete('/profile' , (req, res)=>{deletingController.deletingPost(req, res, db)})

//changing profile pic and user info 
 app.post('/settings' ,upload.single('file'), (req, res)=>{settingsController.settingsSide(req, res, db)})

//addlike or dislike
 app.post('/like',(req, res)=>{likeController.liking (req, res, db)})

//displaying all the posts related to hotels that 
//ve been posted by the users on hotels public page 
 app.get('/hotels',(req, res)=>{hotelsController.hotelsDisplayer(req, res, db)})

//displaying all the posts related to trips that 
//ve been posted by the users on trips public page
 app.get('/trips',(req, res)=>{tripsController.tripsDisplayer(req, res, db)})

//getting articles
app.get('/article',(req, res)=>{articleController.articleDisplayer(req, res, db)})







 app.use(express.static('images'));
 app.listen(3001)


