// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');;


router.get('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Render index.ejs, passing in all of the current user's 
      // applications as data in the context object. 
      res.render('foods/index.ejs', {
        pantry: currentUser.pantry,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error)
      res.redirect('/')
    }
  });


router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
  });



  router.post('/', async (req, res) => {
    try {

      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);

      req.body.date = new Date(req.body.date);
      currentUser.pantry.push(req.body);

      await currentUser.save();

    
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
     res.redirect('/')
    }
});




  router.get('/:id', async (req, res) => {
    try {
      // find the user from the database
      const user = await User.findById(req.session.user._id);
      // find the application by id on the user's applications array using mongoose method
      const pantry = user.pantry.id(req.params.id);
      // render the template with the app we found
      res.render('foods/show.ejs', { pantry });
    } catch (err) {
      res.redirect('/');
    }
  });
  router.delete('/:id', async (req, res) => {
    try {
      // find the user from the database
      const user = await User.findById(req.session.user._id);
      // Use the Mongoose .deleteOne() method to delete
      // an application using the id supplied from req.params
      user.pantry.id(req.params.id).deleteOne();
  
      // update the database with our changes
      await user.save();
      res.redirect(`/users/${req.session.user._id}/foods`);
    } catch (err) {
      res.redirect('/');
    }
  });


  router.get('/:id/edit', async (req, res) => {
    try {
      // find the application from the db
      // find the user from the database
      const user = await User.findById(req.session.user._id);
      const pantry = user.pantry.id(req.params.id);
  
      res.render('foods/edit.ejs', { pantry });
    } catch (err) {
      res.redirect('/');
    }
  });
  

  router.put('/:pantryId', async (req, res) => {
    try {
      // Find the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Find the current application from the id supplied by req.params
      const pantry= currentUser.pantry.id(req.params.pantryId);
      // Use the Mongoose .set() method
      // this method updates the current application to reflect the new form
      // data on `req.body`
      pantry.set(req.body);
      // Save the current user
      await currentUser.save();
      // Redirect back to the show view of the current application
      res.redirect(`/users/${currentUser._id}/foods/${req.params.pantryId}`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

module.exports = router;