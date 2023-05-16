const express = require('express');
const User = require('../models/users');
const router = express.Router();
const multer  = require('multer')
const fs = require('fs');
const DIR = './uploads';
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null,  Date.now() +'-'+file.originalname)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});

router.post('/add_details',upload.single('image'),  async (req, res) => {
    const image = req.file.filename;
    const { name, date_of_birth } = req.body;   
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).send('User with the provided same name already exist.');
    }
    let todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
    let checkdate = new Date(date_of_birth).setHours(0,0,0,0);
    if(new Date(checkdate).setHours(0,0,0,0) >= todaysDate){
      return res.status(400).send('Birthdate should be less than today date');
    }
    try {
      user = new User({ name, date_of_birth, image:image });
      await user.save();
      res.status(201).send();
    } catch (e) {
      res.status(500).send('Something went wrong. Try again later.');
    }
   });


   router.get('/get_details', async (req, res) => {
    let user = await User.find().sort({date_of_birth: 1})
    if (user) {    
            return res.status(200)
            .json({data:user});
    }
    else  {
      res.status(500).send('Something went wrong. Try again later.');
    }
   });

   router.delete('/del_details',async(req,res) => {
    try{
      const id = req.query.id;
      let user = await User.findById(id)
      if (user.image) {
        const oldPath = path.join(__dirname,"..","uploads", user.image);
        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, async (err) => {
            if (err) {
              console.error(err);
              return;
            }
             const data = await User.deleteOne({ _id:id });
             res.status(200).send({ "msg": "success", "response-msg": data });
          });
        }
      }
      
  }catch(err){
      return err;
  }
   })
   
module.exports = router;