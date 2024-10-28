const express = require('express');
const router = express.Router();

const User = require('../models/user.js');;

router.get('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.find();
      // Render index.ejs, passing in all of the current user's 
      // applications as data in the context object. 
      res.render('users/index.ejs', {
        users: currentUser,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      res.redirect('/')
    }
  });



  router.get('/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
     // Render index.ejs, passing in all of the current user's 
      // applications as data in the context object. 
        res.render('users/show.ejs', { 
            users : currentUser, 
        });
    } catch (error) {
     // If any errors, log them and redirect back home
     res.redirect('/')
    }
});




module.exports = router;
