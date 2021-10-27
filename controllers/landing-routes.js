const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');
// get request that first checks if user is signed in and pulls the posts that are in the database
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });
    // serializes the data by mapping through it 
    const posts = postData.map((post) => post.get({ plain: true }));
    // sends the data to the admin posts handlebars file
    res.render('admin-posts', {
      layout: 'landing',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});
// gets the route to display the form for making a new post
router.get('/new', withAuth, (req, res) => {
  res.render('new', {
    layout: 'landing',
  });
});
// get request to grab the edit form 
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit', {
        layout: 'landing',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
